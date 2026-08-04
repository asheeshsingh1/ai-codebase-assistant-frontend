import { api } from "./api";

export interface RepositoryFile {
    id: string;
    relative_path: string;
    language: string | null;
    extension: string;
    content: string;
}

export async function getRepositoryFile(
    repositoryFileId: string,
): Promise<RepositoryFile> {
    const response = await api.get(
        `/repository-files/${repositoryFileId}`,
    );

    return response.data;
}