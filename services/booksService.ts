import pool from "@/lib/db";

export async function getBooksService() {
  const result = await pool.query("SELECT * FROM books");
  return result.rows;
}

export async function createBookService(book: string) {
  await pool.query("INSERT INTO books (title) VALUES ($1)", [book]);
  console.log("inserted");
  return;
}

export async function deleteBookService(id: string) {
  await pool.query("DELETE FROM books WHERE id = $1", [id]);
}

export async function getBookByIdService(id: string) {
  const result = await pool.query("SELECT * FROM books WHERE id = $1", [id]);
  return result.rows;
}
