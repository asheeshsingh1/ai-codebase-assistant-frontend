"use client";

import { createContext, useContext, useState } from "react";
import { Repository } from "@/types/repository";

type RepositoryContextType = {
    selectedRepository: Repository | null;
    setSelectedRepository: (repo: Repository | null) => void;
};

const RepositoryContext = createContext<RepositoryContextType | undefined>(
    undefined
);

export function RepositoryProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [selectedRepository, setSelectedRepository] =
        useState<Repository | null>(null);

    return (
        <RepositoryContext.Provider
            value={{
                selectedRepository,
                setSelectedRepository,
            }}
        >
            {children}
        </RepositoryContext.Provider>
    );
}

export function useRepository() {
    const context = useContext(RepositoryContext);

    if (!context) {
        throw new Error(
            "useRepository must be used inside RepositoryProvider"
        );
    }

    return context;
}