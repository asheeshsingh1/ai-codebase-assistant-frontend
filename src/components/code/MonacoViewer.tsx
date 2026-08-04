"use client";

import { useEffect, useRef } from "react";

import Editor, {
    Monaco,
    OnMount,
} from "@monaco-editor/react";

import type { editor } from "monaco-editor";

import { HighlightRange } from "@/context/CodeViewerContext";

interface Props {
    language: string;
    content: string;
    highlightRanges: HighlightRange[];
}

function getLanguage(language: string) {
    switch (language.toLowerCase()) {
        case "py":
        case "python":
            return "python";

        case "ts":
        case "tsx":
        case "typescript":
            return "typescript";

        case "js":
        case "jsx":
        case "javascript":
            return "javascript";

        case "java":
            return "java";

        case "go":
            return "go";

        case "c":
            return "c";

        case "cpp":
        case "cc":
        case "c++":
            return "cpp";

        case "json":
            return "json";

        case "yaml":
        case "yml":
            return "yaml";

        case "md":
        case "markdown":
            return "markdown";

        default:
            return "plaintext";
    }
}

export default function MonacoViewer({
    language,
    content,
    highlightRanges,
}: Props) {

    const editorRef =
        useRef<editor.IStandaloneCodeEditor | null>(null);

    const monacoRef =
        useRef<Monaco | null>(null);

    const decorationIds =
        useRef<string[]>([]);

    // Keep the latest ranges available to callbacks without
    // needing to re-create applyDecorations on every render.
    const highlightRangesRef =
        useRef<HighlightRange[]>(highlightRanges);

    useEffect(() => {
        highlightRangesRef.current = highlightRanges;
    }, [highlightRanges]);

    const applyDecorations = () => {

        if (
            !editorRef.current ||
            !monacoRef.current
        ) {
            return;
        }

        const editor = editorRef.current;
        const monaco = monacoRef.current;
        const ranges = highlightRangesRef.current;

        decorationIds.current =
            editor.deltaDecorations(
                decorationIds.current,

                ranges.map((range) => ({
                    range: new monaco.Range(
                        range.start,
                        1,
                        range.end,
                        1,
                    ),

                    options: {
                        isWholeLine: true,

                        linesDecorationsClassName:
                            "citation-margin",

                        className:
                            "monaco-editor-whole-line-highlight",

                        minimap: {
                            color:
                                "#facc15",
                            position: 2,
                        },

                        overviewRuler: {
                            color:
                                "#facc15",
                            position: 4,
                        },
                    },
                })),
            );

        if (ranges.length) {
            editor.revealLineInCenter(
                ranges[0].start,
            );
        }
    };

    const onMount: OnMount = (
        editor,
        monaco,
    ) => {

        editorRef.current = editor;
        monacoRef.current = monaco;

        monaco.editor.defineTheme("codebase-dark", {
            base: "vs-dark",
            inherit: true,
            rules: [],
            colors: {
                "editor.background": "#020617",
            },
        });

        monaco.editor.setTheme("codebase-dark");

        // Apply any decorations that were already pending
        // before the editor finished mounting.
        applyDecorations();
    };

    useEffect(() => {
        applyDecorations();
    }, [
        content,
        highlightRanges,
    ]);

    return (
        <Editor
            height="100%"
            language={getLanguage(language)}
            value={content}
            onMount={onMount}
            theme="codebase-dark"
            options={{
                readOnly: true,

                automaticLayout: true,

                minimap: {
                    enabled: false,
                },

                glyphMargin: true,

                folding: true,

                contextmenu: false,

                scrollBeyondLastLine: false,

                renderLineHighlight: "all",

                stickyScroll: {
                    enabled: false,
                },

                scrollbar: {
                    verticalScrollbarSize: 8,
                    horizontalScrollbarSize: 8,
                    useShadows: false,
                },
            }}
        />
    );
}