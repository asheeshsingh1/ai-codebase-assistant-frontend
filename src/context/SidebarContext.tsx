"use client";

import {
    createContext,
    ReactNode,
    useContext,
    useState,
} from "react";

interface SidebarContextValue {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    toggle: () => void;
}

const SidebarContext =
    createContext<SidebarContextValue | null>(null);

export function SidebarProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [collapsed, setCollapsed] =
        useState(false);

    function toggle() {
        setCollapsed((prev) => !prev);
    }

    return (
        <SidebarContext.Provider
            value={{
                collapsed,
                setCollapsed,
                toggle,
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

export function useSidebar() {
    const context = useContext(
        SidebarContext,
    );

    if (!context) {
        throw new Error(
            "useSidebar must be used inside SidebarProvider",
        );
    }

    return context;
}