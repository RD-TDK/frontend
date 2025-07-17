import React from 'react';
import TestComponent from '../components/TestComponent';

const PostTest = () => {
    return <TestComponent totalQuestions={10} isTraining={false} attemptType="post_training" />;
};

export default PostTest;