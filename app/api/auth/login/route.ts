import { loginUser } from "@/controllers/authController";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const user = await loginUser(body);
    return Response.json({
      email: user.email,
      id: user.id,
      created_at: user.created_at,
    });
  } catch (error) {
    return Response.json({ message: "Invalid Credentials" }, { status: 401 });
  }
}
