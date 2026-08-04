"use client";

import { Plus } from "lucide-react";

interface Props {
    onAddRepository: () => void;
}

export default function SidebarCollapsed({
    onAddRepository,
}: Props) {
    return (
        <div className="flex flex-1 flex-col items-center gap-3 py-4">
            <button
                onClick={onAddRepository}
                className="rounded-md p-2 transition hover:bg-slate-800"
                title="Add Repository"
            >
                <Plus size={20} />
            </button>

            {/* Repository icons will go here later */}
        </div>
    );
}