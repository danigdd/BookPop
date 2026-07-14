import { Book } from "@/types/book";

export default async function BooksPage() {
  const booksAPIResponse = await fetch("http://localhost:3000/api/books");
  const books = await booksAPIResponse.json(); //array of book objects
  return (
    <main>
      <h1>Todos los libros</h1>

      <ul>
        {books.map((book: Book) => (
          <li key={book.id}>
            Libro {book.title} con ID {book.id}
          </li>
        ))}
      </ul>
    </main>
  );
}
