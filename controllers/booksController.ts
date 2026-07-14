import pool from "@/lib/db";

function addBookToLibrary(book: { title: string; id: number }) {
  /*todo*/
}

export async function getBooks() {
  const result = await pool.query("SELECT * FROM books");
  console.log(result.rows);
  return result.rows;
}

export async function createBook(book: { title: string }) {
  /*todo*/
}
