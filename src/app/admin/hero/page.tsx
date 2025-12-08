"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import initialData from "../../../data/hero.json";
import { useRouter } from "next/navigation";
import ImageUploader from "../../../components/ImageUploader";

export default function HeroAdmin() {
    const [data, setData] = useState(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const router = useRouter();

    const handleSave = async () => {
        setIsSaving(true);
        try {
            const res = await fetch("/api/admin/save", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ type: "hero", data }),
            });
            if (!res.ok) throw new Error("Failed to save");
            alert("메인 화면 설정이 저장되었습니다!");
            router.refresh();
        } catch (e) {
            alert("저장 중 오류가 발생했습니다.");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-black italic text-zinc-900">메인 화면 관리</h1>
                    <p className="text-zinc-500">랜딩 페이지 컨텐츠 수정</p>
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

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Text Content */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100">
                        <h3 className="font-bold text-lg mb-4 text-zinc-900">타이틀 및 텍스트</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-zinc-600 mb-1">메인 타이틀 (흰색)</label>
                                <input
                                    value={data.title_white || ''}
                                    onChange={(e) => setData({ ...data, title_white: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-50 rounded-xl border-transparent focus:border-steez-orange focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-600 mb-1">메인 타이틀 (오렌지)</label>
                                <input
                                    value={data.title_orange || ''}
                                    onChange={(e) => setData({ ...data, title_orange: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-50 rounded-xl border-transparent focus:border-steez-orange focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-600 mb-1">서브 타이틀</label>
                                <textarea
                                    value={data.subtitle || ''}
                                    onChange={(e) => setData({ ...data, subtitle: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-50 rounded-xl border-transparent focus:border-steez-orange focus:bg-white transition-all h-24 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100">
                        <h3 className="font-bold text-lg mb-4 text-zinc-900">버튼 텍스트</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-zinc-600 mb-1">첫번째 버튼 (강조)</label>
                                <input
                                    value={data.primary_button || ''}
                                    onChange={(e) => setData({ ...data, primary_button: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-50 rounded-xl border-transparent focus:border-steez-orange focus:bg-white transition-all"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-600 mb-1">두번째 버튼 (기본)</label>
                                <input
                                    value={data.secondary_button || ''}
                                    onChange={(e) => setData({ ...data, secondary_button: e.target.value })}
                                    className="w-full px-4 py-3 bg-zinc-50 rounded-xl border-transparent focus:border-steez-orange focus:bg-white transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-zinc-100 sticky top-8">
                        <h3 className="font-bold text-lg mb-4 text-zinc-900">슬로건 이미지</h3>
                        <ImageUploader
                            currentImage={data.slogan_image || ''}
                            onUpload={(path) => setData({ ...data, slogan_image: path })}
                            label="Slogan Image"
                        />
                        <p className="text-xs text-zinc-400 mt-4 leading-relaxed">
                            * 배경이 투명한 PNG 이미지를 권장합니다.<br />
                            * 권장 사이즈: 1200x400px 이상
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
