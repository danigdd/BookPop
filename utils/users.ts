import pool from "@/lib/db";

export async function getUserById(user_id: string) {
  const result = await pool.query("SELECT id, role FROM users WHERE id = $1", [
    user_id,
  ]);
  return result.rows[0];
}
