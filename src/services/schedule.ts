import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_PROD_URI}/api/schedules`;

export async function getSchedules(): Promise<any[]> {
  const response = await axios.get(API_URL);
  return response.data; // Return schedule data
}
