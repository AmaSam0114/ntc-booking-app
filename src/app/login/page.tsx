"use client";

import AuthForm from "@/components/login-form";
import { saveToken } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LoginPage() {
    const [token, setToken] = useState<string>("");
    const router = useRouter();

    const handleLoginSuccess = (newToken: string) => {
        saveToken(newToken);
        setToken(newToken);
    };

    useEffect(() => {
        if (token) {
            window.location.href = "/search";
        }
    }, [token, router]);

    return (
        <main className="p-4 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Login</h2>
            <AuthForm setToken={handleLoginSuccess} />
        </main>
    );
}
