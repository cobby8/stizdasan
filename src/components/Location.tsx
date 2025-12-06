"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import { branches } from "../data/locations";

export default function Location() {
    const [activeBranch, setActiveBranch] = useState<"dasan1" | "dasan2">("dasan1");
    const branch = branches[activeBranch];

    return (
        <section id="location" className="py-24 bg-zinc-50 border-t border-zinc-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <div className="flex items-center justify-center gap-2 text-steez-orange font-bold uppercase tracking-wider mb-2">
                        <MapPin size={24} />
                        <span>LOCATION</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-zinc-900 uppercase italic">
                        FIND US
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12 gap-4">
                    <button
                        onClick={() => setActiveBranch("dasan1")}
                        className={`px-8 py-3 rounded-full text-lg font-bold transition-all ${activeBranch === "dasan1"
                            ? "bg-black text-white shadow-lg scale-105"
                            : "bg-white text-zinc-400 border border-zinc-200 hover:bg-zinc-50"
                            }`}
                    >
                        다산 1호점
                    </button>
                    <button
                        onClick={() => setActiveBranch("dasan2")}
                        className={`px-8 py-3 rounded-full text-lg font-bold transition-all ${activeBranch === "dasan2"
                            ? "bg-black text-white shadow-lg scale-105"
                            : "bg-white text-zinc-400 border border-zinc-200 hover:bg-zinc-50"
                            }`}
                    >
                        다산 2호점
                    </button>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Info Card */}
                    <motion.div
                        key={activeBranch}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-1/3 bg-white p-8 rounded-3xl shadow-xl border border-zinc-100 flex flex-col justify-center"
                    >
                        <h3 className="text-3xl font-black text-zinc-900 mb-6">{branch.name}</h3>

                        <div className="space-y-6">
                            <div>
                                <span className="block text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Address</span>
                                <p className="text-lg text-zinc-700 font-medium">{branch.address}</p>
                                <p className="text-zinc-500">{branch.details}</p>
                            </div>

                            {/* T Map Button (Mobile Deep Link) */}
                            <a
                                href={branch.tmapLink}
                                className="inline-flex items-center justify-center w-full py-4 bg-[#FF004E] text-white font-bold rounded-xl hover:bg-[#E60046] transition-colors shadow-md group"
                            >
                                <Navigation size={20} className="mr-2 group-hover:rotate-12 transition-transform" />
                                <span>T맵으로 안내하기</span>
                            </a>
                            <p className="text-xs text-zinc-400 text-center">
                                * T맵 안내는 모바일 앱에서 실행됩니다.
                            </p>
                        </div>
                    </motion.div>

                    {/* Google Map Embed */}
                    <motion.div
                        key={activeBranch + "map"}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="lg:w-2/3 h-[400px] lg:h-auto min-h-[400px] bg-zinc-200 rounded-3xl overflow-hidden shadow-inner relative group"
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src={branch.mapUrl}
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            className="grayscale hover:grayscale-0 transition-all duration-500 w-full h-full"
                        ></iframe>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
