"use client";

import { useState } from "react";
import { Save, MapPin } from "lucide-react";
import initialData from "../../../data/locations.json";
import { useRouter } from "next/navigation";

type BranchKey = "dasan1" | "dasan2";
type Branch = typeof initialData.dasan1;

export default function LocationsAdmin() {
    const [data, setData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "locations", data }),
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("Locations saved successfully!");
            router.refresh();
        } catch (e) {
            alert("Error saving locations");
        } finally {
            setIsSaving(false);
        }
    };

    const handleChange = (branchKey: BranchKey, field: keyof Branch, value: string) => {
        const updatedBranch = { ...data[branchKey], [field]: value };
        setData({ ...data, [branchKey]: updatedBranch });
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black italic text-zinc-900">지점 위치 관리</h1>
                    <p className="text-zinc-500">지점 정보 및 지도 링크 수정</p>
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

            <div className="grid lg:grid-cols-2 gap-8">
                <BranchEditor
                    title="다산 1호점"
                    branch={data.dasan1}
                    onChange={(f, v) => handleChange("dasan1", f, v)}
                />
                <BranchEditor
                    title="다산 2호점"
                    branch={data.dasan2}
                    onChange={(f, v) => handleChange("dasan2", f, v)}
                />
            </div>
        </div>
    );
}

function BranchEditor({ title, branch, onChange }: {
    title: string;
    branch: Branch;
    onChange: (field: keyof Branch, val: string) => void;
}) {
    return (
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-zinc-100">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-steez-orange/10 rounded-lg flex items-center justify-center text-steez-orange">
                    <MapPin size={20} />
                </div>
                <h2 className="text-xl font-bold text-zinc-900">{title}</h2>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">지점명</label>
                    <input
                        className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg font-bold text-zinc-900 focus:ring-2 focus:ring-steez-orange focus:outline-none"
                        value={branch.name}
                        onChange={(e) => onChange("name", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">주소</label>
                    <input
                        className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-700 focus:ring-2 focus:ring-steez-orange focus:outline-none"
                        value={branch.address}
                        onChange={(e) => onChange("address", e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">상세 주소 (층/호수)</label>
                    <input
                        className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm text-zinc-700 focus:ring-2 focus:ring-steez-orange focus:outline-none"
                        value={branch.details}
                        onChange={(e) => onChange("details", e.target.value)}
                    />
                </div>
                <div className="pt-4 border-t border-zinc-100">
                    <h3 className="text-xs font-black text-zinc-900 mb-3 uppercase">지도 설정</h3>
                    <div className="space-y-3">
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">구글 지도 임베드 URL</label>
                            <input
                                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-500 font-mono focus:ring-2 focus:ring-steez-orange focus:outline-none"
                                value={branch.mapUrl}
                                onChange={(e) => onChange("mapUrl", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">T-Map 딥링크</label>
                            <input
                                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-500 font-mono focus:ring-2 focus:ring-steez-orange focus:outline-none"
                                value={branch.tmapLink}
                                onChange={(e) => onChange("tmapLink", e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-zinc-400 mb-1 uppercase">네이버 지도 링크</label>
                            <input
                                className="w-full px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-xs text-zinc-500 font-mono focus:ring-2 focus:ring-steez-orange focus:outline-none"
                                value={branch.naverLink}
                                onChange={(e) => onChange("naverLink", e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
