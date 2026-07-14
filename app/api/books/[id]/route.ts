import { deleteBook } from "@/controllers/booksController";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  await deleteBook(id);

  return Response.json({ message: "Delete succesufl", id });
}
