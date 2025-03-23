"use client";
import React, { useState } from "react";
import {authService} from "@/services/auth.service";


const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const userData = { email, password, username };
            await authService.register(userData);
        } catch (err: unknown) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-50 to-pink-100">
            <form onSubmit={handleRegister} className="flex flex-col gap-6 bg-white p-12 rounded-3xl shadow-2xl w-[32rem] border border-pink-200">
                <h2 className="text-4xl font-extrabold text-center text-pink-600">Create an Account</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="border border-gray-300 p-4 text-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 transition shadow-sm"
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 p-4 text-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 transition shadow-sm"
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border border-gray-300 p-4 text-lg rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-400 transition shadow-sm"
                    required
                />
                <button type="submit" className="bg-pink-500 text-white py-4 rounded-xl text-xl font-semibold hover:bg-pink-600 transition duration-300 shadow-md">
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;
