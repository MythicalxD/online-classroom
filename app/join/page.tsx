"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

interface Classroom {
  id: number;
  name: string;
  code?: string; // Classroom code for teachers
  createdByName?: string; // Teacher's name for students
}

const ClassroomManagement: React.FC = () => {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [classroomName, setClassroomName] = useState("");
  const [classroomCode, setClassroomCode] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [user, setUser] = useState<{ id: number; role: string } | null>(null);

  // Fetch user from sessionStorage on component mount
  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setMessage("No user found. Please log in.");
    }
  }, []);

  // Fetch classrooms based on user role
  useEffect(() => {
    if (!user) return;

    const route =
      user.role === "teacher"
        ? "http://localhost:8000/classrooms/teacher"
        : "http://localhost:8000/classrooms/student";

    axios
      .get(route, { params: { createdBy: user.id } })
      .then((response) => setClassrooms(response.data))
      .catch((error) => {
        console.error("Error fetching classrooms:", error.response?.data?.message || error.message);
        setMessage("Failed to fetch classrooms.");
      });
  }, [user]);

  // Handle join classroom for students
  const handleJoinClassroom = () => {
    if (!classroomCode.trim()) {
      setMessage("Classroom code is required.");
      return;
    }

    axios
      .post("http://localhost:8000/classrooms/join", {
        userId: user?.id,
        classroomCode,
      })
      .then((response) => {
        setMessage(response.data.message);
        setClassroomCode("");
        setClassrooms((prev) => [...prev, { id: Date.now(), name: "New Classroom" }]); // Simulated refresh
      })
      .catch((error) => {
        console.error("Error joining classroom:", error);
        setMessage(
          error.response?.data?.message || "An error occurred while joining the classroom."
        );
      });
  };

  // Handle create classroom for teachers
  const handleCreateClassroom = () => {
    if (!classroomName.trim()) {
      setMessage("Classroom name is required.");
      return;
    }

    axios
      .post("http://localhost:8000/classrooms/create", {
        name: classroomName,
        createdBy: user?.id,
      })
      .then((response) => {
        setMessage("Classroom created successfully!");
        setClassrooms((prev) => [...prev, response.data]);
        setClassroomName("");
      })
      .catch((error) => {
        console.error("Error creating classroom:", error);
        setMessage(
          error.response?.data?.message || "An error occurred while creating the classroom."
        );
      });
  };

  if (!user) {
    return (
      <div className="p-4 h-screen bg-gray-50 w-screen">
        <h2 className="text-xl font-semibold mb-4 text-red-500">
          Please log in to manage classrooms.
        </h2>
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen bg-gray-50 w-screen">
      <h2 className="text-xl font-semibold mb-4 text-black">
        {user.role === "teacher" ? "Manage Your Classrooms" : "Join a Classroom"}
      </h2>

      {/* Teacher View */}
      {user.role === "teacher" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Classroom Name"
              value={classroomName}
              onChange={(e) => setClassroomName(e.target.value)}
              className="mb-2 p-2 border rounded w-full text-black"
            />
            <button
              onClick={handleCreateClassroom}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Create Classroom
            </button>
          </div>

          {classrooms.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">Your Classrooms</h3>
              <ul className="space-y-2">
                {classrooms.map((classroom) => (
                  <li key={classroom.id} className="p-3 bg-white rounded shadow">
                    <p className="font-semibold text-black">{classroom.name}</p>
                    <p className="text-black" >Classroom Code: <span className="text-blue-500">{classroom.code}</span></p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* Student View */}
      {user.role === "student" && (
        <>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Classroom Code"
              value={classroomCode}
              onChange={(e) => setClassroomCode(e.target.value)}
              className="mb-2 p-2 border rounded w-full"
            />
            <button
              onClick={handleJoinClassroom}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Join Classroom
            </button>
          </div>

          {classrooms.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-black">Joined Classrooms</h3>
              <ul className="space-y-2">
                {classrooms.map((classroom) => (
                  <li key={classroom.id} className="p-3 bg-white rounded shadow">
                    <p className="font-semibold text-black">{classroom.name}</p>
                    <p className="text-black" >
                      Joined By: <span className="text-blue-500">{classroom.code}</span>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {message && <p className="mt-4 text-green-500">{message}</p>}
    </div>
  );
};

export default ClassroomManagement;
