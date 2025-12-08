"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
    return (
        <footer id="footer" className="bg-black text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/10 pb-16 mb-12">

                    {/* Brand & Descr */}
                    <div className="max-w-md">
                        <div className="relative w-32 h-10 mb-6">
                            <Image
                                src="/images/stiz_logo_white.png"
                                alt="STIZ"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-zinc-500 mb-8 leading-relaxed">
                            STIZ BASKETBALL CLUB은 아이들의 꿈과 열정을 응원합니다.<br />
                            체계적인 커리큘럼과 전문 코치진이 함께합니다.
                        </p>
                        <div className="flex gap-4">
                            <a href="https://www.instagram.com/stiz_basketball_dasan/" target="_blank" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-steez-orange transition-colors">
                                <Instagram size={20} />
                            </a>
                        </div>
                    </div>

                    {/* Contact Info (Simplified) */}
                    <div className="flex flex-col gap-8">
                        <div>
                            <h3 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">문의하기</h3>
                            <p className="text-xl font-bold flex items-center gap-2 text-steez-orange">
                                <Phone size={24} />
                                070-8824-5712
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm">
                    <p>&copy; 2025 STIZ BASKETBALL CLUB. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
                        <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
