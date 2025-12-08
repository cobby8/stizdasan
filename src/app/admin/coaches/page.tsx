"use client";

import { useState } from "react";
import { Save, Plus, Trash2, User } from "lucide-react";
import initialData from "../../../data/coaches.json";
import { useRouter } from "next/navigation";
import ImageUploader from "../../../components/ImageUploader";

type Coach = { name: string; role: string; desc: string; image?: string };

export default function CoachesAdmin() {
    const [data, setData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "coaches", data }),
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("Coaches saved successfully!");
            router.refresh();
        } catch (e) {
            alert("Error saving coaches");
        } finally {
            setIsSaving(false);
        }
    };

    const updateCoach = (type: "leadership" | "coaches", index: number, field: keyof Coach, value: string) => {
        const list = [...data[type]];
        list[index] = { ...list[index], [field]: value };
        setData({ ...data, [type]: list });
    };

    const addCoach = (type: "leadership" | "coaches") => {
        const newCoach = { name: "New Coach", role: "Role", desc: "Description", image: "" };
        setData({ ...data, [type]: [...data[type], newCoach] });
    };

    const removeCoach = (type: "leadership" | "coaches", index: number) => {
        if (!confirm("Delete this coach?")) return;
        const list = [...data[type]];
        list.splice(index, 1);
        setData({ ...data, [type]: list });
    };

    return (
        <div className="max-w-6xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black italic text-zinc-900">코치진 관리</h1>
                    <p className="text-zinc-500">리더십 및 코치 프로필 수정</p>
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

            {/* Leadership Section */}
            <section className="mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black text-zinc-800 uppercase tracking-tight">Leadership (리더십)</h2>
                    <button onClick={() => addCoach("leadership")} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                        <Plus size={16} /> 리더 추가
                    </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {data.leadership.map((member, idx) => (
                        <CoachCard
                            key={`leader-${idx}`}
                            member={member}
                            onChange={(field, val) => updateCoach("leadership", idx, field, val)}
                            onDelete={() => removeCoach("leadership", idx)}
                        />
                    ))}
                </div>
            </section>

            {/* Coaches Section */}
            <section>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-black text-zinc-800 uppercase tracking-tight">Coaches (코치진)</h2>
                    <button onClick={() => addCoach("coaches")} className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
                        <Plus size={16} /> 코치 추가
                    </button>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {data.coaches.map((member, idx) => (
                        <CoachCard
                            key={`coach-${idx}`}
                            member={member}
                            onChange={(field, val) => updateCoach("coaches", idx, field, val)}
                            onDelete={() => removeCoach("coaches", idx)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}

function CoachCard({ member, onChange, onDelete }: {
    member: Coach;
    onChange: (field: keyof Coach, val: string) => void;
    onDelete: () => void;
}) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-zinc-100 relative group flex flex-col gap-4">
            <button
                onClick={onDelete}
                className="absolute top-4 right-4 text-zinc-300 hover:text-red-500 transition-colors p-1 z-10"
                title="삭제"
            >
                <Trash2 size={16} />
            </button>

            <div className="flex justify-center">
                <ImageUploader
                    currentImage={member.image}
                    onUpload={(url) => onChange("image", url)}
                    label="프로필 사진"
                />
            </div>

            <div className="space-y-3">
                <input
                    className="w-full font-bold text-lg text-zinc-900 border-b border-transparent hover:border-zinc-200 focus:border-steez-orange focus:outline-none bg-transparent text-center"
                    value={member.name}
                    onChange={(e) => onChange("name", e.target.value)}
                    placeholder="이름"
                />
                <input
                    className="w-full text-sm font-bold text-steez-orange border-b border-transparent hover:border-zinc-200 focus:border-steez-orange focus:outline-none bg-transparent text-center"
                    value={member.role}
                    onChange={(e) => onChange("role", e.target.value)}
                    placeholder="직책 (예: 원장)"
                />
                <input
                    className="w-full text-xs text-zinc-500 border-b border-transparent hover:border-zinc-200 focus:border-steez-orange focus:outline-none bg-transparent text-center"
                    value={member.desc}
                    onChange={(e) => onChange("desc", e.target.value)}
                    placeholder="간단 소개"
                />
            </div>
        </div>
    );
}
