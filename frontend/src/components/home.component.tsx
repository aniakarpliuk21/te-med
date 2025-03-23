import React from "react";
import MenuComponent from "@/components/menu.component";
import MainPage from "@/components/main.component";

const HomeComponent = () => {
    return (
        <div className="flex flex-col h-screen bg-gray-100">
            <MenuComponent />
            <div className="flex-1 overflow-hidden">
                <MainPage />
            </div>
        </div>
    );
};

export default HomeComponent;
