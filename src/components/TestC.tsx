"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function TestC() {
    return (
        <div className="p-10">
            <h1>Test Component</h1>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                Framer Motion Hello
            </motion.div>
            <div className="relative w-20 h-20 bg-gray-200">
                <Image src="/images/stiz_logo.png" alt="Test" fill className="object-contain" />
            </div>
        </div>
    );
}
