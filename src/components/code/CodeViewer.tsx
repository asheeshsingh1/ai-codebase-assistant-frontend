"use client";

import { useMemo } from "react";

import { useCodeViewer } from "@/context/CodeViewerContext";

export default function CodeViewer() {
    const {
        selectedFile,
        loading,
        highlightRanges,
    } = useCodeViewer();

    const lines = useMemo(
        () => selectedFile?.content.split("\n") ?? [],
        [selectedFile],
    );

    if (loading) {
        return (
            <div className="flex h-full items-center justify-center text-slate-400">
                Loading file...
            </div>
        );
    }

    if (!selectedFile) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-slate-500">
                <div className="text-5xl">📄</div>

                <h2 className="mt-4 text-lg font-semibold">
                    No file selected
                </h2>

                <p className="mt-2 text-sm">
                    Click a source citation to open the file.
                </p>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-slate-800 px-5 py-4">
                <h2 className="truncate font-semibold">
                    {selectedFile.relative_path}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                    {selectedFile.language}
                </p>
            </div>

            {/* Single scroll container */}
            <div className="flex-1 overflow-auto bg-slate-950">
                <div className="min-w-max">
                    {lines.map((line, index) => {
                        const lineNumber = index + 1;

                        const highlighted =
                            highlightRanges.some(
                                (range) =>
                                    lineNumber >= range.start &&
                                    lineNumber <= range.end,
                            );

                        return (
                            <div
                                key={lineNumber}
                                className={`flex transition-colors ${
                                    highlighted
                                        ? "bg-yellow-500/20"
                                        : "hover:bg-slate-900"
                                }`}
                            >
                                {/* Line number */}
                                <div
                                    className={`w-16 shrink-0 select-none border-r border-slate-800 px-3 py-1 text-right font-mono text-sm ${
                                        highlighted
                                            ? "text-yellow-300"
                                            : "text-slate-500"
                                    }`}
                                >
                                    {lineNumber}
                                </div>

                                {/* Code */}
                                <div className="whitespace-pre px-4 py-1 font-mono text-sm text-slate-200">
                                    {line || " "}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}