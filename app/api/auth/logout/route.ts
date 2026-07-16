import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCookieValue } from "@/utils/cookies";
import { deleteSessionUser } from "@/services/sessionsService";

export async function DELETE(request: NextRequest) {
  try {
    const cookieHeader = request.headers.get("Cookie");
    const tokenId = getCookieValue(cookieHeader, "auth_token");

    await deleteSessionUser(tokenId);

    const response = NextResponse.json({
      message: "Logout succesful",
    });

    response.cookies.delete("auth_token");
    return response;
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
