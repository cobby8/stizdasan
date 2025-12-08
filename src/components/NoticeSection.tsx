"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Megaphone, Star } from "lucide-react";
import noticeData from "../data/notices.json";

export default function NoticeSection() {
    const [openId, setOpenId] = useState<string | null>(null);
    const notices = [...noticeData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    if (notices.length === 0) return null;

    return (
        <section className="py-12 bg-zinc-900 text-white relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-steez-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-8 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-steez-orange">
                            <Megaphone size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black italic">NOTICE</h2>
                            <p className="text-zinc-400 text-sm">STIZ News & Schedules</p>
                        </div>
                    </div>
                </div>

                <div className="grid gap-4 max-w-4xl mx-auto">
                    {notices.map((notice) => (
                        <div key={notice.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 transition-colors">
                            <button
                                onClick={() => setOpenId(openId === notice.id ? null : notice.id)}
                                className="w-full flex items-center gap-4 px-6 py-4 text-left"
                            >
                                <div className="shrink-0">
                                    {notice.important && (
                                        <Star size={16} className="text-steez-orange fill-steez-orange" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className={`font-bold text-lg ${notice.important ? "text-steez-orange" : "text-white"}`}>
                                            {notice.title}
                                        </h3>
                                        <span className="text-xs text-zinc-500 font-mono hidden md:inline-block">{notice.date}</span>
                                    </div>
                                    <span className="text-xs text-zinc-500 font-mono md:hidden">{notice.date}</span>
                                </div>
                                <ChevronDown size={20} className={`text-zinc-500 transition-transform ${openId === notice.id ? "rotate-180" : ""}`} />
                            </button>
                            <AnimatePresence>
                                {openId === notice.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="border-t border-white/10 bg-black/20"
                                    >
                                        <div
                                            className="p-6 text-zinc-300 leading-relaxed whitespace-pre-wrap prose prose-invert max-w-none prose-img:rounded-xl prose-a:text-steez-orange prose-a:underline"
                                            dangerouslySetInnerHTML={{ __html: notice.content }}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
