import React from 'react';
import TestComponent from '../components/TestComponent';

const PreTest = () => {
    return <TestComponent totalQuestions={10} isTraining={false} attemptType="pre_training" />;
};

export default PreTest;