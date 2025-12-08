"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn("credentials", {
            redirect: false,
            username,
            password,
        });

        if (result?.error) {
            setError("Invalid Credentials");
        } else {
            router.push("/admin");
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-xl border border-zinc-100">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black italic text-zinc-900 mb-2">ADMIN LOGIN</h1>
                    <p className="text-zinc-500">Secure Access Area</p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-xl text-center font-bold mb-6 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-steez-orange font-bold"
                            placeholder="admin"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-zinc-600 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-zinc-200 focus:outline-none focus:ring-2 focus:ring-steez-orange font-bold"
                            placeholder="••••••"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-steez-orange text-white font-bold rounded-xl hover:bg-black transition-all shadow-lg shadow-steez-orange/20"
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    );
}
