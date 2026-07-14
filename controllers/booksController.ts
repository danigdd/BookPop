import pool from "@/lib/db";

export async function getBooks() {
  const result = await pool.query("SELECT * FROM books");
  console.log(result.rows);
  return result.rows;
}

export async function createBook(book: string) {
  await pool.query("INSERT INTO books (title) VALUES ($1)", [book]);
  return;
}
