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

export async function loginUserService(userData: {
  email: string;
  password: string;
}) {
  const result = await pool.query(
    "SELECT password_hash FROM users WHERE email = $1",
    [userData.email],
  );

  if (result.rows.length === 0) {
    throw new Error("USER_NOT_FOUND");
  }

  const hashStored = result.rows[0].password_hash;

  const passwordCorrect = await bcrypt.compare(userData.password, hashStored);
  if (!passwordCorrect) {
    throw new Error("INVALID_PASSWORD");
  }

  const correctResult = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [userData.email],
  );
  const user = correctResult.rows[0];
  return user;
}
