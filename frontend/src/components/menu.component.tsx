import React from "react";
import NavLinkComponent from "@/components/navlink.component";

const MenuComponent = () => {
    return (
        <nav className="bg-white/80 backdrop-blur-lg shadow-lg p-6 flex items-center justify-between text-lg border border-pink-200 rounded-2xl mx-4 mt-4">
            <div className="px-4">
                <NavLinkComponent path="/" className="text-4xl font-extrabold text-pink-600 tracking-wide">
                    Message.ua
                </NavLinkComponent>
            </div>
            <div className="flex space-x-8 px-4">
                <NavLinkComponent path="/auth/login" className="text-gray-700 hover:text-pink-500 transition text-xl">
                    Login
                </NavLinkComponent>
                <NavLinkComponent path="/auth/register" className="bg-pink-500 text-white px-8 py-3 rounded-xl hover:bg-pink-600 transition shadow-lg text-xl">
                    Register
                </NavLinkComponent>
            </div>
        </nav>
    );
};

export default MenuComponent;
