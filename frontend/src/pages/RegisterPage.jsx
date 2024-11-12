import React, { useState } from 'react';
import { registerUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(formData);
            toast.success('Registered successfully!');
            navigate('/login');
        } catch (error) {
            toast.error('Error registering user.');
            console.error('Registration error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-700 to-blue-900">
            <form onSubmit={handleSubmit} className="p-8 max-w-md w-full rounded-lg shadow-lg bg-white/10 backdrop-blur-lg border border-white/20 space-y-6">
                <h2 className="text-2xl font-semibold text-white text-center">Create an Account</h2>
                <input
                    name="name"
                    type="text"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-200/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-200/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-3 rounded-lg bg-gray-200/70 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="w-full p-3 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition ease-in-out duration-300"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterPage;
