"use client";

import { useAdminEdit } from "@/context/AdminEditContext";
import { useSession } from "next-auth/react";
import { Edit2, Save, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingEditButton() {
    const { data: session } = useSession();
    const { isEditMode, toggleEditMode, saveAll, isSaving, unsavedChanges } = useAdminEdit();

    // Only show for generic admins (simple check)
    if (!session) return null;

    const hasChanges = Object.keys(unsavedChanges).length > 0;

    return (
        <div className="fixed top-24 right-8 z-[9999] flex flex-col items-end gap-3">
            <AnimatePresence>
                {/* Save Button (Shows when edits exist) */}
                {isEditMode && hasChanges && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                    >
                        <button
                            onClick={saveAll}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-6 py-3 bg-steez-orange text-white rounded-full shadow-xl font-bold hover:bg-black transition-all border-2 border-white"
                        >
                            <Save size={20} />
                            {isSaving ? "저장 중..." : "저장하기"}
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Edit Mode Button */}
            <button
                onClick={toggleEditMode}
                className={`p-4 rounded-full shadow-xl transition-all border-2 border-white ${isEditMode
                    ? "bg-zinc-900 text-white hover:bg-zinc-700"
                    : "bg-steez-orange text-white hover:bg-black"
                    }`}
            >
                {isEditMode ? <X size={24} /> : <Edit2 size={24} />}
            </button>

            {isEditMode && (
                <div className="bg-black/80 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm shadow-md">
                    편집 모드 ON
                </div>
            )}
        </div>
    );
}
