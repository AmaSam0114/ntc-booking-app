import { Inter } from "next/font/google";
import "@/styles/theme.css";
import NavBar from "@/components/nav-bar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} bg-gray-50 text-gray-900`}>
                <NavBar />

                {/* Main Content */}
                <main className="container mx-auto min-h-[calc(100vh-100px)] p-6">{children}</main>

                {/* Footer */}
                <footer className="w-full bg-gray-200 p-4 text-center text-sm">
                    © {new Date().getFullYear()} NTC Booking LK. All Rights Reserved.
                </footer>
            </body>
        </html>
    );
}
