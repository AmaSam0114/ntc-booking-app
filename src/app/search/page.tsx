"use client";

import SearchBar from "@/components/searchbar";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [routes, setRoutes] = useState<any[]>([]);
  const router = useRouter();

  const handleBook = (scheduleId: string) => {
    router.push(`/booking/${scheduleId}`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Bus Route Search</h1>

      {/* Search Bar */}
      <SearchBar onSearchResults={(results) => setRoutes(results)} />

      {/* Search Results */}
      <div className="mt-6">
        {routes.length > 0 ? (
          <div className="bg-white p-6 shadow-md rounded-md">
            <h3 className="text-lg font-bold mb-4">Available Routes</h3>
            <ul className="space-y-4">
              {routes.map((route) => (
                <li key={route.bus_schedule_id} className="p-4 border rounded">
                  {/* Route Details */}
                  <p>
                    <strong>From:</strong> {route.start_point} -{" "}
                    <strong>To:</strong> {route.end_point}
                  </p>
                  <p>
                    <strong>Date & Time:</strong>{" "}
                    {new Date(route.date_time).toLocaleString()}
                  </p>
                  <p>
                    <strong>Bus Type:</strong> {route.bus_type}
                  </p>
                  <p>
                    <strong>Schedule ID:</strong> {route.bus_schedule_id}
                  </p>
                  <p>
                    <strong>Available Seats:</strong> {route.available_seats}
                  </p>
                  <p>
                    <strong>Duration:</strong> {route.duration} mins
                  </p>

                  <button
                    onClick={() => handleBook(route.bus_schedule_id)}
                    className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Book
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p className="text-center text-gray-500">No routes found.</p>
        )}
      </div>
    </div>
  );
}
