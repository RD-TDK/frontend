import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    const [userId, setUserId] = useState('');
    const [gender, setGender] = useState('');
    const { login } = useContext(UserContext);
    const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!userId.trim() || !gender) {
            alert('Please enter User ID and select gender');
            return;
        }
        const success = await login({ id: userId.trim(), gender });
        if (success) {
            navigate('/welcome');
        } else {
            alert('Login failed: ID or gender does not match');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            <div className="bg-white w-full max-w-sm p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800">
                    Welcome Back
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    <input
                        type="text"
                        value={userId}
                        onChange={e => setUserId(e.target.value)}
                        placeholder="Enter User ID"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        required
                    />
                    <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <button
                        type="submit"
                        className="w-full py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 text-center">
                    <span className="text-gray-600">Don’t have an account?</span>{' '}
                    <Link to="/register" className="text-purple-600 font-medium hover:underline">
                        Register Now
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
