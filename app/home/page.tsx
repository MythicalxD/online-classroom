"use client";
import React, { useEffect, useState } from 'react';
import Assignments from '@/components/Assignment';
import LiveFeed from '@/components/live';

const Home: React.FC = () => {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        } else {
            location.href = "/";
        }
    }, []);

    if (!user) return null;

    return (
        <div className="flex h-full bg-gray-100 w-screen">
            {/* Side Navigation */}


            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Top Bar */}
                <header className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800">Welcome, {user.name}</h2>
                        <p className="text-sm text-gray-500">{user.role === 'teacher' ? 'Teacher' : 'Student'}</p>
                    </div>
                    <div className="flex items-center">
                        <img
                            src="./profile.jpeg"
                            alt="Profile"
                            className="w-10 h-10 rounded-full mr-4 object-cover"
                        />
                        <button
                            onClick={() => {
                                sessionStorage.clear();
                                location.href = "/";
                            }}
                            className="text-sm bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>
                </header>

                {/* Grid Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Live Feed */}
                    <section className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Live Chat</h3>
                        <LiveFeed user={user} />
                    </section>

                    {/* Assignments */}
                    <section className="bg-white rounded-lg shadow p-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">All Assignments</h3>
                        <Assignments user={user} />
                    </section>

                    {/* Additional Sections */}
                    <section className="bg-white rounded-lg shadow p-4 col-span-2">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Learning Progress</h3>
                        <div className="flex space-x-6">
                            <div className="flex-1 bg-blue-50 p-4 rounded">
                                <h4 className="text-sm font-medium text-gray-700">Completed</h4>
                                <p className="text-2xl font-bold text-blue-600">75%</p>
                            </div>
                            <div className="flex-1 bg-purple-50 p-4 rounded">
                                <h4 className="text-sm font-medium text-gray-700">In Progress</h4>
                                <p className="text-2xl font-bold text-purple-600">40%</p>
                            </div>
                            <div className="flex-1 bg-green-50 p-4 rounded">
                                <h4 className="text-sm font-medium text-gray-700">Pending</h4>
                                <p className="text-2xl font-bold text-green-600">25%</p>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Home;
