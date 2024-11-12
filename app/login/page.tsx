"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const Login: React.FC = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    name: '',
    username: '',
    password: '',
    role: 'student',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const endpoint = isSignup ? '/auth/signup' : '/auth/login';
    const payload = isSignup ? form : { username: form.username, password: form.password, role: form.role };

    try {
      const response = await axios.post(`http://localhost:8000${endpoint}`, payload, {
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.status === 201 && isSignup) {
        setMessage('Signup successful! Please login.');
        setIsSignup(false);
      } else if (response.status === 200 && !isSignup) {
        sessionStorage.setItem('user', JSON.stringify(response.data));
        location.href = "/home";
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 w-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-black">
          Online Classroom
        </h1>
        <p className="text-center text-gray-700 mb-6">
          {isSignup ? 'Signup to join your classroom' : 'Login to access your classroom'}
        </p>
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-black">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-black">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="role" className="block text-sm font-medium text-black">
              Role
            </label>
            <select
              name="role"
              id="role"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-black"
              value={form.role}
              onChange={handleChange}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {isSignup ? 'Signup' : 'Login'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={() => {
              setIsSignup(!isSignup);
              setMessage('');
            }}
          >
            {isSignup ? 'Login here' : 'Signup here'}
          </button>
        </p>
        {message && (
          <p className="mt-4 text-center text-sm font-medium text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
