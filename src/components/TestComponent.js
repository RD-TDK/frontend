// src/components/TestComponent.js
import React, { useState, useEffect, useContext } from 'react';
import { UserContext }          from '../context/UserContext';
import ImageSelector            from './ImageSelector';
import Prompt                   from './Prompt';
import StaticFeedback           from './StaticFeedback';
import ResultSummary            from './ResultSummary';
import Navbar                   from './Navbar';
import Footer                   from './Footer';

// —— 图片池放到组件外，务必确保每个 AI 图片都带 .feature 字段 ——
const IMAGES = [
    // 真实图，不需 feature
    { src: '/images/real/00000.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00001.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00002.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00003.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00004.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00005.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00006.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00007.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00008.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00009.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00010.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00011.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00012.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00013.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00014.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00015.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00016.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00017.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00018.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00019.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00020.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00021.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00022.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00023.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00024.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00025.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00026.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00027.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00028.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00029.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00030.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00031.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00032.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00033.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00034.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00035.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00036.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00037.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00038.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00039.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00040.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00041.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00042.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00043.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00044.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00045.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00046.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00047.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00048.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00049.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00050.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00051.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00052.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00053.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00054.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00055.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00056.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00057.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00058.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    { src: '/images/real/00059.png', isReal: true, feedback: 'Correct!', explanationImage: null },
    // AI 图，带 feature
    { src: '/images/features/asymmetries/asy_01.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_ex_01.png' },
    { src: '/images/features/asymmetries/asy_02.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_03.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_04.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_05.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_06.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_07.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_08.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_09.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_10.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_11.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_12.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_13.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_14.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_15.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_16.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_17.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_18.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_19.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' },
    { src: '/images/features/asymmetries/asy_20.png', feature: 'asymmetries', isReal: false, feedback: 'Oops, that was AI.', explanationImage: '/images/features/asymmetries/asy_multipepple_explain.png' }
    // …按需补全更多
];

// Fisher–Yates 随机打乱
function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

const TestComponent = ({
                           totalQuestions,
                           isTraining,
                           attemptType,
                           featureFilter   // 新增：专项训练时传入 'asymmetries' | 'background' | 'hair'
                       }) => {
    const { user } = useContext(UserContext);

    // 状态
    const [questions, setQuestions]       = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [currentPair, setCurrentPair]   = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [showFeedback, setShowFeedback]   = useState(false);
    const [feedbackText, setFeedbackText]   = useState('');
    const [explanationImage, setExplanationImage] = useState(null);
    const [stats, setStats] = useState({ total: 0, correct: 0 });

    // —— 生成题库 ——
    useEffect(() => {
        // 真实图：全量
        const realPool = IMAGES.filter(img => img.isReal);
        // AI 图：若 featureFilter 存在，则只取该特征，否则全量
        const aiPool = IMAGES.filter(
            img => !img.isReal && (!featureFilter || img.feature === featureFilter)
        );

        const reals = shuffle(realPool);
        const ais   = shuffle(aiPool);

        const list = [];
        for (let i = 0; i < totalQuestions; i++) {
            const realImg    = reals[i % reals.length];
            const aiImg      = ais[i % ais.length];
            const isLeftReal = Math.random() < 0.5;
            list.push({
                left:  isLeftReal ? realImg : aiImg,
                right: isLeftReal ? aiImg   : realImg,
            });
        }
        setQuestions(list);
        setCurrentQuestion(0);
    }, [totalQuestions, featureFilter]);

    useEffect(() => {
        if (!isTraining && currentQuestion === totalQuestions) {
            fetchStats();
        }
    }, [currentQuestion, isTraining, totalQuestions]);

    // —— 同步当前题目对 ——
    useEffect(() => {
        if (questions[currentQuestion]) {
            setCurrentPair(questions[currentQuestion]);
        }
    }, [questions, currentQuestion]);

    const fetchStats = async () => {
        try {
            const res = await fetch('/api/submit-choice');
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const { total, correct } = await res.json();
            setStats({ total, correct });
        } catch (err) {
            console.error('Stats fetch error:', err);
        }
    };

    const handleImageClick = async side => {
        if (currentQuestion >= totalQuestions) return;

        const chosen = side === 'left' ? currentPair.left : currentPair.right;
        const isCorrect =
            (side === 'left'  && currentPair.left.isReal) ||
            (side === 'right' && currentPair.right.isReal);

        setSelectedImage(side);
        setFeedbackText(chosen.feedback);
        setExplanationImage(chosen.explanationImage);
        setShowFeedback(isTraining);

        // 构造 snake_case payload
        const choiceData = {
            userId:         user.id || 'anonymous',
            choice:         side,
            isCorrect:      isCorrect,
            selectedFeature:null,
            imagePath:      chosen.src,
            timestamp:      new Date().toISOString(),
            attemptType:    attemptType,
        };

        try {
            const res = await fetch('/api/submit-choice', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify(choiceData),
            });
            if (!res.ok) throw new Error(`Status ${res.status}`);
            if (isTraining) await fetchStats();

            // 非训练模式直接推进；训练模式在关闭弹窗时推进
            if (!isTraining) {
                setCurrentQuestion(q => q + 1);
            }
        } catch (err) {
            console.error(err);
            alert('Data submission failed. Please check your network or backend.');
        }
    };

    const handleCloseFeedback = () => {
        setShowFeedback(false);
        setSelectedImage(null);
        setCurrentQuestion(q => q + 1);
    };

    // 进度 & 准确率
    const progress = (currentQuestion / totalQuestions) * 100;
    const accuracy = stats.total > 0
        ? ((stats.correct / stats.total) * 100).toFixed(2)
        : 0;

    return (
        <div className="min-h-screen flex flex-col bg-gray-100">
            <Navbar />
            <div className="flex-1 p-6">
                {/* 进度条 */}
                <div className="mb-6">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="text-right text-sm text-gray-600 mt-1">
                        {currentQuestion} / {totalQuestions}
                    </div>
                </div>

                <Prompt text="Click to select the image you think is real." />

                <div className="flex justify-center items-center h-full">
                    {currentQuestion < totalQuestions && currentPair.left && (
                        <ImageSelector
                            leftImage={currentPair.left.src}
                            rightImage={currentPair.right.src}
                            onImageClick={handleImageClick}
                            selected={selectedImage}
                        />
                    )}
                </div>

                {/* 全答完显示结果 */}
                {currentQuestion >= totalQuestions && (
                    <ResultSummary total={totalQuestions} accuracy={accuracy} />
                )}

                {/* 仅训练模式显示弹窗反馈 */}
                {showFeedback && (
                    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <StaticFeedback
                            isVisible={showFeedback}
                            isCorrect={
                                (selectedImage === 'left'  && currentPair.left.isReal) ||
                                (selectedImage === 'right' && currentPair.right.isReal)
                            }
                            feedbackText={feedbackText}
                            explanationImage={explanationImage}
                            onReset={handleCloseFeedback}
                        />
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default TestComponent;
