import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        gender: null,
        isAuthenticated: false,
        pretestCompleted: false,
        trainingCompleted: false,
        posttestCompleted: false,
        delayedTestCompleted: false
    });

    // 从后端获取用户进度
    const fetchUserProgress = async (userId) => {
        try {
            const response = await fetch(`https://demo-production-b992.up.railway.app/api/user-progress/${userId.toString()}`);
            if (response.ok) {
                const progress = await response.json();
                return {
                    pretestCompleted: progress.pretestCompleted || false,
                    trainingCompleted: progress.trainingCompleted || false,
                    posttestCompleted: progress.posttestCompleted || false,
                    delayedTestCompleted: progress.delayedTestCompleted || false
                };
            }
        } catch (err) {
            console.error('Failed to fetch user progress:', err);
        }
        return {
            pretestCompleted: false,
            trainingCompleted: false,
            posttestCompleted: false,
            delayedTestCompleted: false
        };
    };

    // 更新用户进度到后端
    const updateProgressToBackend = async (userId, progressType, completed) => {
        try {
            const response = await fetch('https://demo-production-b992.up.railway.app/api/user-progress/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: userId,
                    progressType: progressType,
                    completed: completed
                })
            });
            return response.ok;
        } catch (err) {
            console.error('Failed to update progress:', err);
            return false;
        }
    };

    // 启动时校验本地登录状态
    useEffect(() => {
        const checkAuth = async () => {
            const storedId = localStorage.getItem('userId');
            const storedGender = localStorage.getItem('gender');
            if (storedId && storedGender) {
                try {
                    const response = await fetch('https://demo-production-b992.up.railway.app/api/user/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: storedId, gender: storedGender }),
                    });
                    if (response.ok) {
                        const u = await response.json();
                        // 从后端获取用户进度
                        const progress = await fetchUserProgress(u.id);
                        
                        setUser({ 
                            ...u, 
                            isAuthenticated: true, 
                            ...progress
                        });
                        
                        // 备份到localStorage
                        localStorage.setItem('pretestCompleted', progress.pretestCompleted.toString());
                        localStorage.setItem('trainingCompleted', progress.trainingCompleted.toString());
                        localStorage.setItem('posttestCompleted', progress.posttestCompleted.toString());
                        localStorage.setItem('delayedTestCompleted', progress.delayedTestCompleted.toString());
                    } else {
                        // 本地缓存失效，清理
                        localStorage.removeItem('userId');
                        localStorage.removeItem('gender');
                        localStorage.removeItem('pretestCompleted');
                        localStorage.removeItem('trainingCompleted');
                        localStorage.removeItem('posttestCompleted');
                        localStorage.removeItem('delayedTestCompleted');
                    }
                } catch (err) {
                    console.error('Auth check failed:', err);
                }
            }
        };
        checkAuth();
    }, []);

    const login = async (userData) => {
        try {
            const response = await fetch('https://demo-production-b992.up.railway.app/api/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: userData.id,
                    gender: userData.gender
                }),
            });
            if (!response.ok) {
                alert('Login failed. Please check your user ID and gender.');
                return false;
            }
            const u = await response.json();
            
            // 从后端获取用户进度
            const progress = await fetchUserProgress(u.id);
            
            setUser({ 
                ...u, 
                isAuthenticated: true, 
                ...progress
            });
            
            // 保存到localStorage作为备份
            localStorage.setItem('userId', u.id);
            localStorage.setItem('gender', u.gender);
            localStorage.setItem('pretestCompleted', progress.pretestCompleted.toString());
            localStorage.setItem('trainingCompleted', progress.trainingCompleted.toString());
            localStorage.setItem('posttestCompleted', progress.posttestCompleted.toString());
            localStorage.setItem('delayedTestCompleted', progress.delayedTestCompleted.toString());
            return true;
        } catch (error) {
            console.error('Login error:', error);
            alert('Network or server error, login failed.');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            const response = await fetch('https://demo-production-b992.up.railway.app/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: userData.id,
                    gender: userData.gender
                }),
            });
            if (!response.ok) {
                alert('Registration failed. Please check your user ID and gender.');
                return false;
            }
            const u = await response.json();
            setUser({ 
                ...u, 
                isAuthenticated: true, 
                pretestCompleted: false,
                trainingCompleted: false,
                posttestCompleted: false,
                delayedTestCompleted: false
            });
            localStorage.setItem('userId', u.id);
            localStorage.setItem('gender', u.gender);
            localStorage.setItem('pretestCompleted', 'false');
            localStorage.setItem('trainingCompleted', 'false');
            localStorage.setItem('posttestCompleted', 'false');
            localStorage.setItem('delayedTestCompleted', 'false');
            return true;
        } catch (error) {
            console.error('Register error:', error);
            alert('Network or server error, registration failed.');
            return false;
        }
    };

    const logout = () => {
        setUser({ 
            id: null, 
            gender: null, 
            isAuthenticated: false, 
            pretestCompleted: false,
            trainingCompleted: false,
            posttestCompleted: false,
            delayedTestCompleted: false
        });
        localStorage.removeItem('userId');
        localStorage.removeItem('gender');
        localStorage.removeItem('pretestCompleted');
        localStorage.removeItem('trainingCompleted');
        localStorage.removeItem('posttestCompleted');
        localStorage.removeItem('delayedTestCompleted');
    };

    const updatePretestStatus = async (completed) => {
        setUser(prevUser => ({ ...prevUser, pretestCompleted: completed }));
        if (user.id) {
            await updateProgressToBackend(user.id.toString(), 'pretest', completed);
        }
        localStorage.setItem('pretestCompleted', completed.toString());
    };

    const updateTrainingStatus = async (completed) => {
        setUser(prevUser => ({ ...prevUser, trainingCompleted: completed }));
        if (user.id) {
            await updateProgressToBackend(user.id.toString(), 'training', completed);
        }
        localStorage.setItem('trainingCompleted', completed.toString());
    };

    const updatePosttestStatus = async (completed) => {
        setUser(prevUser => ({ ...prevUser, posttestCompleted: completed }));
        if (user.id) {
            await updateProgressToBackend(user.id.toString(), 'posttest', completed);
        }
        localStorage.setItem('posttestCompleted', completed.toString());
    };

    const updateDelayedTestStatus = async (completed) => {
        setUser(prevUser => ({ ...prevUser, delayedTestCompleted: completed }));
        if (user.id) {
            await updateProgressToBackend(user.id.toString(), 'delayed_test', completed);
        }
        localStorage.setItem('delayedTestCompleted', completed.toString());
    };

    return (
        <UserContext.Provider value={{ 
            user, 
            login, 
            register, 
            logout, 
            updatePretestStatus, 
            updateTrainingStatus, 
            updatePosttestStatus,
            updateDelayedTestStatus
        }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
