import { Home, Compass, Bell, Mail, FileText, Bookmark, Users, Zap, User, MoreHorizontal, Smile, Link } from 'lucide-react';

import Image from 'next/image';

const NavBar = () => {
    return (
        <div className="h-screen w-64 flex flex-col justify-between py-9 px-4 bg-white shadow-md">
            <div>
                <div className="text-2xl font-bold mb-10">
                    <a href="/" className="flex items-center gap-2 text-gray-800 select-none" draggable="false">
                        <Image src="/images/DesktopNavbar/fullLogo.png" alt="Logo" width={160} height={20} className="ml-6" draggable="false"/>
                    </a>
                </div>
                <nav className="space-y-10 ml-3 select-none">
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Home /> Home
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Compass /> Explore
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Bell /> Notifications
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Mail /> Messages
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <FileText /> AI Assistant
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Bookmark /> Knowledge Forum
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Users /> Communities
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Zap /> My notebook
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <User /> Dashboard
                    </a>
                    <a className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Smile /> More
                    </a>
                </nav>
            </div>
            <div className="flex items-center gap-3 bg-gray-100 rounded-full py-2 px-3 select-none
            " draggable="false">
                <Image
                    className="h-8 w-8 rounded-full object-cover"
                    src="/images/DesktopNavbar/user.png"
                    alt="User profile"
                    width={32}
                    height={32}
                />
                <div className="flex-1">
                    <p className="text-sm font-semibold">Stas Neprokin</p>
                    <p className="text-xs text-gray-400">@sneprokin</p>
                </div>
                <MoreHorizontal className="text-gray-500 cursor-pointer" />
            </div>
        </div>
    );
};

export default NavBar;