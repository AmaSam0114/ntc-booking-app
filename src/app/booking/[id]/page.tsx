"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

interface BookingDetails {
  start_point: string;
  end_point: string;
  date_time: string;
  bus_type: string;
  available_seats: number;
  duration: number;
  bus_schedule_id: string;
}

export default function BookingPage() {
  const { id } = useParams(); // Schedule ID from URL
  const [schedule, setSchedule] = useState<BookingDetails | null>(null);
  const [selectedSeat, setSelectedSeat] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_PROD_URI}/api/schedules/${id}`
        );
        setSchedule(response.data);
      } catch (err) {
        setError("Failed to fetch schedule details.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleBooking = async () => {
    try {
      if (!selectedSeat) {
        setMessage("Please select a seat!");
        return;
      }

      // Get token from localStorage (Assuming the user is logged in)
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("You need to log in to book a seat!");
        return;
      }

      // Create booking API request
      const response = await axios.post(
        `http://localhost:8080/api/bookings`,
        {
          schedule_id: id,
          seat_number: selectedSeat,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("Booking successful!");
    } catch (err) {
      console.error("Booking error:", err);
      setMessage("Failed to create booking.");
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-center">Booking Details</h1>
      <div className="bg-white p-6 shadow-md rounded-md">
        {schedule && (
          <>
            <p>
              <strong>From:</strong> {schedule.start_point}
            </p>
            <p>
              <strong>To:</strong> {schedule.end_point}
            </p>
            <p>
              <strong>Date & Time:</strong>{" "}
              {new Date(schedule.date_time).toLocaleString()}
            </p>
            <p>
              <strong>Bus Type:</strong> {schedule.bus_type}
            </p>
            <p>
              <strong>Available Seats:</strong> {schedule.available_seats}
            </p>
            <p>
              <strong>Duration:</strong> {schedule.duration} mins
            </p>

            {/* Seat Selection */}
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-4">Select Your Seat</h3>
              <select
                value={selectedSeat || ""}
                onChange={(e) => setSelectedSeat(Number(e.target.value))}
                className="p-2 border rounded w-full"
              >
                <option value="">Select Seat</option>
                {[...Array(schedule.available_seats)].map((_, index) => (
                  <option key={index + 1} value={index + 1}>
                    Seat {index + 1}
                  </option>
                ))}
              </select>
            </div>

            {/* Confirm Booking */}
            <button
              onClick={handleBooking}
              className="mt-6 p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Checkout
            </button>
            {message && (
              <p className="mt-4 text-center text-green-500">{message}</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}
