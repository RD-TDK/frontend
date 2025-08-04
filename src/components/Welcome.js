// src/components/Welcome.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Welcome = () => {
    const { logout, user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // 检查用户完成状态
    const hasCompletedPretest = user && user.pretestCompleted;
    const hasCompletedTraining = user && user.trainingCompleted;
    const hasCompletedPosttest = user && user.posttestCompleted;

    const menuItems = [
        {
            title: hasCompletedPretest ? "Pretest Completed ✓" : "Do Pretest",
            description: hasCompletedPretest ? "You have completed the pretest" : "Assess your initial AI detection skills",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            color: hasCompletedPretest ? "from-gray-400 to-gray-500" : "from-blue-500 to-blue-600",
            hoverColor: hasCompletedPretest ? "from-gray-400 to-gray-500" : "from-blue-600 to-blue-700",
            link: hasCompletedPretest ? null : "/pre-test",
            disabled: hasCompletedPretest,
            available: true // 总是可用
        },
        {
            title: hasCompletedTraining ? "Training Completed ✓" : "Start Training",
            description: hasCompletedTraining ? "You have completed the training" : "Begin your AI detection training journey",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            color: hasCompletedTraining ? "from-gray-400 to-gray-500" : "from-green-500 to-green-600",
            hoverColor: hasCompletedTraining ? "from-gray-400 to-gray-500" : "from-green-600 to-green-700",
            link: hasCompletedTraining ? null : "/training-intro",
            disabled: hasCompletedTraining,
            available: hasCompletedPretest // 需要完成前测
        },
        {
            title: hasCompletedPosttest ? "Post-Test Completed ✓" : "Verify Results",
            description: hasCompletedPosttest ? "You have completed the post-test" : "Check your training progress and results",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: hasCompletedPosttest ? "from-gray-400 to-gray-500" : "from-purple-500 to-purple-600",
            hoverColor: hasCompletedPosttest ? "from-gray-400 to-gray-500" : "from-purple-600 to-purple-700",
            link: hasCompletedPosttest ? null : "/post-test",
            disabled: hasCompletedPosttest,
            available: hasCompletedTraining // 需要完成训练
        },
        {
            title: "Delayed Test",
            description: "One-week follow-up assessment to measure retention",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "from-orange-500 to-orange-600",
            hoverColor: "from-orange-600 to-orange-700",
            link: "/delayed-test",
            disabled: false,
            available: hasCompletedPosttest // 需要完成后测
        },
        {
            title: "Show My Results",
            description: "View your post-test results and progress analysis",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: "from-indigo-500 to-indigo-600",
            hoverColor: "from-indigo-600 to-indigo-700",
            link: "/results",
            disabled: false,
            available: hasCompletedPosttest // 需要完成后测
        },
        {
            title: "Feature Training",
            description: "Focus on specific AI detection features",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
                </svg>
            ),
            color: "from-pink-500 to-pink-600",
            hoverColor: "from-pink-600 to-pink-700",
            link: "/feature-select",
            disabled: false,
            available: hasCompletedPosttest // 需要完成后测
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '2s'}}></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" style={{animationDelay: '4s'}}></div>
            </div>

            {/* Header */}
            <div className="relative z-10 pt-8 pb-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl font-bold text-gray-800">AI Training Hub</h1>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-white/50 rounded-lg transition-all duration-200"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex-1 flex items-center justify-center px-6 pb-8">
                <div className="max-w-4xl w-full">
                    {/* Welcome Header */}
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                            Welcome to AI Image Detection Training
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Enhance your ability to distinguish between AI-generated and real images through our comprehensive training program.
                        </p>
                    </div>

                                        {/* Menu Grid */}
                    <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {menuItems.map((item, index) => {
                            // 如果项目不可用，显示锁定状态
                            if (!item.available) {
                                return (
                                    <div key={index} className="group relative bg-white/40 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 cursor-not-allowed opacity-50">
                                        <div className="flex items-start space-x-4">
                                            <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-500 rounded-xl flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-400 mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-400">
                                                    {item.description}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-2 font-medium">
                                                    🔒 Complete previous steps to unlock
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            
                            // 如果项目已完成，显示完成状态
                            if (item.disabled) {
                                return (
                                    <div key={index} className="group relative bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 cursor-not-allowed">
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg opacity-60`}>
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-500 mb-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-400">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="opacity-60">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            
                            // 如果项目可用且未完成，显示可点击状态
                            return (
                                <Link key={index} to={item.link}>
                                    <div className="group relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 transform hover:scale-105">
                                        <div className="flex items-start space-x-4">
                                            <div className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300`}>
                                                {item.icon}
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-200">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-200">
                                                    {item.description}
                                                </p>
                                            </div>
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        
                                        {/* Hover effect overlay */}
                                        <div className={`absolute inset-0 bg-gradient-to-r ${item.hoverColor} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center space-x-4 bg-white/50 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${hasCompletedPretest ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className={`text-sm ${hasCompletedPretest ? 'text-green-600 font-medium' : 'text-gray-500'}`}>Pretest</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${hasCompletedTraining ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className={`text-sm ${hasCompletedTraining ? 'text-green-600 font-medium' : 'text-gray-500'}`}>Training</span>
                            </div>
                            <div className="w-8 h-0.5 bg-gray-300"></div>
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 rounded-full ${hasCompletedPosttest ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                <span className={`text-sm ${hasCompletedPosttest ? 'text-green-600 font-medium' : 'text-gray-500'}`}>Post-Test</span>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-3">
                            {hasCompletedPosttest ? 'All main stages completed! You can now access delayed test and feature training.' : 
                             hasCompletedTraining ? 'Training completed! Next: Post-Test' :
                             hasCompletedPretest ? 'Pretest completed! Next: Training' :
                             'Start with the pretest to begin your journey'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Welcome;
