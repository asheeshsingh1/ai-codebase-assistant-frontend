import Sidebar from "@/components/sidebar/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import SourcesPanel from "@/components/sources/SourcesPanel";

export default function AppLayout() {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-100">

            {/* Sidebar */}
            <aside className="w-72 border-r border-slate-800">
                <Sidebar />
            </aside>

            {/* Main */}
            <main className="flex flex-1">
                <section className="flex-1">
                    <ChatWindow />
                </section>

                <aside className="w-96 border-l border-slate-800">
                    <SourcesPanel />
                </aside>
            </main>

        </div>
    );
}