import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TestComponent from '../components/TestComponent';

export default function FeatureTrainingPage() {
    const { feature } = useParams();
    const navigate = useNavigate();

    // 如果 URL 里 feature 错了，就跳回选择页
    if (!['asymmetries','background','hair'].includes(feature)) {
        navigate('/feature-select');
        return null;
    }

    // 比如特训做 15 题
    return (
        <TestComponent
            totalQuestions={15}
            isTraining={true}
            attemptType={`feature_${feature}`}
            featureFilter={feature}   // ← 新增这个 prop
        />
    );
}
