import axios from "axios";
import type { LoginResponse } from "../types/auth";

const API = "http://localhost:8080/auth";

export const loginUser = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await axios.post<LoginResponse>(`${API}/login`, {
    username,
    password,
  });
  return response.data.token;
};
