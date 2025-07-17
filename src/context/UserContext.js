import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: null,
        gender: null,
        isAuthenticated: false
    });

    // 可选：启动时校验本地登录状态
    useEffect(() => {
        const checkAuth = async () => {
            const storedId = localStorage.getItem('userId');
            const storedGender = localStorage.getItem('gender');
            if (storedId && storedGender) {
                try {
                    const response = await fetch('/api/user/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: storedId, gender: storedGender }),
                    });
                    if (response.ok) {
                        const u = await response.json();
                        setUser({ ...u, isAuthenticated: true });
                    } else {
                        // 本地缓存失效，清理
                        localStorage.removeItem('userId');
                        localStorage.removeItem('gender');
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
            const response = await fetch('/api/user/login', {
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
            setUser({ ...u, isAuthenticated: true });
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
            const response = await fetch('/api/user/register', {
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
            setUser({ ...u, isAuthenticated: true });
            localStorage.setItem('userId', u.id);
            localStorage.setItem('gender', u.gender);
            return true;
        } catch (error) {
            console.error('Register error:', error);
            alert('Network or server error, registration failed.');
            return false;
        }
    };

    const logout = () => {
        setUser({ id: null, gender: null, isAuthenticated: false });
        localStorage.removeItem('userId');
        localStorage.removeItem('gender');
    };

    return (
        <UserContext.Provider value={{ user, login, register, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;
