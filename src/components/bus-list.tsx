"use client";

import { useEffect, useState } from "react";
import { getBuses } from "../services/bus";

interface Bus {
  _id: string;
  bus_number: string;
  router_id: string;
  capacity: number;
  operator_id: string;
}

export default function BusList() {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getBuses();
        setBuses(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to fetch buses.");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-4 border rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">Buses</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {buses.map((bus) => (
          <li key={bus._id} className="p-2 border-b">
            {bus.bus_number} - {bus.capacity}
          </li>
        ))}
      </ul>
    </div>
  );
}
