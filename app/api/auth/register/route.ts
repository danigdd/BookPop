import { registerUser } from "@/controllers/authController";

export async function POST(request: Request) {
  const body = await request.json();

  const user = await registerUser(body);
  return Response.json({ id: user.id, email: user.email });
}
