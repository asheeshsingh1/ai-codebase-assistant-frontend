export interface Repository {
    id: string;
    name: string;
    git_url: string;
    default_branch: string;
    local_path: string;
    status: string;
    created_at: string;
    updated_at: string;
}