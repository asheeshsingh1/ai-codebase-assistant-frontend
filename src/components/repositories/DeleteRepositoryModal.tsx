"use client";

import { Repository } from "@/types/repository";

interface Props {
    open: boolean;
    repository: Repository | null;
    loading: boolean;
    onClose: () => void;
    onConfirm: () => Promise<void>;
}

export default function DeleteRepositoryModal({
    open,
    repository,
    loading,
    onClose,
    onConfirm,
}: Props) {
    if (!open || !repository) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-md rounded-lg bg-slate-900 p-6 shadow-xl">
                <h2 className="text-xl font-semibold text-red-400">
                    Delete Repository
                </h2>

                <p className="mt-4 text-slate-300">
                    Are you sure you want to delete
                    <span className="font-semibold">
                        {" "}
                        {repository.name}
                    </span>
                    ?
                </p>

                <p className="mt-2 text-sm text-slate-500">
                    This will permanently remove:
                </p>

                <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-slate-400">
                    <li>Repository metadata</li>
                    <li>All indexed files</li>
                    <li>All code chunks</li>
                    <li>All embeddings</li>
                    <li>All chat history</li>
                    <li>The cloned repository on disk</li>
                </ul>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded border border-slate-700 px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={onConfirm}
                        className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50"
                    >
                        {loading ? "Deleting..." : "Delete"}
                    </button>
                </div>
            </div>
        </div>
    );
}