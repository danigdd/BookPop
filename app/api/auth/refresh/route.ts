import {
  createRefreshToken,
  getRefreshToken,
  revokeRefreshToken,
} from "@/services/tokensService";
import { createJWT } from "@/utils/tokens";
import { getUserById } from "@/utils/users";
import { NextRequest } from "next/server";
import { getCookieValue } from "@/utils/cookies";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const cookieHeader = request.headers.get("Cookie");
  const refreshCookie = getCookieValue(cookieHeader, "refresh_token");

  if (!refreshCookie) {
    throw new Error("REFRESH_TOKEN_NOT_SENT");
  }

  const refresh_token = await getRefreshToken(refreshCookie);

  if (!refresh_token) {
    throw new Error("REFRESH_TOKEN_NOT_FOUND");
  }

  if (refresh_token.revoked) {
    throw new Error("REFRESH_TOKEN_REVOKED");
  }

  const expires_at = new Date(refresh_token.expires_at);

  if (expires_at < new Date()) {
    throw new Error("REFRESH_TOKEN_EXPIRED");
  }

  await revokeRefreshToken(refreshCookie);

  const user_id = refresh_token.user_id;

  const user = await getUserById(user_id);

  const jwtToken = createJWT(user);
  const refreshToken = await createRefreshToken(user);

  const response = NextResponse.json({
    message: "New token created",
  });

  response.cookies.set("jwt_token", jwtToken, {
    httpOnly: true,
    secure: false, //PRODUCTION
    sameSite: "lax",
    path: "/",
    maxAge: 15 * 60,
  });

  response.cookies.set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: false, //PRODUCTION
    sameSite: "lax",
    path: "/api/auth/refresh",
    maxAge: 30 * 24 * 60 * 60,
  });

  return response;
}
