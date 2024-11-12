// components/Layout.tsx
import React from 'react';
import Sidenav from './sidenav';
import TopBar from './TopBar';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidenav />
      <div className="flex flex-col flex-1">
        <TopBar />
        <main className="flex-1 p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
