"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";

interface AdminEditContextType {
    isEditMode: boolean;
    toggleEditMode: () => void;
    unsavedChanges: Record<string, unknown>;
    updateField: (section: string, field: string, value: unknown) => void;
    saveAll: () => Promise<void>;
    isSaving: boolean;
}

const AdminEditContext = createContext<AdminEditContextType | undefined>(undefined);

export function AdminEditProvider({ children }: { children: ReactNode }) {
    const { data: session } = useSession();
    const [isEditMode, setIsEditMode] = useState(false);
    const [unsavedChanges, setUnsavedChanges] = useState<Record<string, unknown>>({});
    const [isSaving, setIsSaving] = useState(false);

    // Reset edit mode if not logged in
    useEffect(() => {
        if (!session) {
            setIsEditMode(false);
        }
    }, [session]);

    const toggleEditMode = () => {
        setIsEditMode((prev) => !prev);
    };

    const updateField = (section: string, field: string, value: unknown) => {
        setUnsavedChanges((prev) => ({
            ...prev,
            [section]: {
                ...(prev[section] as Record<string, unknown> || {}),
                [field]: value
            }
        }));
    };

    const saveAll = async () => {
        setIsSaving(true);
        try {
            // Send each section's updates to the API
            const promises = Object.entries(unsavedChanges).map(([section, data]) =>
                fetch("/api/editor/save", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ section, data }),
                })
            );

            await Promise.all(promises);

            // Clear changes after successful save make sure to reload or re-fetch if needed
            // For now, we assume strict reload or optimistic UI
            setUnsavedChanges({});
            alert("변경사항이 저장되었습니다.");
            window.location.reload(); // Simple reload to reflect changes from JSON source
        } catch (error) {
            console.error("Failed to save changes:", error);
            alert("저장 중 오류가 발생했습니다.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <AdminEditContext.Provider value={{ isEditMode, toggleEditMode, unsavedChanges, updateField, saveAll, isSaving }}>
            {children}
        </AdminEditContext.Provider>
    );
}

export function useAdminEdit() {
    const context = useContext(AdminEditContext);
    if (!context) {
        throw new Error("useAdminEdit must be used within an AdminEditProvider");
    }
    return context;
}
