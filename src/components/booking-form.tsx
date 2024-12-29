"use client";

import { useState } from "react";
import { createBooking } from "../services/booking";

interface BookingFormProps {
  token: string;
}

export default function BookingForm({ token }: BookingFormProps) {
  const [scheduleId, setScheduleId] = useState("");
  const [seatsBooked, setSeatsBooked] = useState(1);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const booking = await createBooking(token, scheduleId, seatsBooked);
      setMessage("Booking Successful: " + JSON.stringify(booking));
    } catch (err) {
      setMessage("Error creating booking.");
    }
  };

  return (
    <form className="p-4 border rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4">Create Booking</h2>
      <input
        type="text"
        placeholder="Schedule ID"
        className="p-2 border w-full mb-2"
        value={scheduleId}
        onChange={(e) => setScheduleId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Seats"
        className="p-2 border w-full mb-2"
        value={seatsBooked}
        onChange={(e) => setSeatsBooked(Number(e.target.value))}
      />
      <button type="submit" className="p-2 bg-green-500 text-white w-full">
        Book
      </button>
      {message && <p className="text-blue-500 mt-2">{message}</p>}
    </form>
  );
}
