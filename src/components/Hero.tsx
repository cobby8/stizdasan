"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-50 via-white to-white" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-steez-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

            {/* Main Content Center - Dynamic Text or just Clean */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    {/* Center visuals can be text instead of Logo to avoid duplication with Header Logo */}
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-zinc-900 leading-[0.9] italic tracking-tight mb-8">
                        STIZ<br />
                        <span className="text-steez-orange">BASKETBALL</span>
                    </h1>
                    <p className="text-2xl font-bold text-zinc-500 tracking-widest uppercase">Dasan Academy</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <button className="px-8 py-4 bg-steez-orange text-white text-lg font-bold rounded-full hover:bg-black transition-all duration-300 shadow-xl shadow-steez-orange/20">
                        수강 상담하기
                    </button>
                    <button className="px-8 py-4 bg-white border border-zinc-200 text-black text-lg font-bold rounded-full hover:bg-zinc-50 transition-all shadow-sm">
                        커리큘럼 확인
                    </button>
                </motion.div>
            </div>

            {/* Slogan at Bottom Right */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute bottom-12 right-6 md:right-12 z-20"
            >
                <div className="relative w-64 h-16 md:w-80 md:h-24">
                    <Image
                        src="/images/new_slogan.png"
                        alt="DESIGN YOUR GAME"
                        fill
                        className="object-contain object-right"
                    />
                </div>
            </motion.div>
        </section>
    );
}
