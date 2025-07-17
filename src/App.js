import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Welcome from './components/Welcome';
import PreTest from './pages/PreTest';
import TrainingTest from './pages/TrainingTest';
import PostTest from './pages/PostTest';
import FeatureSelectPage from './pages/FeatureSelectPage';
import FeatureTrainingPage from './pages/FeatureTrainingPage';
import { UserContext } from './context/UserContext';

const App = () => {
    const { user } = React.useContext(UserContext);

    return (
        <Routes>
            {/** 未登录：只允许 /login 和 /register，其它全部重定向到 /login */}
            {!user.isAuthenticated ? (
                <>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="*" element={<Navigate to="/login" replace />} />
                </>
            ) : (
                <>
                    {/** 登录后：根路径重定向到 /welcome */}
                    <Route path="/" element={<Navigate to="/welcome" replace />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/pre-test" element={<PreTest />} />
                    <Route path="/training-test" element={<TrainingTest />} />
                    <Route path="/post-test" element={<PostTest />} />
                    <Route path="/feature-select" element={<FeatureSelectPage />} />
                    <Route path="/feature-training/:feature" element={<FeatureTrainingPage />} />
                    {/** 未匹配到路由时重定向回欢迎页 */}
                    <Route path="*" element={<Navigate to="/welcome" replace />} />
                </>
            )}
        </Routes>
    );
};

export default App;
