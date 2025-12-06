"use client";

import { motion } from "framer-motion";

export default function Facility() {
    return (
        <section id="facility" className="py-32 bg-white text-black">
            <div className="container mx-auto px-6">
                <div className="mb-20">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-steez-orange font-bold tracking-widest uppercase mb-4"
                    >
                        Premium Facility
                    </motion.h2>
                    <div className="flex flex-col md:flex-row justify-between items-end gap-8">
                        <motion.h3
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-5xl md:text-7xl font-black italic tracking-tighter"
                        >
                            BUILT FOR<br />PERFORMANCE
                        </motion.h3>
                        <div className="max-w-sm text-right">
                            <p className="text-gray-600 font-medium text-lg">
                                부상은 최소화하고 퍼포먼스는 극대화하는<br />
                                스티즈만의 독보적인 훈련 환경.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 h-[auto] md:h-[700px]">
                    {/* Main Court - Large Item */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="lg:col-span-8 md:row-span-2 relative rounded-[2rem] overflow-hidden group min-h-[400px]"
                    >
                        <div className="absolute inset-0 bg-zinc-200 group-hover:scale-105 transition-transform duration-700 bg-[url('/images/facility-court.jpg')] bg-cover bg-center" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end">
                            <span className="text-steez-orange font-bold uppercase tracking-wider mb-2">Main Court</span>
                            <h4 className="text-3xl md:text-4xl font-bold text-white mb-2">NBA급 프리미엄 마루</h4>
                            <p className="text-gray-300 max-w-lg">선수들의 무릎과 발목 보호를 위해 충격 흡수율이 뛰어난 최고급 단풍나무 마루를 시공했습니다.</p>
                        </div>
                    </motion.div>

                    {/* Sub Item 1 - Lounge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="lg:col-span-4 relative rounded-[2rem] overflow-hidden group min-h-[300px]"
                    >
                        <div className="absolute inset-0 bg-zinc-200 group-hover:scale-105 transition-transform duration-700 bg-[url('/images/facility-lounge.jpg')] bg-cover bg-center" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                            <h4 className="text-2xl font-bold text-white">Parent Lounge</h4>
                            <p className="text-gray-300 text-sm mt-1">학부모님들을 위한 쾌적한 대기 공간</p>
                        </div>
                    </motion.div>

                    {/* Sub Item 2 - Locker */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="lg:col-span-4 relative rounded-[2rem] overflow-hidden group min-h-[300px]"
                    >
                        <div className="absolute inset-0 bg-zinc-200 group-hover:scale-105 transition-transform duration-700 bg-[url('/images/facility-locker.jpg')] bg-cover bg-center" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-8 flex flex-col justify-end">
                            <h4 className="text-2xl font-bold text-white">Private Locker</h4>
                            <p className="text-gray-300 text-sm mt-1">개인 물품 보관을 위한 넉넉한 락커룸</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
