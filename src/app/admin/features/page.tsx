"use client";

import { useState } from "react";
import { Save, Plus, Trash2, RotateCcw } from "lucide-react";
import initialData from "../../../data/features.json";
import { useRouter } from "next/navigation";

export default function FeaturesAdmin() {
    const [features, setFeatures] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "features", data: features }),
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("Features saved successfully!");
            router.refresh();
        } catch (e) {
            alert("Error saving features");
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (index: number, field: string, value: string) => {
        const newFeatures = [...features];
        newFeatures[index] = { ...newFeatures[index], [field]: value };
        setFeatures(newFeatures);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black italic text-zinc-900">특징 섹션 관리</h1>
                    <p className="text-zinc-500">&quot;Why STIZ?&quot; 섹션의 컨텐츠를 수정합니다.</p>
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

            <div className="space-y-6">
                {features.map((feature, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100">
                        <div className="flex gap-4 mb-4">
                            <div className="w-12 h-12 bg-zinc-100 rounded-xl flex items-center justify-center shrink-0">
                                <span className="font-bold text-zinc-400">#{idx + 1}</span>
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">제목 (한글/영문)</label>
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => handleChange(idx, "title", e.target.value)}
                                        className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg font-bold text-zinc-900 focus:ring-2 focus:ring-steez-orange focus:outline-none"
                                        placeholder="제목을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">설명</label>
                                    <textarea
                                        value={feature.description}
                                        onChange={(e) => handleChange(idx, "description", e.target.value)}
                                        className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-zinc-600 focus:ring-2 focus:ring-steez-orange focus:outline-none h-24 resize-none"
                                        placeholder="설명을 입력하세요"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">아이콘 경로 (Lucide React)</label>
                                    <input
                                        type="text"
                                        value={feature.icon}
                                        onChange={(e) => handleChange(idx, "icon", e.target.value)}
                                        className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-500 font-mono focus:ring-2 focus:ring-steez-orange focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 text-blue-600 rounded-xl text-sm font-bold text-center">
                참고: 현재는 각 항목을 직접 수정할 수 있습니다. 항목 추가/삭제가 필요한 경우 개발자에게 문의하세요.
            </div>
        </div>
    );
}
