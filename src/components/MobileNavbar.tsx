import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const MobileNavbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex lg:hidden z-50">
            <div className="flex justify-between items-center p-5 w-full">
                {/* Logo */}
                <Link href="/">
                    <Image
                        width={200}
                        height={32}
                        src="/images/logo.png"
                        alt="Logo"
                    />
                </Link>
                {/* Menu Button */}
                <button onClick={toggleSidebar} className="text-primary border border-primary rounded p-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16m-7 6h7"
                        />
                    </svg>
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform z-50 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="flex items-center justify-between p-4 border-b">
                    <Link href="/">
                        <Image
                            width={200}
                            height={32}
                            src="/images/logo.png"
                            alt="Logo"
                        />
                    </Link>
                    <button onClick={toggleSidebar} className="text-gray-700">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <ul className="flex flex-col p-4">
                    {["Home", "Services", "About", "Contact"].map((item, index) => (
                        <li key={index} className="py-4 mt-0 border-b border-gray-300">
                            <a
                                href="#"
                                className="font-bold text-secondary hover:text-primary"
                                onClick={toggleSidebar}
                            >
                                {item}
                            </a>
                        </li>
                    ))}
                     <li className="py-4 mt-0 border-b border-gray-300">
                            <a
                                href="/quote"
                                className="font-bold text-primary"
                                onClick={toggleSidebar}
                            >
                                Get A Quote
                            </a>
                        </li>
                </ul>
            </div>
        </div>
    );
};

export default MobileNavbar;