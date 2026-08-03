export interface Citation {
    file_path: string;
    start_line: number;
    end_line: number;
}

export interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    citations?: Citation[] | null;

    // Used only by the frontend while waiting for the backend.
    isThinking?: boolean;
}

export interface ChatResponse {
    answer: string;
    citations: Citation[];
}