"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Assignment {
    id: number;
    title: string;
    status: string;
}

interface AssignmentsProps {
    user: { id: number; role: string };
}

const Assignments: React.FC<AssignmentsProps> = ({ user }) => {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [title, setTitle] = useState<string>('');
    const [status, setStatus] = useState<string>('pending');
    const [classroomId, setClassroomId] = useState<number | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    useEffect(() => {
        // Fetch assignments from backend
        axios
            .get('http://localhost:8000/assignments', {
                params: { role: user.role, userId: user.id },
            })
            .then((response) => setAssignments(response.data))
            .catch((error) => console.error(error));
    }, [user]);

    const handleCreateAssignment = () => {
        if (!title || !classroomId) {
            alert('Please fill in all fields.');
            return;
        }

        const data = {
            title,
            status,
            classroomId,
            createdBy: user.id,
        };

        axios
            .post('http://localhost:8000/assignments/create', data)
            .then((response) => {
                setSuccessMessage('Assignment created successfully!');
                setTitle('');
                setClassroomId(null);
                setStatus('pending');
                setAssignments((prev) => [...prev, response.data]);
            })
            .catch((error) => console.error("Error creating assignment:", error));
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">

            {/* List of Assignments */}
            {assignments.length > 0 ? (
                <ul className="mb-4">
                    {assignments.map((assignment) => (
                        <li
                            key={assignment.id}
                            className="cursor-pointer mb-1 text-blue-600 hover:underline"
                        >
                            {assignment.title} - {assignment.status}
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500">No assignments available.</p>
            )}

            {/* Teacher Assignment Creation */}
            {user.role === 'teacher' && (
                <div className="mt-6">
                    <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Create New Assignment
                    </h4>
                    <input
                        type="text"
                        placeholder="Assignment Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mb-2 w-full p-2 border rounded text-black"
                    />
                    <input
                        type="number"
                        placeholder="Classroom ID"
                        value={classroomId || ''}
                        onChange={(e) => setClassroomId(parseInt(e.target.value))}
                        className="mb-2 w-full p-2 border rounded text-black"
                    />
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="mb-2 w-full p-2 border rounded text-black"
                    >
                        <option value="unmarked">Unmarked</option>
                        <option value="graded">Graded</option>
                    </select>
                    <button
                        onClick={handleCreateAssignment}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Create Assignment
                    </button>
                    {successMessage && (
                        <p className="text-green-500 mt-2">{successMessage}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Assignments;
