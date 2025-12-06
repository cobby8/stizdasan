"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fetchSchedule, TimeSlot, DAYS } from "../utils/sheet";
import { Info, X } from "lucide-react";

export default function Curriculum() {
    const [activeTab, setActiveTab] = useState<"dasan1" | "dasan2">("dasan1");
    const [schedule, setSchedule] = useState<TimeSlot[]>([]);
    const [loading, setLoading] = useState(false);

    const [selectedCell, setSelectedCell] = useState<{
        grade: string;
        count: number;
        day: string;
        time: string;
        x: number;
        y: number;
    } | null>(null);

    useEffect(() => {
        setLoading(true);
        fetchSchedule(activeTab).then((data) => {
            setSchedule(data);
            setLoading(false);
        });
    }, [activeTab]);

    return (
        <section id="curriculum" className="py-24 bg-white text-zinc-900 overflow-hidden relative" onClick={() => setSelectedCell(null)}>
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16 text-center"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 italic uppercase tracking-tight">
                        STIZ <span className="text-steez-orange">CURRICULUM</span>
                    </h2>
                    <p className="text-zinc-500 text-lg max-w-2xl mx-auto">
                        연령과 실력에 맞춘 체계적인 반 구성.<br />
                        <span className="text-steez-orange font-bold">각 반을 클릭</span>하여 현재 인원을 확인하세요.
                    </p>
                </motion.div>

                {/* Branch Tabs */}
                <div className="flex justify-center mb-12 gap-4">
                    <button
                        onClick={() => setActiveTab("dasan1")}
                        className={`px-8 py-3 rounded-full text-lg font-bold transition-all ${activeTab === "dasan1"
                                ? "bg-steez-orange text-white shadow-lg scale-105"
                                : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                            }`}
                    >
                        다산 1호점
                    </button>
                    <button
                        onClick={() => setActiveTab("dasan2")}
                        className={`px-8 py-3 rounded-full text-lg font-bold transition-all ${activeTab === "dasan2"
                                ? "bg-steez-orange text-white shadow-lg scale-105"
                                : "bg-zinc-100 text-zinc-400 hover:bg-zinc-200"
                            }`}
                    >
                        다산 2호점
                    </button>
                </div>

                {/* Timetable Grid */}
                <div className="overflow-x-auto relative min-h-[500px] border border-zinc-200 rounded-xl shadow-lg max-h-[800px] overflow-y-auto">
                    {loading ? (
                        <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-20 transition-all">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-steez-orange"></div>
                        </div>
                    ) : schedule.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-50">
                            <p className="text-zinc-400 text-xl font-bold">시간표 데이터가 없거나 로딩 중입니다.</p>
                        </div>
                    ) : (
                        <div className="min-w-[1000px] bg-white">
                            {/* Header - Sticky */}
                            <div className="grid grid-cols-[120px_repeat(7,1fr)] bg-zinc-100 border-b border-zinc-200 sticky top-0 z-10 shadow-sm">
                                <div className="p-4 text-center font-black text-zinc-600 text-sm uppercase tracking-wider">Time</div>
                                {DAYS.map(day => (
                                    <div key={day} className={`p-4 text-center font-black text-sm uppercase tracking-wider ${day === '토요일' ? 'text-blue-500' : day === '일요일' ? 'text-red-500' : 'text-zinc-700'}`}>
                                        {day}
                                    </div>
                                ))}
                            </div>

                            {/* Body */}
                            <div className="divide-y divide-zinc-100">
                                {schedule.map((slot, idx) => (
                                    <div key={idx} className="grid grid-cols-[120px_repeat(7,1fr)] hover:bg-zinc-50/50 transition-colors group">
                                        <div className="p-4 flex flex-col justify-center items-center border-r border-zinc-100 bg-white group-hover:bg-zinc-50 z-0">
                                            <span className="font-black text-steez-orange text-lg">{slot.label}</span>
                                            <span className="text-xs text-zinc-400 mt-1 whitespace-pre-line text-center font-medium">{slot.time}</span>
                                        </div>
                                        {DAYS.map(day => (
                                            <div key={day} className="p-2 flex flex-wrap gap-2 align-top content-start min-h-[80px] border-r border-zinc-50 last:border-0 relative">
                                                {slot.schedule[day] && slot.schedule[day].length > 0 ? (
                                                    slot.schedule[day].map((session, sIdx) => (
                                                        <button
                                                            key={sIdx}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedCell({
                                                                    grade: session.grade,
                                                                    count: session.count,
                                                                    day,
                                                                    time: slot.time,
                                                                    x: e.clientX,
                                                                    y: e.clientY
                                                                });
                                                            }}
                                                            className={`w-full text-left px-3 py-2 text-xs font-bold rounded-lg transition-all border shadow-sm ${session.grade.includes("학년") ? "bg-white border-zinc-200 text-zinc-700 hover:border-steez-orange hover:text-steez-orange" :
                                                                    session.grade.includes("대표") ? "bg-zinc-800 text-white border-zinc-800 hover:bg-steez-orange hover:border-steez-orange" :
                                                                        "bg-steez-orange/10 border-steez-orange/20 text-steez-orange hover:bg-steez-orange hover:text-white"
                                                                }`}
                                                        >
                                                            {session.grade}
                                                        </button>
                                                    ))
                                                ) : null}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Modal / Popover */}
                <AnimatePresence>
                    {selectedCell && (
                        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4" onClick={() => setSelectedCell(null)}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="bg-white p-8 rounded-3xl shadow-2xl border border-zinc-200 w-full max-w-sm text-center relative"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="absolute top-4 right-4 text-zinc-400 hover:text-black" onClick={() => setSelectedCell(null)}>
                                    <X size={20} />
                                </button>
                                <h3 className="text-xl font-black text-steez-orange mb-1">{selectedCell.grade}</h3>
                                <p className="text-zinc-500 text-sm font-bold mb-8">{selectedCell.day} / {selectedCell.time}</p>

                                <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100 flex items-center justify-between px-8">
                                    <span className="text-zinc-400 text-xs font-bold uppercase tracking-wider">Current</span>
                                    <span className="text-4xl font-black text-black">{selectedCell.count} <span className="text-lg font-bold text-zinc-400">명</span></span>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
