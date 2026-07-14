import pool from "@/lib/db";

export async function getBooksService() {
  const result = await pool.query("SELECT * FROM books");
  console.log(result.rows);
  return result.rows;
}

export async function createBookService(book: string) {
  await pool.query("INSERT INTO books (title) VALUES ($1)", [book]);
  console.log("inserted");
  return;
}
