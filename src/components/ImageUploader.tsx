"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, ImageIcon, Loader2 } from "lucide-react";

interface ImageUploaderProps {
    currentImage?: string;
    onUpload: (url: string) => void;
    label?: string;
}

export default function ImageUploader({ currentImage, onUpload, label = "Image" }: ImageUploaderProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/admin/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            if (data.success) {
                onUpload(data.url);
            }
        } catch (error) {
            alert("Image upload failed");
            console.error(error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <span className="block text-xs font-bold text-zinc-400 uppercase">{label}</span>
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden relative border border-zinc-200 flex items-center justify-center group">
                    {currentImage ? (
                        <Image
                            src={currentImage}
                            alt="Preview"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <ImageIcon className="text-zinc-300" />
                    )}

                    {isUploading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-white">
                            <Loader2 className="animate-spin" size={20} />
                        </div>
                    )}
                </div>

                <div className="flex-1">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        className="hidden"
                    />
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="flex items-center gap-2 px-4 py-2 bg-white border border-zinc-200 rounded-lg text-sm font-bold text-zinc-700 hover:bg-zinc-50 transition-colors"
                    >
                        <Upload size={16} />
                        {currentImage ? "Change Image" : "Upload Image"}
                    </button>
                    <p className="text-xs text-zinc-400 mt-2">
                        Supported: JPG, PNG, WEBP (Max 5MB)
                    </p>
                </div>
            </div>
        </div>
    );
}
