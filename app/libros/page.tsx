import DeleteBookButton from "@/components/DeleteBookButton";
import { getBooks } from "@/controllers/booksController";
import { Book } from "@/types/book";
import Link from "next/link";

export default async function BooksPage() {
  const books = await getBooks();
  return (
    <main>
      <h1>Todos los libros</h1>

      <ul>
        {books.map((book: Book) => {
          return (
            <li key={book.id}>
              Libro {book.title} con ID {book.id}
              <DeleteBookButton id={book.id} />
              <Link href={`/libros/editar/${book.id}`}>Editar</Link>
            </li>
          );
        })}
      </ul>
      <a href="/libros/crear">Crear un libro</a>
    </main>
  );
}
