import { getBooks, createBook } from "@/controllers/booksController";

export async function GET() {
  console.log("entramosw en get");
  const books = await getBooks();
  return Response.json(books);
}

export async function POST(request: Request) {
  const body = await request.json();
  console.log(body);
  const newBook = await createBook(body);
  return Response.json(newBook);
}
