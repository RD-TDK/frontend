// src/components/PostTestResult.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const PostTestResult = ({ total, accuracy }) => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [pretestStats, setPretestStats] = useState(null);
    const [posttestChoices, setPosttestChoices] = useState([]);
    const [loading, setLoading] = useState(true);

    // 圆环进度条参数
    const radius = 60;
    const stroke = 8;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (accuracy / 100) * circumference;

    // 获取前测数据和后测详细选择
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 获取前测统计数据
                const pretestUrl = `https://demo-production-b992.up.railway.app/api/submit-choice?userId=${encodeURIComponent(user.id)}&attemptType=pre_training`;
                const pretestRes = await fetch(pretestUrl);
                if (pretestRes.ok) {
                    const pretestData = await pretestRes.json();
                    setPretestStats(pretestData);
                }

                // 获取后测详细选择数据
                const choicesUrl = `https://demo-production-b992.up.railway.app/api/submit-choice/choices?userId=${encodeURIComponent(user.id)}&attemptType=post_training`;
                const choicesRes = await fetch(choicesUrl);
                if (choicesRes.ok) {
                    const choicesData = await choicesRes.json();
                    setPosttestChoices(choicesData);
                }
            } catch (err) {
                console.error('Failed to fetch data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user.id]);

    // 计算改进
    const improvement = pretestStats ? accuracy - pretestStats.accuracy : 0;
    const isImproved = improvement > 0;
    const isSignificant = Math.abs(improvement) >= 10;

    // 基于用户选择生成个性化特征训练建议
    const generateFeatureRecommendations = () => {
        const recommendations = [];

        // 如果没有详细数据，不生成建议（等待数据加载）
        if (!posttestChoices || posttestChoices.length === 0) {
            return recommendations;
        }

        // 分析用户在不同特征上的表现
        const featureAnalysis = {
            asymmetries: { correct: 0, total: 0, errors: [] },
            background: { correct: 0, total: 0, errors: [] },
            hair: { correct: 0, total: 0, errors: [] }
        };

        // 分析每个选择
        console.log('Analyzing posttest choices:', posttestChoices);

        posttestChoices.forEach(choice => {
            const selectedFeature = choice.selectedFeature;
            const imagePath = choice.imagePath;

            // 确定特征类型（优先使用selectedFeature，如果没有则从图片路径推断）
            let feature = selectedFeature;
            if (!feature && !imagePath.includes('/real/')) {
                // 从图片路径推断特征类型
                if (imagePath.includes('/asymmetries/') || imagePath.includes('asymmetries')) {
                    feature = 'asymmetries';
                } else if (imagePath.includes('/background/') || imagePath.includes('background')) {
                    feature = 'background';
                } else if (imagePath.includes('/hair/') || imagePath.includes('hair')) {
                    feature = 'hair';
                }
            }

            console.log(`Choice analysis:`, {
                imagePath,
                selectedFeature,
                inferredFeature: feature,
                isCorrect: choice.isCorrect
            });

            if (feature && featureAnalysis[feature]) {
                featureAnalysis[feature].total++;
                if (choice.isCorrect) {
                    featureAnalysis[feature].correct++;
                } else {
                    featureAnalysis[feature].errors.push({
                        imagePath: choice.imagePath,
                        choice: choice.choice
                    });
                }
            }
        });

        console.log('Feature analysis result:', featureAnalysis);

        // 计算每个特征的准确率并生成建议
        Object.entries(featureAnalysis).forEach(([feature, data]) => {
            console.log(`Feature ${feature}:`, data);
            if (data.total > 0) {
                const featureAccuracy = (data.correct / data.total) * 100;
                const errorCount = data.errors.length;
                console.log(`${feature} accuracy: ${featureAccuracy}% (${data.correct}/${data.total}), errors: ${errorCount}`);

                // 基于错误数量设置优先级
                let priority = 'low';
                if (errorCount >= 3) {
                    priority = 'high';
                } else if (errorCount >= 2) {
                    priority = 'medium';
                }

                // 根据优先级生成不同的建议文本
                let reason = '';
                if (priority === 'high') {
                    reason = `You made ${errorCount} errors in ${feature} detection. This needs immediate attention.`;
                } else if (priority === 'medium') {
                    reason = `You made ${errorCount} errors in ${feature} detection. Some improvement needed.`;
                } else {
                    reason = `You made ${errorCount} error${errorCount > 1 ? 's' : ''} in ${feature} detection. Minor improvement needed.`;
                }

                recommendations.push({
                    feature: feature,
                    reason: reason,
                    priority: priority,
                    accuracy: featureAccuracy,
                    errors: errorCount
                });
            } else {
                console.log(`No data for feature: ${feature}`);
            }
        });

        // 如果没有特定特征的问题，基于总体准确率给出建议
        if (recommendations.length === 0) {
            if (accuracy < 85) {
                recommendations.push({
                    feature: 'asymmetries',
                    reason: 'General improvement needed. Start with facial asymmetry detection.',
                    priority: 'medium',
                    accuracy: accuracy
                });
            }
        }

        return recommendations;
    };

    // 使用useState来管理建议，确保数据更新时重新生成
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        if (!loading && posttestChoices) {
            const newRecommendations = generateFeatureRecommendations();
            setRecommendations(newRecommendations);
        }
    }, [loading, posttestChoices, accuracy]);

    if (loading) {
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your results...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-6 text-center max-w-4xl w-full border border-white/30 relative overflow-hidden max-h-[95vh] overflow-y-auto">
                {/* Background decorative elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"></div>
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-xl"></div>

                <div className="relative z-10">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-1">
                            Post-Test Results
                        </h2>
                        <p className="text-gray-600 text-sm">Your training progress analysis</p>
                    </div>

                    {/* Current Performance */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Current Performance</h3>
                        <div className="flex justify-center mb-4">
                            <div className="relative inline-block">
                                <svg
                                    height={radius * 2}
                                    width={radius * 2}
                                    className="transform -rotate-90 drop-shadow-lg"
                                >
                                    <circle
                                        stroke="#e5e7eb"
                                        fill="transparent"
                                        strokeWidth={stroke}
                                        r={normalizedRadius}
                                        cx={radius}
                                        cy={radius}
                                    />
                                    <circle
                                        stroke="url(#gradient)"
                                        fill="transparent"
                                        strokeWidth={stroke}
                                        strokeLinecap="round"
                                        r={normalizedRadius}
                                        cx={radius}
                                        cy={radius}
                                        style={{
                                            strokeDasharray: circumference,
                                            strokeDashoffset,
                                            transition: 'stroke-dashoffset 0.5s ease-out',
                                        }}
                                    />
                                    <defs>
                                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                            <stop offset="0%" stopColor="#3b82f6" />
                                            <stop offset="100%" stopColor="#8b5cf6" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center">
                                        <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            {accuracy}%
                                        </span>
                                        <div className="text-xs text-gray-500">Accuracy</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Comparison with Pretest */}
                    {pretestStats && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Progress Analysis</h3>
                            <div className="grid md:grid-cols-2 gap-4 mb-4">
                                <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4">
                                    <div className="text-sm text-blue-600 mb-2">Pretest Accuracy</div>
                                    <div className="text-2xl font-bold text-blue-600">{pretestStats.accuracy}%</div>
                                </div>
                                <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4">
                                    <div className="text-sm text-green-600 mb-2">Post-Test Accuracy</div>
                                    <div className="text-2xl font-bold text-green-600">{accuracy}%</div>
                                </div>
                            </div>

                            {/* Improvement Indicator */}
                            <div className={`rounded-xl p-3 mb-3 ${
                                isImproved
                                    ? 'bg-gradient-to-r from-green-50 to-emerald-100 border border-green-200'
                                    : 'bg-gradient-to-r from-yellow-50 to-orange-100 border border-yellow-200'
                            }`}>
                                <div className="flex items-center justify-center space-x-2 mb-2">
                                    {isImproved ? (
                                        <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                                        </svg>
                                    )}
                                    <span className={`font-semibold ${
                                        isImproved ? 'text-green-600' : 'text-yellow-600'
                                    }`}>
                                        {isImproved ? 'Improvement' : 'No Improvement'}
                                    </span>
                                </div>
                                <p className={`text-sm ${
                                    isImproved ? 'text-green-700' : 'text-yellow-700'
                                }`}>
                                    {isImproved
                                        ? `You improved by ${improvement.toFixed(1)}% ${isSignificant ? '— Excellent progress!' : '— Keep up the good work!'}`
                                        : `Your performance ${improvement === 0 ? 'remained the same' : `decreased by ${Math.abs(improvement).toFixed(1)}%`}. Consider more practice.`
                                    }
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Feature Training Recommendations */}
                    {recommendations.length > 0 && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Training Recommendations</h3>
                            <div className="space-y-2">
                                {recommendations.map((rec, index) => (
                                    <div key={index} className={`rounded-xl p-3 border ${
                                        rec.priority === 'high'
                                            ? 'bg-gradient-to-r from-red-50 to-pink-100 border-red-200'
                                            : rec.priority === 'medium'
                                            ? 'bg-gradient-to-r from-yellow-50 to-orange-100 border-yellow-200'
                                            : 'bg-gradient-to-r from-blue-50 to-indigo-100 border-blue-200'
                                    }`}>
                                        <div className="flex items-start space-x-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                                rec.priority === 'high' ? 'bg-red-500' :
                                                    rec.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                                            }`}>
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-1">
                                                    <span className={`font-semibold capitalize ${
                                                        rec.priority === 'high' ? 'text-red-700' :
                                                            rec.priority === 'medium' ? 'text-yellow-700' : 'text-blue-700'
                                                    }`}>
                                                        {rec.feature} Training
                                                    </span>
                                                    <span className={`text-xs px-2 py-1 rounded-full ${
                                                        rec.priority === 'high'
                                                            ? 'bg-red-200 text-red-700'
                                                            : rec.priority === 'medium'
                                                            ? 'bg-yellow-200 text-yellow-700'
                                                            : 'bg-blue-200 text-blue-700'
                                                    }`}>
                                                        {rec.priority} priority
                                                    </span>
                                                </div>
                                                <p className="text-sm text-gray-600">{rec.reason}</p>
                                                {rec.errors && rec.errors > 0 && (
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {rec.errors} error{rec.errors > 1 ? 's' : ''} in this feature
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="grid md:grid-cols-2 gap-3">
                        <button
                            onClick={() => navigate('/feature-select')}
                            className="py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                                <span>Feature Training</span>
                            </div>
                        </button>
                        <button
                            onClick={() => navigate('/welcome')}
                            className="py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                        >
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                <span>Back to Home</span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostTestResult; 