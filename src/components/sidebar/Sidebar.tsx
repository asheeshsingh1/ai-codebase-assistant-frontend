"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";

import { useRepository } from "@/context/RepositoryContext";
import { useRepositories } from "@/hooks/useRepositories";
import { useCreateRepository } from "@/hooks/useCreateRepository";
import { useDeleteRepository } from "@/hooks/useDeleteRepository";

import AddRepositoryModal from "@/components/repositories/AddRepositoryModal";
import DeleteRepositoryModal from "@/components/repositories/DeleteRepositoryModal";
import { Repository } from "@/types/repository";

export default function Sidebar() {
    const {
        data: repositories,
        isLoading,
    } = useRepositories();

    const {
        selectedRepository,
        setSelectedRepository,
    } = useRepository();

    const createRepository = useCreateRepository();
    const deleteRepository = useDeleteRepository();

    const [showAddModal, setShowAddModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [repositoryToDelete, setRepositoryToDelete] =
        useState<Repository | null>(null);

    function openDeleteModal(repo: Repository) {
        setRepositoryToDelete(repo);
        setShowDeleteModal(true);
    }

    async function handleDelete() {
        if (!repositoryToDelete) return;

        await deleteRepository.mutateAsync(repositoryToDelete.id);

        if (selectedRepository?.id === repositoryToDelete.id) {
            setSelectedRepository(null);
        }

        setRepositoryToDelete(null);
        setShowDeleteModal(false);
    }

    return (
        <>
            <aside className="flex h-full w-72 flex-col border-r border-slate-800 bg-slate-900">
                <div className="border-b border-slate-800 p-5">
                    <h2 className="text-xl font-bold">
                        Repositories
                    </h2>

                    <button
                        onClick={() => setShowAddModal(true)}
                        className="mt-4 w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium transition hover:bg-blue-700"
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
                                            setSelectedRepository(repo)
                                        }
                                        className="flex-1 text-left"
                                    >
                                        <div className="font-medium">
                                            {repo.name}
                                        </div>

                                        {/* <div className="mt-1 truncate text-xs text-slate-400">
                                            {repo.git_url}
                                        </div> */}

                                        <div className="mt-2 text-xs">
                                            {repo.status}
                                        </div>
                                    </button>

                                    <button
                                        onClick={() =>
                                            openDeleteModal(repo)
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
            </aside>

            <AddRepositoryModal
                open={showAddModal}
                onClose={() => setShowAddModal(false)}
                onSubmit={async (gitUrl, branch) => {
                    await createRepository.mutateAsync({
                        git_url: gitUrl,
                        default_branch: branch,
                    });

                    setShowAddModal(false);
                }}
            />

            <DeleteRepositoryModal
                open={showDeleteModal}
                repository={repositoryToDelete}
                loading={deleteRepository.isPending}
                onClose={() => {
                    setShowDeleteModal(false);
                    setRepositoryToDelete(null);
                }}
                onConfirm={handleDelete}
            />
        </>
    );
}