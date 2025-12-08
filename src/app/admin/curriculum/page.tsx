"use client";

import { useState } from "react";
import { Save, Link as LinkIcon, ExternalLink } from "lucide-react";
import settingsData from "../../../data/settings.json";
import { useRouter } from "next/navigation";

export default function CurriculumAdmin() {
    const [sheetId, setSheetId] = useState(settingsData.sheetId);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "settings", data: { sheetId } }),
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("설정이 저장되었습니다!");
            router.refresh();
        } catch (e) {
            alert("저장 중 오류가 발생했습니다.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black italic text-zinc-900">시간표 관리 (Google Sheet)</h1>
                    <p className="text-zinc-500">구글 시트 연동 설정</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-3 bg-steez-orange text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-steez-orange/20 disabled:opacity-50"
                >
                    <Save size={20} />
                    {isSaving ? "저장 중..." : "변경사항 저장"}
                </button>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-zinc-600 mb-2">Google Sheet ID</label>
                    <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                            <LinkIcon size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                            <input
                                value={sheetId}
                                onChange={(e) => setSheetId(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-zinc-50 rounded-xl border-transparent focus:border-steez-orange focus:bg-white transition-all font-mono text-sm"
                                placeholder="Sheet ID 입력"
                            />
                        </div>
                    </div>
                    <p className="text-xs text-zinc-400 mt-2 ml-1">
                        * 구글 시트 URL의 `/d/` 와 `/edit` 사이의 문자열입니다.
                    </p>
                </div>

                <div className="pt-4 border-t border-zinc-100">
                    <a
                        href={`https://docs.google.com/spreadsheets/d/${sheetId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-steez-orange font-bold hover:underline"
                    >
                        <ExternalLink size={16} />
                        현재 시트 열기
                    </a>
                </div>
            </div>
        </div>
    );
}
