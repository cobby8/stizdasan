"use client";

import { motion } from "framer-motion";
import { ExternalLink, Instagram } from "lucide-react";

export default function Gallery() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6 mb-16">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 text-left"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight mb-6">
                            STIZ <span className="text-steez-orange">MOMENTS</span>
                        </h2>
                        <p className="text-zinc-500 text-lg mb-8 leading-relaxed">
                            코트 위에서 빛나는 아이들의 열정적인 순간들.<br />
                            스티즈 농구교실의 생생한 현장을 인스타그램에서 확인하세요.
                        </p>

                        <a
                            href="https://www.instagram.com/stiz_basketball_dasan/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-full hover:bg-steez-orange transition-colors group shadow-xl"
                        >
                            <Instagram size={24} />
                            <span className="font-bold text-lg">Follow @stiz_basketball_dasan</span>
                            <ExternalLink size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
                        </a>
                    </motion.div>

                    {/* Right Content: Instagram Card */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="flex-1 w-full max-w-md"
                    >
                        <div className="bg-zinc-50 rounded-3xl p-8 border border-zinc-100 flex flex-col items-center justify-center text-center shadow-lg hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center gap-2 mb-6 text-steez-orange font-bold uppercase tracking-widest text-sm">
                                <Instagram size={16} />
                                <span>Latest Update</span>
                            </div>

                            <div className="relative w-full aspect-square bg-white shadow-inner rounded-2xl overflow-hidden mb-6 group cursor-pointer border border-zinc-100">
                                <a href="https://www.instagram.com/stiz_basketball_dasan/" target="_blank" rel="noopener noreferrer" className="block w-full h-full relative flex items-center justify-center bg-zinc-100">
                                    {/* Placeholder for latest post content */}
                                    <Instagram size={64} className="text-zinc-300 group-hover:text-steez-orange transition-colors transform group-hover:scale-110 duration-300" />
                                    <span className="absolute bottom-6 font-bold text-zinc-400 group-hover:text-black">Click to view feed</span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Marquee Gallery */}
            <div className="relative flex overflow-x-hidden group border-t border-zinc-100 pt-12">
                <div className="animate-marquee whitespace-nowrap flex gap-8">
                    {/* Repeated images for marquee feel */}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="relative w-80 h-60 rounded-2xl overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                                <span className="font-black text-zinc-200 text-3xl">MOMENT {i}</span>
                            </div>
                        </div>
                    ))}
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={`dup-${i}`} className="relative w-80 h-60 rounded-2xl overflow-hidden shrink-0 grayscale group-hover:grayscale-0 transition-all duration-500">
                            <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                                <span className="font-black text-zinc-200 text-3xl">MOMENT {i}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
