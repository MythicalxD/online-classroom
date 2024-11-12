"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentAssignments: React.FC = () => {
    const [assignments, setAssignments] = useState<any[]>([]);
    const [user, setUser] = useState<{ id: number; role: string } | null>(null);
    const [selectedAssignment, setSelectedAssignment] = useState<number | null>(null);
    const [files, setFiles] = useState<FileList | null>(null);
    const [message, setMessage] = useState<string | null>(null);

    // Fetch user from sessionStorage on component mount
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
            const usr = JSON.parse(storedUser);
            axios
                .get("http://localhost:8000/assignments", {
                    params: { role: usr?.role, userId: usr?.id },
                })
                .then((response) => setAssignments(response.data))
                .catch((error) => console.error(error));
        } else {
            setMessage("No user found. Please log in.");
        }
    }, []);

    // Handle upload document for selected assignment
    const handleUpload = () => {
        if (!files || !selectedAssignment) {
            setMessage("Please select an assignment and upload a file.");
            return;
        }

        const formData = new FormData();
        formData.append("userId", user?.id.toString() || "");
        formData.append("assignmentId", selectedAssignment.toString());
        for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]);
        }

        axios
            .post("http://localhost:8000/assignments/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then(() => {
                setMessage("Document uploaded successfully!");
                setSelectedAssignment(null);
                setFiles(null);
            })
            .catch((error) => {
                console.error("Error uploading file:", error);
                setMessage("Failed to upload document. Please try again.");
            });
    };

    return (
        <div className="p-4 min-h-screen w-screen bg-gray-50">
            <h2 className="text-xl font-semibold mb-4 text-black">Your Assignments</h2>
            {assignments.length > 0 ? (
                <ul>
                    {assignments.map((assignment) => (
                        <li
                            key={assignment.id}
                            className={`mb-2 text-black cursor-pointer ${selectedAssignment === assignment.id ? "border-blue-500" : ""
                                }`}
                            onClick={() => assignment.status !== "graded" && setSelectedAssignment(assignment.id)}
                        >
                            <div className={`p-2 border rounded ${assignment.status == "graded" ? "bg-green-400" : "bg-white"}`}>
                                <h3 className="text-lg font-semibold text-black">{assignment.title}</h3>
                                <p>Status: {assignment.status}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No assignments available.</p>
            )}

            {selectedAssignment && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2 text-black">
                        Upload your Assignment : {selectedAssignment}
                    </h3>
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                        multiple
                        onChange={(e) => setFiles(e.target.files)}
                        className="mb-2 block text-black"
                    />
                    <button
                        onClick={handleUpload}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Upload
                    </button>
                </div>
            )}

            {message && <p className="mt-4 text-green-500">{message}</p>}
        </div>
    );
};

export default StudentAssignments;
