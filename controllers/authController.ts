import { registerUserService, loginUserService } from "@/services/authService";

export async function registerUser(userData: {
  email: string;
  password: string;
}) {
  const user = await registerUserService(userData);
  return user;
}

export async function loginUser(userData: { email: string; password: string }) {
  const result = await loginUserService(userData);

  return result;
}
