// components/TopBar.tsx
import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const TopBar: React.FC = () => {
  const router = useRouter();
  const user = typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user') || '{}') : {};

  const handleLogout = () => {
    sessionStorage.removeItem('user');
    router.push('/');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-white shadow">
      <div>Welcome, {user.name || 'User'}</div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Image
            src="/profile-placeholder.png"
            alt="Profile"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span>{user.role === 'teacher' ? 'Teacher' : 'Student'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default TopBar;
