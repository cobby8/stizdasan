"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram, Phone, Info } from "lucide-react";
import footerData from "../data/footer.json";
import EditableText from "./admin/editor/EditableText";
import EditableImage from "./admin/editor/EditableImage";
import { useAdminEdit } from "@/context/AdminEditContext";
import { useState, useEffect } from "react";

export default function Footer() {
    const { isEditMode, unsavedChanges, updateField } = useAdminEdit();

    // Get live values for dimensions or fallback to JSON
    const sectionData = unsavedChanges["footer"] as Record<string, unknown> | undefined;
    const width = (sectionData?.logo_width || footerData.logo_width) as number;
    const height = (sectionData?.logo_height || footerData.logo_height) as number;

    const handleDimChange = (field: string, val: string) => {
        updateField("footer", field, parseInt(val));
    };

    return (
        <footer id="footer" className="bg-black text-white pt-20 pb-10">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 border-b border-white/10 pb-16 mb-12">

                    {/* Brand & Descr */}
                    <div className="max-w-md">
                        {/* Logo Area */}
                        <div className="mb-6 relative group">
                            <div
                                className="relative relative-z-10"
                                style={{ width: `${width}px`, height: `${height}px` }}
                            >
                                <EditableImage
                                    section="footer"
                                    field="logo_image"
                                    initialValue={footerData.logo_image}
                                    alt="STIZ"
                                    fill
                                    imageClassName="object-contain object-left"
                                />
                            </div>

                            {/* Size Controls - Only in Edit Mode */}
                            {isEditMode && (
                                <div className="mt-2 p-3 bg-zinc-800 rounded-lg border border-zinc-700 w-64 shadow-xl z-50">
                                    <div className="flex items-center gap-2 mb-2 text-xs font-bold text-zinc-400">
                                        <Info size={12} />
                                        <span>로고 크기 조절</span>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="w-8">가로</span>
                                            <input
                                                type="range"
                                                min="50" max="400"
                                                value={width}
                                                onChange={(e) => handleDimChange("logo_width", e.target.value)}
                                                className="flex-1 accent-steez-orange"
                                            />
                                            <span className="w-8 text-right text-zinc-400">{width}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            <span className="w-8">세로</span>
                                            <input
                                                type="range"
                                                min="20" max="200"
                                                value={height}
                                                onChange={(e) => handleDimChange("logo_height", e.target.value)}
                                                className="flex-1 accent-steez-orange"
                                            />
                                            <span className="w-8 text-right text-zinc-400">{height}</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <p className="text-zinc-500 mb-8 leading-relaxed">
                            <EditableText section="footer" field="description" initialValue={footerData.description} as="span" multiline />
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
                                <EditableText section="footer" field="phone" initialValue={footerData.phone} as="span" />
                            </p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center text-zinc-600 text-sm">
                    <p>
                        <EditableText section="footer" field="copyright" initialValue={footerData.copyright} as="span" />
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
                        <Link href="#" className="hover:text-white transition-colors">이용약관</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
