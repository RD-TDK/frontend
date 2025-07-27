import React from 'react';

const StaticFeedback = ({ isVisible, isCorrect, feedbackText, explanationImage, onReset }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 text-center max-w-2xl w-full border border-white/30 relative overflow-hidden max-h-[85vh] overflow-y-auto">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>
                
                <div className="relative z-10">
                    {/* Icon and Status */}
                    <div className="mb-4">
                        <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center shadow-lg ${
                            isCorrect 
                                ? 'bg-gradient-to-r from-green-400 to-emerald-500 animate-pulse' 
                                : 'bg-gradient-to-r from-red-400 to-pink-500 animate-pulse'
                        }`}>
                            {isCorrect ? (
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                        </div>
                        
                        <h3 className={`text-2xl font-bold mb-1 ${
                            isCorrect 
                                ? 'bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent' 
                                : 'bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent'
                        }`}>
                            {isCorrect ? 'Excellent!' : 'Oops!'}
                        </h3>
                        
                        <p className={`text-sm font-medium ${
                            isCorrect ? 'text-green-600' : 'text-red-600'
                        }`}>
                            {isCorrect ? 'You got it right!' : 'That was AI-generated'}
                        </p>
                    </div>

                    {/* Feedback Text */}
                    <div className="mb-4">
                        <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200">
                            <p className="text-gray-700 leading-relaxed text-base">{feedbackText}</p>
                        </div>
                    </div>

                    {/* Explanation Image */}
                    {explanationImage && (
                        <div className="mb-4">
                            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3 border border-gray-200">
                                <div className="relative">
                                    <img 
                                        src={explanationImage} 
                                        alt="Explanation" 
                                        className="w-full max-h-96 object-contain rounded-lg shadow-md" 
                                    />
                                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                                        AI Features
                                    </div>
                                </div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2 font-medium">
                                🔍 Red boxes highlight AI-generated features
                            </p>
                        </div>
                    )}

                    {/* Action Button */}
                    <div className="flex justify-center">
                        <button 
                            onClick={onReset} 
                            className={`px-6 py-3 rounded-xl font-bold text-white text-base shadow-lg transform transition-all duration-300 hover:scale-105 ${
                                isCorrect 
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600' 
                                    : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
                            }`}
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                                <span>Continue</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StaticFeedback;