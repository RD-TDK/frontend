import React from 'react';
import TestComponent from '../components/TestComponent';

const DelayedTest = () => {
    return <TestComponent totalQuestions={10} isTraining={false} attemptType="delayed_test" />;
};

export default DelayedTest; 