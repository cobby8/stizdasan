"use client";

import { motion } from "framer-motion";
import { CheckCircle, User } from "lucide-react";

const features = [
    {
        title: "Elite Coaching Staff",
        description: "선수 출신 엘리트 코치진의 전문적인 트레이닝.",
        icon: "/images/coach_icon.png"
    },
    {
        title: "Premium Facility",
        description: "국제 규격 코트와 충격 흡수 마루, 냉난방 완비.",
        icon: "/images/court_icon.png"
    },
    {
        title: "Systematic Program",
        description: "연령과 실력에 맞춘 STIZ만의 독자적인 교육 커리큘럼.",
        icon: "/images/program_icon.png"
    },
    {
        title: "Care System",
        description: "셔틀버스 운행 및 안심 문자 서비스, 철저한 출결 관리.",
        icon: "/images/care_icon.png"
    }
];

const leadership = [
    { name: "김수빈", role: "대표원장", desc: "STIZ Basketball 총괄" },
    { name: "권혜미", role: "원장", desc: "다산점 운영 총괄" },
    // 임용석 Removed
];

const coaches = [
    { name: "김은혜", role: "특별코치", desc: "Special Coach" },
    { name: "이진수", role: "코치", desc: "Professional Coach" },
    { name: "김영웅", role: "코치", desc: "Professional Coach" },
    { name: "박찬이", role: "코치", desc: "Professional Coach" },
    // 조은정 Removed
    // 김한범 (Not present, verified)
];

export default function About() {
    return (
        <section id="about" className="py-24 bg-zinc-50 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-6 italic uppercase tracking-tight text-zinc-900">
                        WHY <span className="text-steez-orange">STIZ?</span>
                    </h2>
                    <p className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                        농구 그 이상의 가치를 가르칩니다.<br />
                        <span className="font-bold text-zinc-900">스티즈 농구교실</span>은 단순한 스포츠 교육을 넘어<br className="hidden md:block" />
                        아이들의 바른 성장을 돕는 교육 기관입니다.
                    </p>
                </motion.div>

                {/* Feature Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:shadow-lg transition-all hover:-translate-y-1 group"
                        >
                            <div className="w-12 h-12 bg-steez-orange/10 rounded-xl flex items-center justify-center mb-6 text-steez-orange group-hover:bg-steez-orange group-hover:text-white transition-colors">
                                <CheckCircle size={24} />
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-zinc-900">{feature.title}</h3>
                            <p className="text-zinc-500 leading-relaxed word-keep">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Direct Coach Profiles Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="bg-white rounded-3xl p-8 md:p-16 border border-zinc-100 overflow-hidden relative"
                >
                    <div className="text-center mb-12">
                        <span className="text-steez-orange font-bold uppercase tracking-widest block mb-2">Team STIZ</span>
                        <h3 className="text-3xl md:text-4xl font-black text-zinc-900">Meet Our Coaches</h3>
                    </div>

                    {/* Leadership */}
                    <div className="flex justify-center flex-wrap gap-8 mb-12">
                        {leadership.map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center bg-zinc-50 p-6 rounded-2xl border border-zinc-100 w-64">
                                <div className="w-24 h-24 rounded-full bg-zinc-200 mb-4 flex items-center justify-center overflow-hidden">
                                    <User size={40} className="text-zinc-400" />
                                </div>
                                <h4 className="text-xl font-bold text-zinc-900">{member.name}</h4>
                                <span className="text-steez-orange font-bold text-sm mb-2">{member.role}</span>
                                <p className="text-zinc-500 text-sm">{member.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Coaches */}
                    <div className="flex justify-center flex-wrap gap-6">
                        {coaches.map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center p-4 rounded-xl hover:bg-zinc-50 transition-colors w-40">
                                <div className="w-20 h-20 rounded-full bg-zinc-100 mb-3 flex items-center justify-center">
                                    <User size={32} className="text-zinc-300" />
                                </div>
                                <h4 className="text-lg font-bold text-zinc-900">{member.name}</h4>
                                <span className="text-zinc-500 text-sm">{member.role}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
