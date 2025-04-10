import React, { useState } from 'react';
import { Home, Compass, Bell, Mail, FileText, Bookmark, Users, Zap, User, MoreHorizontal, Smile, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navLinks = [
        { href: "/", icon: <Home />, text: "Home" },
        { href: "/notification", icon: <Bell />, text: "Notifications" },
        { href: "/Messages", icon: <Mail />, text: "Messages" },
        { href: "/ai", icon: <FileText />, text: "AI Assistant" },
        { href: "/KnowledgeForum", icon: <Bookmark />, text: "Knowledge Forum" },
        { href: "/community", icon: <Users />, text: "Communities" },
        { href: "/myNotebook", icon: <Zap />, text: "My notebook" },
        { href: "/dashboard", icon: <User />, text: "Dashboard" },
        { href: "/test", icon: <Smile />, text: "More" }
    ];

    return (
        <>
            {/* Mobile header bar with logo and menu button */}
            <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md flex items-center justify-center md:hidden z-50">
                <button 
                    onClick={toggleMenu} 
                    className="absolute left-4 p-2 focus:outline-none"
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
                
                <Image 
                    src="/images/DesktopNavbar/fullLogo.png" 
                    alt="Logo" 
                    width={120} 
                    height={15} 
                    draggable="false"
                />
            </div>

            {/* Navigation sidebar */}
            <div className={`
                fixed top-0 left-0 
                h-screen w-64 flex flex-col justify-between py-9 px-4 bg-white shadow-md
                transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:h-screen z-40
            `}>
                <div>
                    <div className="text-2xl font-bold mb-10">
                        <Link href="/" className="flex items-center gap-2 text-gray-800 select-none" draggable="false">
                            <Image src="/images/DesktopNavbar/fullLogo.png" alt="Logo" width={160} height={20} className="ml-6" draggable="false"/>
                        </Link>
                    </div>
                    <nav className="space-y-10 ml-3 select-none">
                        {navLinks.map((link, index) => (
                            <Link 
                                key={index} 
                                href={link.href} 
                                className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.icon} {link.text}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="flex items-center gap-3 bg-gray-100 rounded-full py-2 px-3 select-none" draggable="false">
                    <Image
                        className="h-8 w-8 rounded-full object-cover"
                        src="/images/profiles/story/profile.jpg"
                        alt="User profile"
                        width={32}
                        height={32}
                    />
                    <div className="flex-1">
                        <Link  key={999999} 
                                href={"/profile"} 
                                className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition"
                                onClick={() => setIsOpen(false)}>
                        <p className="text-sm font-semibold">Stas Neprokin</p>
                        <p className="text-xs text-gray-400">@sneprokin</p> 
                        </Link>
                    </div>
                    <MoreHorizontal className="text-gray-500 cursor-pointer" />
                </div>
            </div>

            {/* Semi-transparent overlay behind the sidebar on mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-10 z-30 md:hidden"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}
        </>
    );
};

export default NavBar;