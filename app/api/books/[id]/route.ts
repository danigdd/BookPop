import { deleteBook, editBook } from "@/controllers/booksController";
import { getSessionUser } from "@/services/sessionsService";
import { getCookieValue } from "@/utils/cookies";
import { redirect } from "next/navigation";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieHeader = request.headers.get("Cookie");
  const tokenId = getCookieValue(cookieHeader, "auth_token");
  const user = await getSessionUser(tokenId);
  //test
  if (user.id != 6) {
    return Response.json({ message: "Delete not authorized" }, { status: 401 });
  }

  console.log("Autorizacion completa");
  const { id } = await params;

  await deleteBook(id);

  return Response.json({ message: "Delete succesufl", id });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const updatedTitle = await request.json();

  await editBook(updatedTitle.title, id);
  return Response.json({ message: "Updated succesufl", id, updatedTitle });
}
