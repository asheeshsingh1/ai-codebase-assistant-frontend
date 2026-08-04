"use client";

import {
    Panel,
    PanelGroup,
    PanelResizeHandle,
} from "react-resizable-panels";
import { useEffect, useRef } from "react";
import type { ImperativePanelHandle } from "react-resizable-panels";

import { useSidebar } from "@/context/SidebarContext";

import Sidebar from "@/components/sidebar/Sidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import CodeViewer from "@/components/code/CodeViewer";
import MonacoViewer from "../code/MonacoViewer";

function ResizeHandle() {
    return (
        <PanelResizeHandle className="group relative w-px bg-slate-800 transition-colors hover:bg-blue-500 data-[resize-handle-active]:bg-blue-500">
            {/* Invisible hit area */}
            <div className="absolute inset-y-0 -left-2 -right-2 cursor-col-resize" />
        </PanelResizeHandle>
    );
}


export default function AppLayout() {
    const sidebarRef = useRef<ImperativePanelHandle>(null);

    const {
        collapsed,
        setCollapsed,
    } = useSidebar();

    useEffect(() => {
        if (!sidebarRef.current) return;

        if (collapsed) {
            sidebarRef.current.collapse();
        } else {
            sidebarRef.current.expand();
        }
    }, [collapsed]);

    return (
        <div className="h-screen bg-slate-950 text-slate-100">
            <PanelGroup
                direction="horizontal"
                autoSaveId="codebase-layout"
            >
                {/* Sidebar */}
                <Panel
                    ref={sidebarRef}
                    defaultSize={20}
                    minSize={12}
                    maxSize={35}
                    collapsedSize={4}
                    collapsible
                    onCollapse={() => setCollapsed(true)}
                    onExpand={() => setCollapsed(false)}
                >
                    <Sidebar />
                </Panel>

                <ResizeHandle />

                {/* Chat */}
                <Panel
                    defaultSize={35}
                    minSize={20}
                >
                    <ChatWindow />
                </Panel>

                <ResizeHandle />

                {/* Code Viewer */}
                <Panel
                    defaultSize={45}
                    minSize={20}
                >
                    <CodeViewer />
                </Panel>
            </PanelGroup>
        </div>
    );
}