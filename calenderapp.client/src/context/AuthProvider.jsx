import React, { createContext, useEffect, useState } from 'react';
import api from '../components/axiosApi'; // the axios instance above

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/Auth/me')
            .then(res => setUser(res.data.username))
            .catch(() => setUser(null))
            .finally(() => setLoading(false));
    }, []);

    const login = async (username, password) => {
        try {
            await api.post('/Auth/login', { username, password });
            const res = await api.get('/auth/me');
            setUser(res.data.username)
            return { success: true };
        } catch (err) {
            const errMessage = err.response?.data || "Login failed.";
            return { success: false, errMessage };
        }
;
    };

    const logout = async () => {
        try {
            await api.post('/Auth/logout');
            setUser(null);
            return { success: true };
        } catch (err) {
            const errMessage = err.response?.data || "Logout failed.";
            return { success: false, errMessage };
        }
    };

    const register = async (username, password, email) => {
        try {
            await api.post('/Auth/register', { username, password, email });
            const res = await api.get('/Auth/me');
            setUser(res.data.username);
            return {success: true}
        } catch (err) {
            const errMessage = err.response?.data || "Registration failed.";
            return { success: false, errMessage };
        }

    };

    return (
        <AuthContext.Provider value={{ user, loading,login, logout, register }}>
            {children}
        </AuthContext.Provider>
    );
}