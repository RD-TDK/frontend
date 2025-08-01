import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        gender: null,
        isAuthenticated: false,
        pretestCompleted: false
    });

    // 可选：启动时校验本地登录状态
    useEffect(() => {
        const checkAuth = async () => {
            const storedId = localStorage.getItem('userId');
            const storedGender = localStorage.getItem('gender');
            const storedPretestCompleted = localStorage.getItem('pretestCompleted') === 'true';
            if (storedId && storedGender) {
                try {
                    const response = await fetch('https://demo-production-b992.up.railway.app/api/user/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: storedId, gender: storedGender }),
                    });
                    if (response.ok) {
                        const u = await response.json();
                        setUser({ ...u, isAuthenticated: true, pretestCompleted: storedPretestCompleted });
                    } else {
                        // 本地缓存失效，清理
                        localStorage.removeItem('userId');
                        localStorage.removeItem('gender');
                        localStorage.removeItem('pretestCompleted');
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
            //https://demo-production-b992.up.railway.app___http://localhost:8080/api/user/login
            const response = await fetch('https://demo-production-b992.up.railway.app/api/user/login', {
            /*const response = await fetch('https://demo-production-b992.up.railway.app/api/user/login', {*/
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
            const storedPretestCompleted = localStorage.getItem('pretestCompleted') === 'true';
            setUser({ ...u, isAuthenticated: true, pretestCompleted: storedPretestCompleted });
            localStorage.setItem('userId', u.id);
            localStorage.setItem('gender', u.gender);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            alert('Network or server error, login failed.');
            return false;
        }
    };

    const register = async (userData) => {
        try {
            //https://demo-production-b992.up.railway.app
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
            setUser({ ...u, isAuthenticated: true, pretestCompleted: false });
            localStorage.setItem('userId', u.id);
            localStorage.setItem('gender', u.gender);
            localStorage.setItem('pretestCompleted', 'false');
            return true;
        } catch (error) {
            console.error('Register error:', error);
            alert('Network or server error, registration failed.');
            return false;
        }
    };

    const logout = () => {
        setUser({ id: null, gender: null, isAuthenticated: false, pretestCompleted: false });
        localStorage.removeItem('userId');
        localStorage.removeItem('gender');
        localStorage.removeItem('pretestCompleted');
    };

    const updatePretestStatus = (completed) => {
        setUser(prevUser => ({ ...prevUser, pretestCompleted: completed }));
        localStorage.setItem('pretestCompleted', completed.toString());
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout, updatePretestStatus }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
