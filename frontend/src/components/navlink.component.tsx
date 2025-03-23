"use client";

import { usePathname } from "next/navigation";
import React, { FC, ReactNode } from "react";
import Link from "next/link";

type NavLinkComponentProps = {
    children: ReactNode;
    path: string;
    className?: string;
};

const NavLinkComponent: FC<NavLinkComponentProps> = ({ path, children, className = "" }) => {
    const pathname = usePathname();
    const isActive = pathname === path;

    return (
        <Link
            href={path}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isActive ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-700 hover:text-blue-500"
            } ${className}`}
        >
            {children}
        </Link>
    );
};

export default NavLinkComponent;
