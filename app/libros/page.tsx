import { getBooks } from "@/controllers/booksController";
import { Book } from "@/types/book";

export default async function BooksPage() {
  const books = await getBooks();
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
      <a href="/libros/crear">Crear un libro</a>
    </main>
  );
}
