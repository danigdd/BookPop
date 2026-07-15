import { getBookById } from "@/controllers/booksController";

export default async function EditBook({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const book = await getBookById(id);
  const bookTitle = book[0].title;
  return (
    <form>
      <label>Nombre nuevo del libro</label>
      <input placeholder={`${bookTitle}...`}></input>
    </form>
  );
}
