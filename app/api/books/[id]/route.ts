import { deleteBook, editBook } from "@/controllers/booksController";
import { requireAuth } from "@/services/authService";
import { getCookieValue } from "@/utils/cookies";
import { redirect } from "next/navigation";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const cookieHeader = request.headers.get("Cookie");
  const tokenId = getCookieValue(cookieHeader, "auth_token");
  const authorized = await requireAuth(tokenId);

  if (authorized) {
    return Response.json({ message: "Delete not authorized" }, { status: 401 });
  }

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
