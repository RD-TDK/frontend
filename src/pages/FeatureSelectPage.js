// src/pages/FeatureSelectPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function FeatureSelectPage() {
    const navigate = useNavigate();
    
    const features = [
        {
            key: 'asymmetries',
            label: 'Asymmetries',
            description: 'Learn to detect facial and body asymmetries in AI-generated images',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'from-pink-500 to-rose-500',
            hoverColor: 'from-pink-600 to-rose-600',
            bgColor: 'bg-pink-50',
            borderColor: 'border-pink-200',
            textColor: 'text-pink-700',
            examples: ['Uneven eyes', 'Misaligned features', 'Asymmetric ears']
        },
        {
            key: 'background',
            label: 'Background',
            description: 'Identify unrealistic backgrounds and perspective issues',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            color: 'from-yellow-500 to-orange-500',
            hoverColor: 'from-yellow-600 to-orange-600',
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            textColor: 'text-yellow-700',
            examples: ['Blurry elements', 'Floating objects', 'Impossible perspectives']
        },
        {
            key: 'hair',
            label: 'Hair & Texture',
            description: 'Spot artificial hair patterns and texture inconsistencies',
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                </svg>
            ),
            color: 'from-blue-500 to-indigo-500',
            hoverColor: 'from-blue-600 to-indigo-600',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            textColor: 'text-blue-700',
            examples: ['Unnaturally smooth', 'Uniform patterns', 'Artificial textures']
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            {/* Header */}
            <div className="relative z-10 pt-8 pb-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800">Feature Training</h1>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-8">
                <div className="max-w-6xl w-full">
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                            </svg>
                        </div>
                        <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                            Choose Your Focus Area
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Select a specific AI detection feature to train on. Each area focuses on different aspects of AI-generated image recognition.
                        </p>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {features.map((feature, index) => (
                            <div
                                key={feature.key}
                                onClick={() => navigate(`/feature-training/${feature.key}`)}
                                className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 transform hover:scale-105 cursor-pointer"
                            >
                                {/* Feature Icon */}
                                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                    {feature.icon}
                                </div>

                                {/* Feature Content */}
                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-800 group-hover:text-gray-900 transition-colors duration-200">
                                        {feature.label}
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200 leading-relaxed">
                                        {feature.description}
                                    </p>

                                    {/* Examples */}
                                    <div className="space-y-2">
                                        <h4 className={`text-sm font-semibold ${feature.textColor}`}>
                                            Examples to look for:
                                        </h4>
                                        <ul className="space-y-1">
                                            {feature.examples.map((example, idx) => (
                                                <li key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${feature.bgColor} ${feature.borderColor} border`}></div>
                                                    <span>{example}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Action Button */}
                                    <div className="pt-4">
                                        <div className={`inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r ${feature.color} text-white rounded-lg font-semibold group-hover:${feature.hoverColor} transition-all duration-300`}>
                                            <span>Start Training</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover effect overlay */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${feature.hoverColor} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                            </div>
                        ))}
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                            <span className="text-sm text-gray-600">Choose a feature to begin specialized training</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
