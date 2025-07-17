// src/components/Welcome.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Welcome = () => {
    const { logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-200 p-6">
            <div className="relative bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center">
                {/* 登出按钮 */}
                <button
                    onClick={handleLogout}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition"
                >
                    Logout
                </button>

                <h1 className="text-4xl font-extrabold mb-8 text-gray-800">
                    Welcome to AI Image Detection Training
                </h1>

                <div className="flex flex-col space-y-4">
                    <Link to="/pre-test">
                        <button className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl transform hover:scale-105 transition duration-300">
                            Do pretest
                        </button>
                    </Link>
                    <Link to="/training-test">
                        <button className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-xl transform hover:scale-105 transition duration-300">
                            Start training
                        </button>
                    </Link>
                    <Link to="/post-test">
                        <button className="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-xl transform hover:scale-105 transition duration-300">
                            Verify results
                        </button>
                    </Link>
                    <Link to="/feature-select">
                        <button className="w-full px-6 py-3 bg-pink-500 text-white font-semibold rounded-xl transform hover:scale-105 transition duration-300">
                            Feature Training
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
