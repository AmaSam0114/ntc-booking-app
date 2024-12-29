import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_PROD_URI}/api/reports`; // Replace with deployed API URL

export async function getSalesReport(token: string): Promise<any> {
  const response = await axios.get(`${API_URL}/sales`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return sales data
}

export async function getUtilizationReport(token: string): Promise<any> {
  const response = await axios.get(`${API_URL}/utilization`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data; // Return seat utilization report
}
