"use client";

import { useState } from "react";

import { useRepository } from "@/context/RepositoryContext";
import { useSidebar } from "@/context/SidebarContext";

import { useRepositories } from "@/hooks/useRepositories";
import { useCreateRepository } from "@/hooks/useCreateRepository";
import { useDeleteRepository } from "@/hooks/useDeleteRepository";

import SidebarHeader from "./SidebarHeader";
import SidebarExpanded from "./SidebarExpanded";
import SidebarCollapsed from "./SidebarCollapsed";

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

    const {
        collapsed,
        toggle,
    } = useSidebar();

    const createRepository = useCreateRepository();
    const deleteRepository = useDeleteRepository();

    const [showAddModal, setShowAddModal] =
        useState(false);

    const [showDeleteModal, setShowDeleteModal] =
        useState(false);

    const [
        repositoryToDelete,
        setRepositoryToDelete,
    ] = useState<Repository | null>(null);

    function openDeleteModal(
        repository: Repository,
    ) {
        setRepositoryToDelete(repository);
        setShowDeleteModal(true);
    }

    async function handleDelete() {
        if (!repositoryToDelete) return;

        await deleteRepository.mutateAsync(
            repositoryToDelete.id,
        );

        if (
            selectedRepository?.id ===
            repositoryToDelete.id
        ) {
            setSelectedRepository(null);
        }

        setRepositoryToDelete(null);
        setShowDeleteModal(false);
    }

    return (
        <>
            <aside className="flex h-full w-full flex-col border-r border-slate-800 bg-slate-900">
                <SidebarHeader
                    collapsed={collapsed}
                    onToggle={toggle}
                />

                {collapsed ? (
                    <SidebarCollapsed
                        onAddRepository={() =>
                            setShowAddModal(true)
                        }
                    />
                ) : (
                    <SidebarExpanded
                        repositories={repositories}
                        isLoading={isLoading}
                        selectedRepository={
                            selectedRepository
                        }
                        onSelectRepository={
                            setSelectedRepository
                        }
                        onDeleteRepository={
                            openDeleteModal
                        }
                        onAddRepository={() =>
                            setShowAddModal(true)
                        }
                    />
                )}
            </aside>

            <AddRepositoryModal
                open={showAddModal}
                onClose={() =>
                    setShowAddModal(false)
                }
                onSubmit={async (
                    gitUrl,
                    branch,
                ) => {
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
                loading={
                    deleteRepository.isPending
                }
                onClose={() => {
                    setShowDeleteModal(false);
                    setRepositoryToDelete(null);
                }}
                onConfirm={handleDelete}
            />
        </>
    );
}