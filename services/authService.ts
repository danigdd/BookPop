import pool from "@/lib/db";
import bcrypt from "bcryptjs";

export async function registerUserService(userData: {
  email: string;
  password: string;
}) {
  console.log(userData);
  const hashedPassword = await bcrypt.hash(userData.password, 15);
  const result = await pool.query(
    "INSERT INTO users(email, password_hash) VALUES ($1, $2) RETURNING *",
    [userData.email, hashedPassword],
  );

  return result.rows[0];
}
