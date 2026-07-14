export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  console.log(id);
  return Response.json({ message: "Delete succesufl", id: id });
}
