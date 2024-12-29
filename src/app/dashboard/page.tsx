"use client";

import BusList from "@/components/bus-list";
import LoginStatus from "@/components/login-status";
import ScheduleList from "@/components/schedule-list";

export default function DashboardPage() {
    return (
        <main className="p-4">
            <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
             {/* Login Status */}
             <LoginStatus />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BusList />
                <ScheduleList />
            </div>
        </main>
    );
}
