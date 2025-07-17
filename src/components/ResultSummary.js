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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-white to-gray-100 p-4">
            <div className="bg-white rounded-3xl shadow-2xl p-8 text-center max-w-sm w-full">
                <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
                    Test Completed!
                </h2>

                {/* 圆环进度条 */}
                <div className="relative inline-block mb-6">
                    <svg
                        height={radius * 2}
                        width={radius * 2}
                        className="transform -rotate-90"
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
                            stroke="#3b82f6"
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
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-semibold text-gray-800">
              {accuracy}%
            </span>
                    </div>
                </div>

                {/* 文本结果 */}
                <p className="text-lg text-gray-600 mb-2">
                    Total Questions: <span className="font-medium text-gray-800">{total}</span>
                </p>
                <p className="text-lg text-gray-600 mb-6">
                    Accuracy Rate: <span className="font-medium text-gray-800">{accuracy}%</span>
                </p>

                {/* 操作按钮 */}
                <button
                    onClick={() => navigate('/welcome')}
                    className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ResultSummary;
