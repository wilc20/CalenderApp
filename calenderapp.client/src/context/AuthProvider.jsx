import React, { createContext, useEffect, useState } from 'react';
import api from './axios'; // the axios instance above

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        api.get('/auth/me')
            .then(res => setUser(res.data.username))
            .catch(() => setUser(null));
    }, []);

    const login = async (username, password) => {
        await api.post('/auth/login', { username, password });
        const res = await api.get('/auth/me');
        setUser(res.data.username);
    };

    const logout = async () => {
        await api.post('/auth/logout');
        setUser(null);
    };

    const register = async (username, password, email) => {
        await api.post('/auth/register', { username, password, email });
        const res = await api.get('/auth/me');
        setUser(res.data.username);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}