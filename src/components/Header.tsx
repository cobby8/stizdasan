"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
    { name: "소개", href: "#about" },
    { name: "교육과정", href: "#curriculum" },
    { name: "일정표", href: "#schedule" },
    { name: "수강신청", href: "#registration" },
    { name: "오시는 길", href: "#location" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 backdrop-blur-md py-4 shadow-sm" : "bg-transparent py-6"
                }`}
        >
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-64 h-20 md:w-80 md:h-24">
                        <Image
                            src="/images/stiz_logo_final.png"
                            alt="STIZ Basketball Club"
                            fill
                            className="object-contain object-left"
                        />
                    </div>
                </Link>

                <button
                    className={`md:hidden transition-colors text-black`}
                    onClick={() => setIsOpen(true)}
                >
                    <Menu size={28} />
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "tween", duration: 0.3 }}
                        className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-8 md:hidden text-black"
                    >
                        <button
                            className="absolute top-6 right-6 text-black"
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={32} />
                        </button>

                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-2xl font-bold uppercase tracking-wider hover:text-steez-orange transition-colors"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
