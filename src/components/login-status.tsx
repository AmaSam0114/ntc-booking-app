"use client";

import { checkLoginStatus, getToken } from "@/services/auth";
import { useEffect, useState } from "react";

export default function LoginStatus() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function verifyLogin() {
            const token = getToken(); // Retrieve token from local storage
            if (token) {
                const status = await checkLoginStatus(token);
                setIsLoggedIn(status);
            }
            setLoading(false);
        }

        verifyLogin();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-4 text-center">
            {isLoggedIn ? (
                <p className="text-green-500">You are logged in ✅</p>
            ) : (
                <p className="text-red-500">You are logged out ❌</p>
            )}
        </div>
    );
}
