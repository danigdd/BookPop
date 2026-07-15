import {
  createBookService,
  getBooksService,
  deleteBookService,
  getBookByIdService,
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

export async function getBookById(id: string) {
  return getBookByIdService(id);
}
