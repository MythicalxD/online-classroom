"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAssignments: React.FC<{ user: { id: number } }> = ({ user }) => {
    const [assignments, setAssignments] = useState<any[]>([]);

    useEffect(() => {
        axios
            .get("http://localhost:8000/classrooms/assignments", {
                params: { userId: user.id },
            })
            .then((response) => setAssignments(response.data))
            .catch((error) => console.error(error));
    }, [user]);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Your Assignments</h2>
            {assignments.length > 0 ? (
                <ul>
                    {assignments.map((assignment) => (
                        <li key={assignment.id} className="mb-2">
                            <div className="p-2 border rounded">
                                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                                <p>Status: {assignment.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No assignments available.</p>
            )}
        </div>
    );
};

export default StudentAssignments;
