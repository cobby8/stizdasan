"use client";

import Hero from "@/components/Hero";
import About from "@/components/About";
import Location from "@/components/Location";
import FloatingEditButton from "@/components/admin/editor/FloatingEditButton";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AdminDesignPage() {
    return (
        <div className="w-full min-h-screen bg-white relative">
            {/* Visual Editor Overlay / Header could go here */}
            <div className="bg-zinc-900 text-white p-4 text-center sticky top-0 z-[100] shadow-md flex justify-between items-center px-8">
                <h1 className="text-xl font-bold">비주얼 에디터 (Visual Editor)</h1>
                <p className="text-sm text-zinc-400">여기서 수정하는 내용은 실제 홈페이지에 반영됩니다.</p>
            </div>

            {/* We render the components here exactly as they appear on frontend */}
            {/* Visual Editor Isolation Container */}
            <div
                className="relative bg-white shadow-2xl mx-auto my-8 border border-zinc-200"
                style={{
                    maxWidth: '100%',
                    transform: 'translateZ(0)', // Force new stacking context for fixed children
                    contain: 'paint layout', // Isolate layout
                }}
            >
                <Header />
                <Hero />
                <About />
                <Location />
                <Footer />
                <FloatingEditButton />
            </div>
        </div>
    );
}
