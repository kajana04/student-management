import React, { useState } from 'react';
import { loginUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await loginUser(formData);
            console.log('User logged in:', response.data);

            
            localStorage.setItem('user', JSON.stringify(response.data));

            
            navigate('/user-profile');
        } catch (error) {
            setError('Error logging in. Please try again.');
            console.error('Error logging in:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-300">
            <form onSubmit={handleSubmit} className="p-6 max-w-md w-full bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg text-center space-y-4">
                <h2 className="text-3xl font-semibold text-blue-900 mb-4">Login</h2>
                <input 
                    name="email" 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-white bg-opacity-40 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-700"
                />
                <input 
                    name="password" 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password} 
                    onChange={handleChange} 
                    className="w-full p-3 bg-white bg-opacity-40 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-700"
                />
                <button type="submit" className="w-full p-3 text-white font-semibold bg-blue-800 bg-opacity-80 rounded-lg hover:bg-blue-900 transition-all">
                    Login
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    );
};

export default LoginPage;
