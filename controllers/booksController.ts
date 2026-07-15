import {
  createBookService,
  getBooksService,
  deleteBookService,
  getBookByIdService,
  editBookService,
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

export async function editBook(title: string, id: string) {
  return editBookService(title, id);
}
