import { deleteBook } from "@/controllers/booksController";
import { redirect } from "next/navigation";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await deleteBook(id);

  return Response.json({ message: "Delete succesufl", id });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  console.log("ENTRAMOS EN PATCH?");
  const { id } = await params;
  const updatedTitle = await request.json();
  console.log(updatedTitle.title);
  redirect("/libros");
}
