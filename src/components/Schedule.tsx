"use client";

import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

export default function Schedule() {
    return (
        <section id="schedule" className="py-16 md:py-20 bg-zinc-50 border-t border-zinc-100">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/3 text-center lg:text-left"
                    >
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 text-steez-orange font-bold uppercase tracking-wider">
                            <CalendarDays size={24} />
                            <span>2025 Season</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-black mb-6 italic uppercase tracking-tight text-zinc-900">
                            연간 일정 <span className="text-steez-orange">SCHEDULE</span>
                        </h2>
                        <p className="text-zinc-600 text-lg leading-relaxed mb-8">
                            스티즈 농구교실의 주요 일정과 대회 계획을<br />
                            캘린더에서 실시간으로 확인하세요.
                        </p>
                        <div className="p-6 bg-white rounded-2xl border border-zinc-100 shadow-sm text-left">
                            <h4 className="font-bold text-zinc-900 mb-2">공지사항</h4>
                            <p className="text-sm text-zinc-500">일정은 체육관 사정에 따라 변동될 수 있습니다. 자세한 내용은 공지사항 게시판을 참고해주세요.</p>
                        </div>
                    </motion.div>

                    {/* Calendar Embed Container - Responsive */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full lg:w-2/3 h-[500px] md:h-[600px] bg-white rounded-3xl overflow-hidden shadow-2xl border-[8px] border-white ring-1 ring-zinc-200"
                    >
                        {/* Browser/Window Header Decoration */}
                        <div className="h-8 bg-zinc-100 border-b border-zinc-200 flex items-center px-4 gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-400" />
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                            <div className="w-3 h-3 rounded-full bg-green-400" />
                        </div>

                        <div className="w-full h-[calc(100%-32px)]">
                            <iframe
                                src="https://calendar.google.com/calendar/embed?src=agdl0i9sv196tei39it5t895io%40group.calendar.google.com&ctz=Asia%2FSeoul"
                                style={{ border: 0, width: "100%", height: "100%" }}
                                frameBorder="0"
                                scrolling="no"
                                title="STIZ Calendar"
                            ></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
