"use client";
import LiveFeed from '@/components/LiveFeed';
import React from 'react';


const Live: React.FC = () => {
    // Assume classroomId is obtained from context or props
    const classroomId = 'classroom1'; // Replace with dynamic ID

    return (
        <div className="p-4">
            <LiveFeed classroomId={classroomId} />
        </div>
    );
};

export default Live;
