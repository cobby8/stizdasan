"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import heroData from "../data/hero.json";
import EditableText from "./admin/editor/EditableText";
import EditableImage from "./admin/editor/EditableImage";

export default function Hero() {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-white flex flex-col items-center justify-center pt-20">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-50 via-white to-white" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-steez-orange/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-zinc-100 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

            {/* Main Content Center */}
            <div className="container mx-auto px-6 relative z-20 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8"
                >
                    <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-zinc-900 leading-[0.9] italic tracking-tight mb-8">
                        <EditableText
                            section="hero"
                            field="title_white"
                            initialValue={heroData.title_white}
                            as="span"
                        /><br />
                        <EditableText
                            section="hero"
                            field="title_orange"
                            initialValue={heroData.title_orange}
                            className="text-steez-orange"
                            as="span"
                        />
                    </h1>
                    <EditableText
                        section="hero"
                        field="subtitle"
                        initialValue={heroData.subtitle}
                        className="text-2xl font-bold text-zinc-500 tracking-widest uppercase block"
                        as="p"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <button className="px-8 py-4 bg-steez-orange text-white text-lg font-bold rounded-full hover:bg-black transition-all duration-300 shadow-xl shadow-steez-orange/20">
                        <EditableText section="hero" field="primary_button" initialValue={heroData.primary_button} />
                    </button>
                    <button className="px-8 py-4 bg-white border border-zinc-200 text-black text-lg font-bold rounded-full hover:bg-zinc-50 transition-all shadow-sm">
                        <EditableText section="hero" field="secondary_button" initialValue={heroData.secondary_button} />
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
                <div className="relative w-80 h-24 md:w-96 md:h-32">
                    <EditableImage
                        section="hero"
                        field="slogan_image"
                        initialValue={heroData.slogan_image}
                        alt="Slogan"
                        fill
                        imageClassName="object-contain object-right"
                    />
                </div>
            </motion.div>
        </section>
    );
}
