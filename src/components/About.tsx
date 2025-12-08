"use client";

import { motion } from "framer-motion";
import { CheckCircle, User } from "lucide-react";
import { features } from "../data/features";
import { leadership, coaches } from "../data/coaches";
import EditableText from "./admin/editor/EditableText";
import aboutData from "../data/about.json";

export default function About() {
    return (
        <section id="about" className="py-16 md:py-20 bg-zinc-50 overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <h2 className="text-3xl md:text-4xl font-black mb-4 italic uppercase tracking-tight text-zinc-900">
                        <EditableText section="about" field="title_main" initialValue={aboutData.title_main} as="span" />
                    </h2>
                    <EditableText
                        section="about"
                        field="subtitle"
                        initialValue={aboutData.subtitle}
                        className="text-zinc-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed block"
                        as="p"
                        multiline
                    />
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
                        <EditableText
                            section="about"
                            field="coaches_subtitle"
                            initialValue={aboutData.coaches_subtitle}
                            className="text-steez-orange font-bold uppercase tracking-widest block mb-2"
                            as="span"
                        />
                        <h3 className="text-3xl font-black text-zinc-900">
                            <EditableText section="about" field="coaches_title" initialValue={aboutData.coaches_title} as="span" />
                        </h3>
                    </div>

                    {/* Leadership */}
                    <div className="flex justify-center flex-wrap gap-8 mb-12">
                        {leadership.map((member, idx) => (
                            <div key={idx} className="flex flex-col items-center bg-zinc-50 p-6 rounded-2xl border border-zinc-100 w-64">
                                <div className="w-24 h-24 rounded-full bg-zinc-200 mb-4 flex items-center justify-center overflow-hidden relative">
                                    {member.image ? (
                                        <div className="relative w-full h-full">
                                            {/* Using standard img for simplicity if remote/local mix issues, but Next Image is better */}
                                            <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                                        </div>
                                    ) : (
                                        <User size={40} className="text-zinc-400" />
                                    )}
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
                                <div className="w-20 h-20 rounded-full bg-zinc-100 mb-3 flex items-center justify-center overflow-hidden relative">
                                    {member.image ? (
                                        <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                                    ) : (
                                        <User size={32} className="text-zinc-300" />
                                    )}
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
