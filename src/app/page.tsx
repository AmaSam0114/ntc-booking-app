"use client";

import SearchBar from "@/components/searchbar";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [routes, setRoutes] = useState<any[]>([]); 

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <h1 className="text-4xl font-bold mb-6">Bus Seats Reservation - NTC 🚌</h1>
      <p className="mb-6 text-lg text-center">
        This is a demo client to showcase the features of the RESTful API.
      </p>
      <div className="flex flex-col gap-4">
        <Link
          href="/search"
          className="px-8 py-4 bg-blue-500 text-white text-center rounded-xl hover:bg-blue-700"
        >
          Book Your Seat
        </Link>
        <Link
          href="/login"
          className="px-8 py-4 bg-green-500 text-white text-center rounded-xl hover:bg-green-700"
        >
          Login
        </Link>
      </div>
    </main>
  );
}
