import axios from "axios";

const API_URL = `${process.env.NEXT_PUBLIC_API_PROD_URI}/api/auth`;

export async function login(email: string, password: string): Promise<string> {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.token;
}

export async function checkLoginStatus(token: string): Promise<any> {
  try {
    const response = await axios.get(`${API_URL}/status`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
}

export function saveToken(token: string): void {
  localStorage.setItem("token", token);
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}

export function removeToken(): void {
  localStorage.removeItem("token");
}
