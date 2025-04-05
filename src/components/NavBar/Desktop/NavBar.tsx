import { Home, Compass, Bell, Mail, FileText, Bookmark, Users, Zap, User, MoreHorizontal, Smile } from 'lucide-react';

import Link from 'next/link';

import Image from 'next/image';

const NavBar = () => {
    return (
        <div className="h-screen w-64 flex flex-col justify-between py-9 px-4 bg-white shadow-md">
            <div>
                <div className="text-2xl font-bold mb-10">
                    <Link href="/" className="flex items-center gap-2 text-gray-800 select-none" draggable="false">
                        <Image src="/images/DesktopNavbar/fullLogo.png" alt="Logo" width={160} height={20} className="ml-6" draggable="false"/>
                    </Link>
                </div>
                <nav className="space-y-10 ml-3 select-none">
                    <Link href="/" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Home /> Home
                    </Link>
                    <Link href="/test" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Compass /> Explore
                    </Link>
                    <Link href="/notification" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Bell /> Notifications
                    </Link>
                    <Link href="/Messages" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Mail /> Messages
                    </Link>
                    <Link href="/ai" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <FileText /> AI Assistant
                    </Link>
                    <Link href="/KnowledgeForum" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Bookmark /> Knowledge Forum
                    </Link>
                    <Link href="/community" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Users /> Communities
                    </Link>
                    <Link href="/myNotebook" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                            <Zap /> My notebook
                    </Link>
                    <Link href="/test" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <User /> Dashboard
                    </Link>
                    <Link href="/test" className="flex items-center gap-3 cursor-pointer hover:text-teal-500 transition">
                        <Smile /> More
                    </Link>
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