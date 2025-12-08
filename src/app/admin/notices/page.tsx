"use client";

import { useState, useRef } from "react";
import { Save, Plus, Trash2, Star, Edit, X, Bold, Italic, Link as LinkIcon, Image as ImageIcon } from "lucide-react";
import initialData from "../../../data/notices.json";
import { useRouter } from "next/navigation";

// Define Notice Type
type Notice = {
    id: string;
    title: string;
    date: string;
    content: string;
    important: boolean;
};

export default function NoticesAdmin() {
    const [notices, setNotices] = useState<Notice[]>(initialData);
    const [isSaving, setIsSaving] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState<Notice>({
        id: "", title: "", date: "", content: "", important: false
            < div className="flex justify-between items-center mb-4" >
                        <h3 className="text-lg font-bold text-zinc-900">{editingId === "new" ? "새 공지사항 작성" : "공지사항 수정"}</h3>
                        <button onClick={cancelEdit} className="text-zinc-400 hover:text-zinc-600"><X size={20} /></button>
                    </div >
        <div className="space-y-4">
            <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">제목</label>
                <input
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg font-bold"
                    placeholder="공지사항 제목을 입력하세요"
                />
            </div>
            <div className="flex gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-bold text-zinc-400 mb-1">날짜</label>
                    <input
                        type="date"
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div className="flex items-center pt-5">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                        <input
                            type="checkbox"
                            checked={formData.important}
                            onChange={e => setFormData({ ...formData, important: e.target.checked })}
                            className="w-5 h-5 accent-steez-orange"
                        />
                        <span className="font-bold text-steez-orange">중요 공지 설정</span>
                    </label>
                </div>
            </div>

            {/* Rich Text Editor Area */}
            <div>
                <label className="block text-xs font-bold text-zinc-400 mb-1">내용</label>
                <div className="border rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-black">
                    {/* Toolbar */}
                    <div className="bg-zinc-50 border-b p-2 flex gap-1">
                        <button onClick={() => insertText("<b>", "</b>")} className="p-2 hover:bg-zinc-200 rounded" title="Bold">
                            <Bold size={16} />
                        </button>
                        <button onClick={() => insertText("<i>", "</i>")} className="p-2 hover:bg-zinc-200 rounded" title="Italic">
                            <Italic size={16} />
                        </button>
                        <div className="w-px bg-zinc-300 mx-1 mt-1 mb-1"></div>
                        <button onClick={handleLink} className="p-2 hover:bg-zinc-200 rounded" title="Insert Link">
                            <LinkIcon size={16} />
                        </button>
                        <button onClick={() => fileInputRef.current?.click()} className="p-2 hover:bg-zinc-200 rounded" title="Insert Image">
                            <ImageIcon size={16} />
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </div>
                    <textarea
                        ref={textareaRef}
                        value={formData.content}
                        onChange={e => setFormData({ ...formData, content: e.target.value })}
                        className="w-full px-4 py-4 h-96 outline-none resize-y text-zinc-800 leading-relaxed font-mono text-sm"
                        placeholder="HTML 태그를 사용할 수 있습니다. 내용을 입력하세요..."
                    />
                </div>
                <p className="text-xs text-zinc-400 mt-1">* 이미지나 링크는 위 도구 모음을 사용하여 쉽게 삽입할 수 있습니다.</p>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button onClick={cancelEdit} className="px-4 py-2 text-zinc-500 font-bold hover:bg-zinc-100 rounded-lg">취소</button>
                <button onClick={saveEdit} className="px-6 py-2 bg-steez-orange text-white font-bold rounded-lg hover:bg-black transition-colors">확인</button>
            </div>
        </div>
                </div >
            )
}

{/* List */ }
<div className="bg-white rounded-2xl shadow-sm border border-zinc-100 overflow-hidden">
    <table className="w-full text-left">
        <thead className="bg-zinc-50 border-b border-zinc-100">
            <tr>
                <th className="px-6 py-4 font-black text-zinc-400 text-xs uppercase">상태</th>
                <th className="px-6 py-4 font-black text-zinc-400 text-xs uppercase">제목</th>
                <th className="px-6 py-4 font-black text-zinc-400 text-xs uppercase">날짜</th>
                <th className="px-6 py-4 font-black text-zinc-400 text-xs uppercase text-right">관리</th>
            </tr>
        </thead>
        <tbody className="divide-y divide-zinc-50">
            {notices.map(notice => (
                <tr key={notice.id} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4">
                        {notice.important ? (
                            <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-bold flex w-fit items-center gap-1">
                                <Star size={12} fill="currentColor" /> 중요
                            </span>
                        ) : (
                            <span className="bg-zinc-100 text-zinc-500 px-2 py-1 rounded text-xs font-bold">일반</span>
                        )}
                    </td>
                    <td className="px-6 py-4 font-bold text-zinc-900">
                        {notice.title}
                    </td>
                    <td className="px-6 py-4 text-zinc-500 text-sm font-mono">
                        {notice.date}
                    </td>
                    <td className="px-6 py-4 text-right flex justify-end gap-2">
                        <button onClick={() => startEdit(notice)} className="p-2 text-zinc-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit size={18} />
                        </button>
                        <button onClick={() => deleteNotice(notice.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </td>
                </tr>
            ))}
            {notices.length === 0 && (
                <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-zinc-400 font-bold">
                        등록된 공지사항이 없습니다.
                    </td>
                </tr>
            )}
        </tbody>
    </table>
</div>
        </div >
    );
}
