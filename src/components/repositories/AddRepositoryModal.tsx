"use client";

import { useState } from "react";

interface Props {
    open: boolean;
    onClose: () => void;
    onSubmit: (gitUrl: string, branch?: string) => Promise<void>;
}

export default function AddRepositoryModal({
    open,
    onClose,
    onSubmit,
}: Props) {
    const [gitUrl, setGitUrl] = useState("");
    const [branch, setBranch] = useState("");
    const [loading, setLoading] = useState(false);

    if (!open) return null;

    async function handleSubmit() {
        if (!gitUrl.trim()) return;

        setLoading(true);

        try {
            await onSubmit(
                gitUrl,
                branch || undefined,
            );

            setGitUrl("");
            setBranch("");
            onClose();
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-full max-w-lg rounded-lg bg-slate-900 p-6 shadow-xl">
                <h2 className="mb-6 text-xl font-semibold">
                    Add Repository
                </h2>

                <div className="space-y-4">
                    <input
                        className="w-full rounded border border-slate-700 bg-slate-800 p-3"
                        placeholder="https://github.com/user/repo"
                        value={gitUrl}
                        onChange={(e) =>
                            setGitUrl(e.target.value)
                        }
                    />

                    <input
                        className="w-full rounded border border-slate-700 bg-slate-800 p-3"
                        placeholder="main (optional)"
                        value={branch}
                        onChange={(e) =>
                            setBranch(e.target.value)
                        }
                    />
                </div>

                <div className="mt-8 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="rounded border border-slate-600 px-4 py-2"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={loading}
                        onClick={handleSubmit}
                        className="rounded bg-blue-600 px-4 py-2 disabled:opacity-50"
                    >
                        {loading
                            ? "Adding..."
                            : "Add Repository"}
                    </button>
                </div>
            </div>
        </div>
    );
}