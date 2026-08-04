"use client";

import { FileCode2 } from "lucide-react";

import { Citation } from "@/types/chat";
import { useCodeViewer } from "@/context/CodeViewerContext";

interface Props {
    filePath: string;
    citations: Citation[];
}

export default function SourceItem({
    filePath,
    citations,
}: Props) {
    const { openFile } = useCodeViewer();

    const filename =
        filePath.split("/").pop() ?? filePath;

    const directory =
        filePath.substring(
            0,
            filePath.lastIndexOf("/"),
        );

    async function handleClick() {
        if (citations.length === 0) {
            return;
        }

        const firstCitation = citations[0];

        await openFile(
            firstCitation.repository_file_id,
            citations.map((citation) => ({
                start: citation.start_line,
                end: citation.end_line,
            })),
        );
    }

    return (
        <button
            onClick={handleClick}
            className="w-full rounded-lg border border-slate-700 bg-slate-800/60 p-3 text-left transition hover:border-blue-500 hover:bg-slate-800"
        >
            <div className="flex items-center gap-2">
                <FileCode2
                    size={18}
                    className="text-blue-400"
                />

                <span className="font-medium">
                    {filename}
                </span>
            </div>

            {directory && (
                <div className="mt-1 text-xs text-slate-400">
                    {directory}
                </div>
            )}

            <div className="mt-3 flex flex-wrap gap-2">
                {citations.map((citation) => (
                    <span
                        key={`${citation.start_line}-${citation.end_line}`}
                        className="rounded bg-slate-700 px-2 py-1 text-xs text-slate-300"
                    >
                        {citation.start_line}–{citation.end_line}
                    </span>
                ))}
            </div>
        </button>
    );
}