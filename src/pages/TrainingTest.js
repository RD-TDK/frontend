import React from 'react';
import TestComponent from '../components/TestComponent';

const TrainingTest = () => {
    return <TestComponent totalQuestions={20} isTraining={true} attemptType="training" />;
};

export default TrainingTest;