"use client";

import React, { useState } from "react";
import axios from "axios";

interface SearchBarProps {
  onSearchResults: (results: any[]) => void; // Callback to send results back to parent
}

export default function SearchBar({ onSearchResults }: SearchBarProps) {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_PROD_URI}/api/schedules/search`, {
        params: { from, to, date },
      });
      onSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching routes:", error);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-lg font-bold mb-4">Search Bus Routes</h2>
      <div className="flex flex-col gap-4">
        {/* FROM */}
        <input
          type="text"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From"
          className="p-2 border rounded"
        />
        {/* TO */}
        <input
          type="text"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To"
          className="p-2 border rounded"
        />
        {/* DATE */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 border rounded"
        />
        {/* SEARCH BUTTON */}
        <button
          onClick={handleSearch}
          className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Search
        </button>
      </div>
    </div>
  );
}
