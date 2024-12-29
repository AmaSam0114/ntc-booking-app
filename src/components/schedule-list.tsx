"use client";

import { useEffect, useState } from "react";
import { getSchedules } from "../services/schedule";

interface Schedule {
  _id: string;
  bus_id: string;
  router_id: string;
  depature_time: string;
  arrival_time: string;
}

export default function ScheduleList() {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getSchedules();
        setSchedules(data);
      } catch (err) {
        setError("Failed to fetch schedules.");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Schedules</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule._id} className="p-2 border-b">
            {schedule.bus_id} - {schedule.arrival_time} to {schedule.depature_time}
          </li>
        ))}
      </ul>
    </div>
  );
}
