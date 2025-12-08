"use client";

import { useAdminEdit } from "@/context/AdminEditContext";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Upload } from "lucide-react";

interface EditableImageProps {
    section: string;
    field: string;
    initialValue: string;
    alt: string;
    className?: string; // Container class
    imageClassName?: string; // Image class
    fill?: boolean;
    width?: number;
    height?: number;
    priority?: boolean;
}

export default function EditableImage({
    section,
    field,
    initialValue,
    alt,
    className = "",
    imageClassName = "",
    fill = false,
    width,
    height,
    priority = false
}: EditableImageProps) {
    const { isEditMode, updateField, unsavedChanges } = useAdminEdit();
    const [preview, setPreview] = useState(initialValue);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sectionData = unsavedChanges[section] as Record<string, unknown> | undefined;
    const contextValue = sectionData?.[field];

    useEffect(() => {
        if (contextValue !== undefined && contextValue !== preview) {
            setPreview(contextValue as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextValue]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Create local preview
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);

        // Upload instantly (or handle differently)
        // For this implementation, we'll assume we upload to a temp path or base64 
        // ideally we upload to /api/upload and get a path back.
        // For simplicity, let's mock the upload by just using the object URL for preview 
        // and we would need a real upload handler.
        // **REALISTIC APPROACH**: We need to upload to server.

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData
            });
            const data = await res.json();
            if (data.url) {
                setPreview(data.url);
                updateField(section, field, data.url);
            }
        } catch (err) {
            console.error("Upload failed", err);
            alert("이미지 업로드 실패");
        }
    };

    return (
        <div className={`relative group ${className}`}>
            {isEditMode && (
                <div className="absolute inset-0 z-50 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer border-2 border-steez-orange border-dashed rounded-lg"
                    onClick={() => fileInputRef.current?.click()}>
                    <div className="bg-white text-black px-4 py-2 rounded-full font-bold flex items-center gap-2 shadow-lg">
                        <Upload size={16} />
                        <span>이미지 변경</span>
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </div>
            )}

            {(fill) ? (
                <Image
                    src={preview}
                    alt={alt}
                    fill
                    className={imageClassName}
                    priority={priority}
                />
            ) : (
                <Image
                    src={preview}
                    alt={alt}
                    width={width}
                    height={height}
                    className={imageClassName}
                    priority={priority}
                />
            )}
        </div>
    );
}
