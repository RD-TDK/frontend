// src/components/ResultSummary.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ResultSummary = ({ total, accuracy }) => {
    const navigate = useNavigate();

    // 圆环进度条参数
    const radius = 60;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset =
        circumference - (accuracy / 100) * circumference;

    return (
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center max-w-lg w-full border border-white/30 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
            <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"></div>
            <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
            
            <div className="relative z-10">
                {/* Success Icon */}
                <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>

                <h2 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Test Completed!
                </h2>

                {/* Enhanced Circular Progress */}
                <div className="relative inline-block mb-8">
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90 drop-shadow-lg"
                    >
                        <circle
                            stroke="#e5e7eb"
                            fill="transparent"
                            strokeWidth={stroke}
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                        />
                        <circle
                            stroke="url(#gradient)"
                            fill="transparent"
                            strokeWidth={stroke}
                            strokeLinecap="round"
                            r={normalizedRadius}
                            cx={radius}
                            cy={radius}
                            style={{
                                strokeDasharray: circumference,
                                strokeDashoffset,
                                transition: 'stroke-dashoffset 0.5s ease-out',
                            }}
                        />
                        <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="#3b82f6" />
                                <stop offset="100%" stopColor="#8b5cf6" />
                            </linearGradient>
                        </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {accuracy}%
                            </span>
                            <div className="text-sm text-gray-500">Accuracy</div>
                        </div>
                    </div>
                </div>

                {/* Enhanced Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                        <div className="text-2xl font-bold text-blue-600">{total}</div>
                        <div className="text-sm text-blue-600">Questions</div>
                    </div>
                    <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                        <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                        <div className="text-sm text-green-600">Success Rate</div>
                    </div>
                </div>

                {/* Enhanced Button */}
                <button
                    onClick={() => navigate('/welcome')}
                    className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                    <div className="flex items-center justify-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Back to Home</span>
                    </div>
                </button>
            </div>
        </div>
    );
};

export default ResultSummary;
