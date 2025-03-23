"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { authService } from "@/services/auth.service";

const LoginForm = () => {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const { tokens } = await authService.login({ email, password });
            localStorage.setItem("access_token", tokens.accessToken);
            localStorage.setItem("refresh_token", tokens.refreshToken);
            router.push("/");
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unknown error occurred.");
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 via-purple-500 to-blue-600">
            <form
                onSubmit={handleLogin}
                className="flex flex-col gap-6 bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-xl w-[420px] border border-white/20"
            >
                <h2 className="text-3xl font-bold text-center text-white">Sign in</h2>
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 text-white placeholder-white/70 border-none p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 text-white placeholder-white/70 border-none p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white"
                    required
                />
                <button
                    type="submit"
                    className="bg-white text-pink-600 p-4 rounded-lg text-xl font-semibold hover:bg-pink-100 transition duration-300"
                >
                    Sign in
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
