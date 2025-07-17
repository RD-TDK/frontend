// src/pages/FeatureSelectPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeatureSelectPage() {
    const navigate = useNavigate();
    const features = [
        { key: 'asymmetries', label: 'Asymmetries', color: 'pink' },
        { key: 'background',  label: 'Background',   color: 'yellow' },
        { key: 'hair',        label: 'Hair',         color: 'blue' },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-blue-200 to-green-200">
            <div className="bg-white bg-opacity-60 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-xl text-center">
                <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
                    Feature Training
                </h1>
                <p className="text-gray-600 mb-8">
                    Pick a feature you want to focus on
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {features.map(({ key, label, color }) => (
                        <button
                            key={key}
                            onClick={() => navigate(`/feature-training/${key}`)}
                            className={`
                px-4 py-3 rounded-xl font-semibold text-white
                bg-${color}-500 hover:bg-${color}-600
                transform hover:scale-105 transition
                shadow-lg
              `}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
