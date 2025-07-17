import React from 'react';

const StaticFeedback = ({ isVisible, isCorrect, feedbackText, explanationImage, onReset }) => {
    if (!isVisible) return null;

    return (
        <div className="bg-white p-6 rounded shadow-lg max-w-md">
            <h3 className="text-xl mb-2">{isCorrect ? 'Correct!' : 'Incorrect!'}</h3>
            <p className="mb-4">{feedbackText}</p>
            {explanationImage && (
                <img src={explanationImage} alt="Explanation" className="w-full h-48 object-cover mb-4 rounded" />
            )}
            <button onClick={onReset} className="bg-blue-500 text-white p-2 rounded">
                Continue
            </button>
        </div>
    );
};

export default StaticFeedback;