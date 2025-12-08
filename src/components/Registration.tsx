"use client";

import { motion } from "framer-motion";
import { UserPlus, Shirt, ShoppingBag, ExternalLink } from "lucide-react";

const cards = [
    {
        title: "가입 신청서",
        description: "스티즈 농구교실의 새로운 멤버가 되어보세요!",
        icon: UserPlus,
        link: "https://forms.gle/YwXL21AsaZocFog17",
        color: "bg-blue-50 text-blue-600",
        hover: "hover:bg-blue-600 hover:text-white"
    },
    {
        title: "유니폼 신청",
        description: "팀의 소속감을 높여주는 필수 유니폼 신청.",
        icon: Shirt,
        link: "https://forms.gle/nrKKzvNq3VMbmgSB7",
        color: "bg-steez-orange/10 text-steez-orange",
        hover: "hover:bg-steez-orange hover:text-white"
    },
    {
        title: "이너웨어 구매",
        description: "활동성을 높여주는 기능성 이너웨어 샵.",
        icon: ShoppingBag,
        link: "https://m.stiz.kr/category/%ED%82%A4%EC%A6%88/265/",
        color: "bg-zinc-100 text-zinc-800",
        hover: "hover:bg-zinc-800 hover:text-white"
    }
];

export default function Registration() {
    return (
        <section id="registration" className="py-16 md:py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-6 italic uppercase tracking-tight text-zinc-900">
                        JOIN <span className="text-steez-orange">US</span>
                    </h2>
                    <p className="text-zinc-600 text-lg max-w-2xl mx-auto">
                        망설이지 말고 시작하세요. 지금이 가장 빠른 때입니다.
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {cards.map((card, idx) => (
                        <motion.a
                            key={idx}
                            href={card.link}
                            target="_blank"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className={`block p-10 rounded-3xl border border-zinc-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-2 group bg-white`}
                        >
                            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-colors ${card.color} ${card.hover}`}>
                                <card.icon size={32} />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-2xl font-bold text-zinc-900">{card.title}</h3>
                                <ExternalLink size={20} className="text-zinc-300 group-hover:text-zinc-900 transition-colors" />
                            </div>
                            <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-600">
                                {card.description}
                            </p>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
