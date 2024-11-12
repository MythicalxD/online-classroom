// components/Sidenav.tsx (updated)
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidenav: React.FC = () => {
    const router = useRouter();
    const isActive = (pathname: string) => router.pathname === pathname;

    return (
        <div className="w-64 bg-white shadow-md">
            <div className="p-4 text-xl font-bold border-b">Online Classroom</div>
            <nav className="p-4">
                <ul>
                    <li className={`mb-2 ${isActive('/home') ? 'text-blue-500' : 'text-gray-700'}`}>
                        <Link href="/home">Dashboard</Link>
                    </li>
                    <li className={`mb-2 ${isActive('/join') ? 'text-blue-500' : 'text-gray-700'}`}>
                        <Link href="/join">Join Classroom</Link>
                    </li>
                    <li className={`mb-2 ${isActive('/live') ? 'text-blue-500' : 'text-gray-700'}`}>
                        <Link href="/live">Live Feed</Link>
                    </li>
                    <li className={`mb-2 ${isActive('/assignments') ? 'text-blue-500' : 'text-gray-700'}`}>
                        <Link href="/assignments">Assignments</Link>
                    </li>
                    <li className={`mb-2 ${isActive('/profile') ? 'text-blue-500' : 'text-gray-700'}`}>
                        <Link href="/profile">Profile</Link>
                    </li>
                    {/* Add more items as needed */}
                </ul>
            </nav>
        </div>
    );
};

export default Sidenav;
