import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { getMe } from "../api/auth";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const refreshUser = async () => {
        const data = await getMe();
        setUser(data.loggedIn ? data.username : null);
    };

    useEffect(() => {
        async function load() {
        const data = await getMe();
        setUser(data.loggedIn ? data.username : null);
        setLoading(false);
        }
        load();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, refreshUser }}>
        {children}
        </AuthContext.Provider>
    );
    }