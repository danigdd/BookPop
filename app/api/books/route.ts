import { getBooks, createBook } from "@/controllers/booksController";
import { redirect } from "next/navigation";

export async function GET() {
  console.log("entramosw en get");
  const books = await getBooks();
  return Response.json(books);
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const title = String(formData.get("title"));

  await createBook(title);

  redirect("/libros");
}
