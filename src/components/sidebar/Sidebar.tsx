export default function Sidebar() {
    const repositories = [
        "FastAPI",
        "AI Codebase Assistant",
        "Flask Blog",
    ];

    return (
        <div className="flex h-full flex-col">
            {/* Header */}
            <div className="border-b border-slate-800 p-4">
                <h2 className="text-lg font-semibold">
                    Repositories
                </h2>

                <button className="mt-4 w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-medium hover:bg-indigo-500 transition">
                    + Add Repository
                </button>
            </div>

            {/* Repository List */}
            <div className="flex-1 overflow-y-auto p-2">
                {repositories.map((repo) => (
                    <button
                        key={repo}
                        className="mb-2 w-full rounded-md px-3 py-2 text-left hover:bg-slate-800 transition"
                    >
                        {repo}
                    </button>
                ))}
            </div>

            {/* Footer */}
            <div className="border-t border-slate-800 p-4 text-sm text-slate-400">
                AI Codebase Assistant
            </div>
        </div>
    );
}