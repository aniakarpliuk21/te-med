import React from "react";
import LoginComponent from "@/components/login.component";
import MenuComponent from "@/components/menu.component";

const LoginPage = () => {
    return (
        <div className="min-h-screen bg-pink-50 flex flex-col items-center">
            <MenuComponent />
            <div className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 border border-gray-300 mt-10">
                <h2 className="text-2xl font-semibold text-pink-600 text-center mb-4">
                    Welcome Back
                </h2>
                <LoginComponent />
            </div>
        </div>
    );
};

export default LoginPage;
