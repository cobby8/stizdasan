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
        <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end">
            <AnimatePresence>
                {isEditMode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="flex flex-col gap-2"
                    >
                        {hasChanges && (
                            <button
                                onClick={saveAll}
                                disabled={isSaving}
                                className="flex items-center gap-2 px-6 py-3 bg-steez-orange text-white rounded-full shadow-lg font-bold hover:bg-black transition-colors"
                            >
                                <Save size={20} />
                                {isSaving ? "저장 중..." : "변경사항 저장"}
                            </button>
                        )}
                        <div className="bg-black/80 text-white px-4 py-2 rounded-lg text-sm backdrop-blur-sm">
                            편집 모드 활성화됨
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <button
                onClick={toggleEditMode}
                className={`p-4 rounded-full shadow-xl transition-all transform hover:scale-105 ${isEditMode ? "bg-zinc-800 text-white" : "bg-black text-white hover:bg-steez-orange"
                    }`}
            >
                {isEditMode ? <X size={24} /> : <Edit2 size={24} />}
            </button>
        </div>
    );
}
