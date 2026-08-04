"use client";

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

import {
    RepositoryFile,
    getRepositoryFile,
} from "@/services/repository-file.service";

export interface HighlightRange {
    start: number;
    end: number;
}

interface CodeViewerContextValue {
    selectedFile: RepositoryFile | null;

    loading: boolean;

    highlightRanges: HighlightRange[];

    openFile: (
        repositoryFileId: string,
        ranges: HighlightRange[],
    ) => Promise<void>;

    closeFile: () => void;
}

const CodeViewerContext =
    createContext<CodeViewerContextValue | null>(
        null,
    );

export function CodeViewerProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [selectedFile, setSelectedFile] =
        useState<RepositoryFile | null>(null);

    const [loading, setLoading] =
        useState(false);

    const [highlightRanges, setHighlightRanges] =
        useState<HighlightRange[]>([]);

    async function openFile(
        repositoryFileId: string,
        ranges: HighlightRange[],
    ) {
        setLoading(true);

        try {
            const file =
                await getRepositoryFile(
                    repositoryFileId,
                );

            setSelectedFile(file);
            setHighlightRanges(ranges);
        } finally {
            setLoading(false);
        }
    }

    function closeFile() {
        setSelectedFile(null);
        setHighlightRanges([]);
    }

    return (
        <CodeViewerContext.Provider
            value={{
                selectedFile,
                loading,
                highlightRanges,
                openFile,
                closeFile,
            }}
        >
            {children}
        </CodeViewerContext.Provider>
    );
}

export function useCodeViewer() {
    const context = useContext(
        CodeViewerContext,
    );

    if (!context) {
        throw new Error(
            "useCodeViewer must be used inside CodeViewerProvider",
        );
    }

    return context;
}