import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrainingIntroPage = () => {
    const navigate = useNavigate();
    const [currentFeature, setCurrentFeature] = useState(0);

    const features = [
        {
            name: 'Asymmetries',
            description: 'AI-generated images often have asymmetrical features, especially in faces. Look for uneven eyes, different-sized ears, or misaligned facial features.',
            examples: [
                '/images/preIntro/asy_ex_01.png',
                '/images/preIntro/asy_ex_02.png',
                '/images/preIntro/asy_ex_03.png'
            ],
            tips: [
                'Check if both eyes are the same size and shape',
                'Look for uneven facial features',
                'Notice if ear rings are positioned differently'
            ]
        },
        {
            name: 'Background Issues',
            description: 'AI often struggles with complex backgrounds. Look for blurry areas, unrealistic objects, or impossible perspectives.',
            examples: [
                '/images/preIntro/bac_ex_01.png',
                '/images/preIntro/bac_ex_02.png',
                '/images/preIntro/bac_ex_03.png'
            ],
            tips: [
                'Check for blurry or unrealistic background elements',
                'Look for objects that appear unnatural or distorted.',
                'Notice if the perspective doesn\'t make sense'
            ]
        },
        {
            name: 'Hair and Texture',
            description: 'AI has difficulty with fine details like hair strands and textures. Look for overly smooth or unrealistic hair patterns.',
            examples: [
                '/images/preIntro/hair_ex_01.png',
                '/images/preIntro/hair_ex_02.png',
                '/images/preIntro/hair_ex_03.png'
            ],
            tips: [
                'Look for unnaturally smooth hair',
                'Check if hair strands look too uniform',
                'Notice if textures seem artificial'
            ]
        }
    ];

    const handleNext = () => {
        if (currentFeature < features.length - 1) {
            setCurrentFeature(currentFeature + 1);
        }
    };

    const handlePrevious = () => {
        if (currentFeature > 0) {
            setCurrentFeature(currentFeature - 1);
        }
    };

    const handleStartTraining = () => {
        navigate('/training-test');
    };

    const currentFeatureData = features[currentFeature];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <h1 className="text-2xl font-bold text-gray-800">AI Image Detection Training</h1>
                    <div className="flex items-center mt-2">
                        <div className="flex space-x-2">
                            {features.map((_, index) => (
                                <div
                                    key={index}
                                    className={`w-3 h-3 rounded-full ${
                                        index === currentFeature ? 'bg-purple-600' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                        <span className="ml-4 text-sm text-gray-600">
                            {currentFeature + 1} of {features.length}
                        </span>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-8">
                <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
                    {/* Feature Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-8">
                        <h2 className="text-4xl font-bold mb-4">{currentFeatureData.name}</h2>
                        <p className="text-xl opacity-90">{currentFeatureData.description}</p>
                    </div>

                    {/* Content Grid */}
                    <div className="grid lg:grid-cols-2 gap-8 p-8">
                        {/* Examples Section */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6 text-gray-800">Examples</h3>
                            <div className="space-y-4">
                                {currentFeatureData.examples.map((example, index) => (
                                    <div key={index} className="bg-gray-50 rounded-xl p-4">
                                        <img
                                            src={example}
                                            alt={`${currentFeatureData.name} example ${index + 1}`}
                                            className="w-full h-48 object-cover rounded-lg shadow-md"
                                            onError={(e) => {
                                                e.target.style.display = 'none';
                                                e.target.nextSibling.style.display = 'block';
                                            }}
                                        />
                                        <div 
                                            className="w-full h-48 bg-gray-200 rounded-lg shadow-md flex items-center justify-center text-gray-500"
                                            style={{ display: 'none' }}
                                        >
                                            <div className="text-center">
                                                <div className="text-4xl mb-2">🖼️</div>
                                                <div className="text-sm">Image not available</div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tips Section */}
                        <div>
                            <h3 className="text-2xl font-semibold mb-6 text-gray-800">What to Look For</h3>
                            <div className="space-y-4">
                                {currentFeatureData.tips.map((tip, index) => (
                                    <div key={index} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                                            <span className="text-purple-600 font-semibold text-sm">{index + 1}</span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">{tip}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Practice Tip */}
                            <div className="mt-8 bg-blue-50 rounded-xl p-6">
                                <h4 className="text-lg font-semibold text-blue-800 mb-2">💡 Practice Tip</h4>
                                <p className="text-blue-700">
                                    Take your time to examine each image carefully. Look at the details and compare with what you know about real photos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="bg-gray-50 px-8 py-6 flex justify-between items-center">
                        <button
                            onClick={handlePrevious}
                            disabled={currentFeature === 0}
                            className={`px-6 py-3 rounded-lg font-semibold transition ${
                                currentFeature === 0
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-gray-600 text-white hover:bg-gray-700'
                            }`}
                        >
                            Previous
                        </button>

                        <div className="flex space-x-4">
                            {currentFeature === features.length - 1 ? (
                                <button
                                    onClick={handleStartTraining}
                                    className="px-8 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition transform hover:scale-105"
                                >
                                    I'm Ready - Start Training
                                </button>
                            ) : (
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
                                >
                                    Next Feature
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TrainingIntroPage; 