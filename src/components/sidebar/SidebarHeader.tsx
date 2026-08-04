"use client";

import {
    PanelLeftClose,
    PanelLeftOpen,
} from "lucide-react";

interface Props {
    collapsed: boolean;
    onToggle: () => void;
}

export default function SidebarHeader({
    collapsed,
    onToggle,
}: Props) {
    return (
        <div
            className={`border-b border-slate-800 p-5 ${
                collapsed
                    ? "flex justify-center"
                    : "flex items-center justify-between"
            }`}
        >
            {!collapsed && (
                <h2 className="text-xl font-bold">
                    Repositories
                </h2>
            )}

            <button
                onClick={onToggle}
                className="rounded-md p-2 transition hover:bg-slate-800"
                title={
                    collapsed
                        ? "Expand Sidebar"
                        : "Collapse Sidebar"
                }
            >
                {collapsed ? (
                    <PanelLeftOpen size={20} />
                ) : (
                    <PanelLeftClose size={20} />
                )}
            </button>
        </div>
    );
}