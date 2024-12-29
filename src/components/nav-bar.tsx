"use client";

import { checkLoginStatus, getToken, removeToken } from "@/services/auth";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NavBar() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [userName, setUserName] = useState<string>("");

    useEffect(() => {
        const verifyLogin = async () => {
            const token = getToken();
            if (token) {
                const response = await checkLoginStatus(token);
                if (response.loggedIn && response.user) {
                    setLoggedIn(true);
                    setUserName(response.user.name);
                } else {
                    setLoggedIn(false);
                    setUserName("");
                }
            }
        };
        verifyLogin();
    }, []);

    const handleLogout = () => {
        setLoggedIn(false);
        setUserName("");
        removeToken();
    };

    return (
        <header className="w-full p-4 bg-blue-600 text-white shadow-md">
            <nav className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-semibold">Bus Seats Reservation - NTC</h1>
                <div className="flex gap-6">
                    <Link href="/" className="hover:underline">
                        Home
                    </Link>
                    <Link href="/search" className="hover:underline">
                        Search
                    </Link>
                    {loggedIn ? (
                        <>
                            <button
                                onClick={handleLogout}
                                className="hover:underline text-red-300"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="flex gap-6">
                        <Link href="/register" className="hover:underline">
                            Register
                        </Link>
                        <Link href="/login" className="hover:underline">
                        Login
                    </Link>
                    </div>
                    )}
                </div>
            </nav>
        </header>
    );
}
