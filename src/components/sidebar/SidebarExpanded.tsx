"use client";

import { Trash2 } from "lucide-react";

import { Repository } from "@/types/repository";

interface Props {
    repositories?: Repository[];
    isLoading: boolean;
    selectedRepository: Repository | null;

    onSelectRepository: (repository: Repository) => void;
    onDeleteRepository: (repository: Repository) => void;
    onAddRepository: () => void;
}

export default function SidebarExpanded({
    repositories,
    isLoading,
    selectedRepository,
    onSelectRepository,
    onDeleteRepository,
    onAddRepository,
}: Props) {
    return (
        <>
            <div className="border-b border-slate-800 p-5">
                <button
                    onClick={onAddRepository}
                    className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
                >
                    + Add Repository
                </button>
            </div>

            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="p-4 text-sm text-slate-400">
                        Loading repositories...
                    </div>
                ) : (
                    repositories?.map((repo) => (
                        <div
                            key={repo.id}
                            className={`border-b border-slate-800 transition ${
                                selectedRepository?.id === repo.id
                                    ? "bg-slate-800"
                                    : "hover:bg-slate-800/60"
                            }`}
                        >
                            <div className="flex items-start justify-between px-5 py-4">
                                <button
                                    onClick={() =>
                                        onSelectRepository(repo)
                                    }
                                    className="flex-1 text-left"
                                >
                                    <div className="font-medium">
                                        {repo.name}
                                    </div>

                                    <div className="mt-2 text-xs">
                                        {repo.status}
                                    </div>
                                </button>

                                <button
                                    onClick={() =>
                                        onDeleteRepository(repo)
                                    }
                                    className="ml-3 rounded p-2 text-slate-400 transition hover:bg-red-500/10 hover:text-red-500"
                                    title="Delete Repository"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}