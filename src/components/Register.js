// src/components/Register.js
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [userId, setUserId] = useState('');
    const [gender, setGender] = useState('');
    const { register } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!userId.trim() || !gender) {
            alert('Please enter User ID and select gender');
            return;
        }
        // 等待后端返回 true/false
        const success = await register({ id: userId.trim(), gender });
        if (success) {
            navigate('/welcome');
        } else {
            alert('Registration failed: ID may already exist or network error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
            <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
                    Create an Account
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        required
                    />
                    <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full py-3 bg-pink-600 text-white font-semibold rounded-lg hover:bg-pink-700 transition"
                    >
                        Register
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Already have an account?</span>{' '}
                    <Link to="/login" className="text-pink-600 font-medium hover:underline">
                        Log In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
