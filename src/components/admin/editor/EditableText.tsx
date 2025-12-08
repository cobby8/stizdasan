"use client";

import { useAdminEdit } from "@/context/AdminEditContext";
import { useEffect, useState } from "react";

interface EditableTextProps {
    section: string;
    field: string;
    initialValue: string;
    multiline?: boolean;
    className?: string; // Class for the display element
    inputClassName?: string; // Class for the input/textarea element
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div"; // Element type
}

export default function EditableText({
    section,
    field,
    initialValue,
    multiline = false,
    className = "",
    inputClassName = "",
    as: Component = "span"
}: EditableTextProps) {
    const { isEditMode, updateField, unsavedChanges } = useAdminEdit();
    const [value, setValue] = useState(initialValue);

    // Sync with unsaved changes context if it exists, otherwise initial
    const sectionData = unsavedChanges[section] as Record<string, unknown> | undefined;
    const contextValue = sectionData?.[field];

    useEffect(() => {
        if (contextValue !== undefined && contextValue !== value) {
            setValue(contextValue as string);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextValue]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        updateField(section, field, newValue);
    };

    if (isEditMode) {
        const commonClasses = `bg-white/90 text-black border-2 border-steez-orange rounded px-2 py-1 outline-none focus:ring-2 focus:ring-steez-orange/50 shadow-lg ${inputClassName}`;

        if (multiline) {
            return (
                <textarea
                    value={value}
                    onChange={handleChange}
                    className={`${commonClasses} w-full min-h-[100px]`}
                />
            );
        }
        return (
            <input
                type="text"
                value={value}
                onChange={handleChange}
                className={`${commonClasses} min-w-[100px] max-w-full`}
                style={{ width: `${Math.max(value.length, 10)}ch` }}
            />
        );
    }

    // View Mode
    return (
        <Component className={className}>
            {value.split('\n').map((line, i) => (
                <span key={i}>
                    {line}
                    {i < value.split('\n').length - 1 && <br />}
                </span>
            ))}
        </Component>
    );
}
