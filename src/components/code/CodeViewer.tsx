"use client";

import { useCodeViewer } from "@/context/CodeViewerContext";
import MonacoViewer from "./MonacoViewer";

export default function CodeViewer() {
    const {
        selectedFile,
        loading,
        highlightRanges,
    } = useCodeViewer();

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
        <div className="flex h-full w-full flex-col overflow-hidden">
            {/* Header */}
            <div className="border-b border-slate-800 px-5 py-4">
                <h2 className="truncate font-semibold">
                    {selectedFile.relative_path}
                </h2>

                <p className="mt-1 text-xs text-slate-400">
                    {selectedFile.language}
                </p>
            </div>

            {/* Monaco */}
            <MonacoViewer
                language={selectedFile.language}
                content={selectedFile.content}
                highlightRanges={highlightRanges}
            />
        </div>
    );
}