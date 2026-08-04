"use client";

import { Citation } from "@/types/chat";
import SourceItem from "./SourceItem";

interface Props {
    citations?: Citation[] | null;
}

export default function Sources({
    citations,
}: Props) {
    if (!citations || citations.length === 0) {
        return null;
    }

    const grouped = citations.reduce<
        Record<string, Citation[]>
    >((acc, citation) => {
        if (!acc[citation.file_path]) {
            acc[citation.file_path] = [];
        }

        acc[citation.file_path].push(citation);

        return acc;
    }, {});

    return (
        <div className="mt-5 border-t border-slate-700 pt-4">
            <h4 className="mb-3 text-sm font-semibold text-slate-400">
                Sources
            </h4>

            <div className="space-y-3">
                {Object.entries(grouped).map(
                    ([filePath, citations]) => (
                        <SourceItem
                            key={filePath}
                            filePath={filePath}
                            citations={citations}
                        />
                    )
                )}
            </div>
        </div>
    );
}