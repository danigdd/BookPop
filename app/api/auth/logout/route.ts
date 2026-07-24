import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCookieValue } from "@/utils/cookies";
import { revokeRefreshToken } from "@/services/tokensService";

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout succesful",
    });

    const cookieHeader = request.headers.get("Cookie");
    const refreshCookie = getCookieValue(cookieHeader, "refresh_token");

    response.cookies.delete("jwt_token");

    if (!refreshCookie) {
      return response; //refresh cookie already doesnt exist
    }

    await revokeRefreshToken(refreshCookie);
    response.cookies.delete("refresh_token");
    return response;
  } catch (error) {
    console.log(error);
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
