import { createBookService, getBooksService } from "@/services/booksService";

export async function getBooks() {
  return getBooksService();
}

export async function createBook(book: string) {
  return createBookService(book);
}
