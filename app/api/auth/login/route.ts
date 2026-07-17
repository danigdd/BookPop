import { loginUser } from "@/controllers/authController";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const user = await loginUser(body);

    const response = NextResponse.json({
      message: "Login succesful",
    });

    response.cookies.set("jwt_token", user.jwtToken, {
      httpOnly: true,
      secure: false, //PRODUCTION
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });

    response.cookies.set("refresh_token", user.refreshToken, {
      httpOnly: true,
      secure: false, //PRODUCTION
      sameSite: "lax",
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });

    return response;
  } catch (error) {
    return Response.json({ message: "Invalid Credentials" }, { status: 401 });
  }
}
