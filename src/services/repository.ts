import { api } from "./api";
import { Repository } from "@/types/repository";

export async function getRepositories(): Promise<Repository[]> {
    const response = await api.get("/repositories");
    return response.data;
}

export interface CreateRepositoryRequest {
    git_url: string;
    default_branch?: string;
}

export async function createRepository(
    payload: CreateRepositoryRequest,
): Promise<Repository> {
    const response = await api.post(
        "/repositories",
        payload,
    );

    return response.data;
}

export async function deleteRepository(
    repositoryId: string,
): Promise<void> {
    await api.delete(
        `/repositories/${repositoryId}`,
    );
}