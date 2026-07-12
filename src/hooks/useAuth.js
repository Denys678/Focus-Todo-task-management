import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

const TOKEN_STORAGE_KEY = "focus-todo-token";
const USER_STORAGE_KEY = "focus-todo-user";

export function useAuth() {
    const [token, setToken] = useState(() => {
        return localStorage.getItem(TOKEN_STORAGE_KEY);
    });

    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem(USER_STORAGE_KEY);

        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthLoading, setIsAuthLoading] = useState(false);
    const [authError, setAuthError] = useState(null);

    const saveAuthData = (authData) => {
        localStorage.setItem(TOKEN_STORAGE_KEY, authData.token);
        localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(authData.user));

        setToken(authData.token);
        setUser(authData.user);
    };

    const login = async (credentials) => {
        try {
            setIsAuthLoading(true);
            setAuthError(null);

            const authData = await loginUser(credentials);

            saveAuthData(authData);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setIsAuthLoading(false);
        }
    };

    const register = async (credentials) => {
        try {
            setIsAuthLoading(true);
            setAuthError(null);

            await registerUser(credentials);

            const authData = await loginUser(credentials);

            saveAuthData(authData);
        } catch (error) {
            setAuthError(error.message);
        } finally {
            setIsAuthLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        localStorage.removeItem(USER_STORAGE_KEY);

        setToken(null);
        setUser(null);
    };

    return {
        token,
        user,
        isAuthenticated: Boolean(token),
        isAuthLoading,
        authError,
        login,
        register,
        logout,
    };
}