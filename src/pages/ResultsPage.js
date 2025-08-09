import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import PostTestResult from '../components/PostTestResult';

const ResultsPage = () => {
    const navigate = useNavigate();
    const { user } = useContext(UserContext);
    const [posttestStats, setPosttestStats] = useState(null);
    const [loading, setLoading] = useState(true);

    // 获取后测数据
    useEffect(() => {
        const fetchPosttestStats = async () => {
            try {
                const url = `http://localhost:8080/api/submit-choice?userId=${encodeURIComponent(user.id)}&attemptType=post_training`;
                const res = await fetch(url);
                if (res.ok) {
                    const data = await res.json();
                    setPosttestStats(data);
                }
            } catch (err) {
                console.error('Failed to fetch posttest stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosttestStats();
    }, [user.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading your results...</p>
                </div>
            </div>
        );
    }

    // 如果没有后测数据，显示提示
    if (!posttestStats || posttestStats.total === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 text-center max-w-md w-full border border-white/30">
                    <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Available</h2>
                    <p className="text-gray-600 mb-6">
                        You need to complete the post-test first to view your results and progress analysis.
                    </p>
                    <button
                        onClick={() => navigate('/post-test')}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                    >
                        <div className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Take Post-Test</span>
                        </div>
                    </button>
                </div>
            </div>
        );
    }

    // 如果有后测数据，显示结果
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
            <PostTestResult 
                total={posttestStats.total} 
                accuracy={posttestStats.accuracy} 
            />
        </div>
    );
};

export default ResultsPage; 