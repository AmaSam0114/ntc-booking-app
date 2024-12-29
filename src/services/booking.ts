import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_PROD_URI}/api/bookings`;

export async function createBooking(
  token: string,
  scheduleId: string,
  seatsBooked: number
): Promise<any> {
  const response = await axios.post(
    API_URL,
    { scheduleId, seatsBooked },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Pass token in header for protected routes
      },
    }
  );
  return response.data; // Return booking confirmation
}

export async function getUserBookings(
  token: string,
  userId: string
): Promise<any> {
  const response = await axios.get(`${API_URL}/users/${userId}/bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return user's booking history
}
