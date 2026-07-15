import { registerUserService, loginUserService } from "@/services/authService";

export async function registerUser(userData: {
  email: string;
  password: string;
}) {
  const user = registerUserService(userData);
  return user;
}

export async function loginUser(userData: { email: string; password: string }) {
  const user = loginUserService(userData);
  return user;
}
