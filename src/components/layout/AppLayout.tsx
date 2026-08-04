import Sidebar from "@/components/sidebar/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import CodeViewer from "@/components/code/CodeViewer";

export default function AppLayout() {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-100">
            <aside className="w-72 border-r border-slate-800">
                <Sidebar />
            </aside>

            <main className="flex flex-1">
                <section className="flex-1">
                    <ChatWindow />
                </section>

                <aside className="w-[45%] border-l border-slate-800">
                    <CodeViewer />
                </aside>
            </main>
        </div>
    );
}