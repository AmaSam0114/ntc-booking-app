import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_PROD_URI}/api/payments`; // Replace with deployed API URL

export async function initiatePayment(
  token: string,
  bookingId: string,
  amount: number,
  paymentMethod: string
): Promise<any> {
  const response = await axios.post(
    `${API_URL}/initiate`,
    { bookingId, amount, paymentMethod },
    {
      headers: {
        Authorization: `Bearer ${token}`, // Token authentication
      },
    }
  );
  return response.data; // Return payment response
}

export async function verifyPayment(
  token: string,
  paymentId: string
): Promise<any> {
  const response = await axios.post(
    `${API_URL}/verify`,
    { paymentId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data; // Return verification status
}
