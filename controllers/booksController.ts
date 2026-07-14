const books = [
  { id: 1, title: "Dune" },
  { id: 2, title: "1984" },
];

function addBookToLibrary(book: { title: string; id: number }) {
  books.push(book);
  console.log("Book added to local library");
}

export async function getBooks() {
  return books;
}

export async function createBook(book: { title: string }) {
  console.log("Creating a book...");
  const bookToAdd = { id: books.length + 1, ...book };
  addBookToLibrary(bookToAdd);

  console.log("Book published online!");
  return bookToAdd;
}
