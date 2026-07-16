import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getCookieValue } from "@/utils/cookies";

export async function DELETE(request: NextRequest) {
  try {
    const response = NextResponse.json({
      message: "Logout succesful",
    });

    response.cookies.delete("jwt_token");
    return response;
  } catch (error) {
    return Response.json({ message: "Something went wrong" }, { status: 500 });
  }
}
