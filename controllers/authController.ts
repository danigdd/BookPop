import { registerUserService } from "@/services/authService";

export async function registerUser(userData: {
  email: string;
  password: string;
}) {
  const user = registerUserService(userData);
  return user;
}
