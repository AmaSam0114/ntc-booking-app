import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_PROD_URI}/api/buses`;

export async function getBuses(): Promise<any[]> {
  const response = await axios.get(API_URL);
  return response.data; // Return bus data
}
