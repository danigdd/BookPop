import {
  createBookService,
  getBooksService,
  deleteBookService,
} from "@/services/booksService";

export async function getBooks() {
  return getBooksService();
}

export async function createBook(book: string) {
  return createBookService(book);
}

export async function deleteBook(id: string) {
  return deleteBookService(id);
}
