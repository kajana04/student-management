import React, { useEffect, useState } from 'react';
import { updateUser } from '../api/userApi';
import { useNavigate } from 'react-router-dom';

const UserProfilePage = () => {
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setFormData({
                name: parsedUser.name,
                email: parsedUser.email,
                password: '',
            });
        }
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUserData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
        };

        try {
            const response = await updateUser(user._id, updatedUserData);
            localStorage.setItem('user', JSON.stringify(response.data));
            setUser(response.data);
            setIsEditing(false);
        } catch (error) {
            setError('Error updating profile. Please try again.');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-gray-800">No user found. Please log in.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-300">
            <div className="w-full max-w-md bg-white bg-opacity-20 backdrop-blur-md rounded-lg shadow-lg p-6">
                <h2 className="text-3xl font-semibold text-blue-900 mb-4 text-center">
                    {isEditing ? 'Edit Profile' : 'User Profile'}
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                
                <div className="space-y-4">
                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="name" className="block">Name</label>
                                <input
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-white bg-opacity-40 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-700"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-white bg-opacity-40 border border-blue-200 rounded-lg focus:outline-none focus:border-blue-500 placeholder-blue-700"
                                />
                            </div>
              
                            <div className="mt-4 text-center">
                                <button
                                    type="submit"
                                    className="w-full p-3 text-white font-semibold bg-blue-800 bg-opacity-80 rounded-lg hover:bg-blue-900 transition-all"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {user.name}</p>
                            <p><strong>Email:</strong> {user.email}</p>
                            <div className="mt-4 text-center">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="w-full p-3 text-white font-semibold bg-blue-800 bg-opacity-80 rounded-lg hover:bg-blue-900 transition-all"
                                >
                                    Edit Profile
                                </button>
                            </div>
                        </div>
                    )}
                </div>
                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            localStorage.removeItem('user');
                            window.location.href = '/login';
                        }}
                        className="w-full p-3 text-white font-semibold bg-blue-800 bg-opacity-80 rounded-lg hover:bg-blue-900 transition-all"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserProfilePage;
