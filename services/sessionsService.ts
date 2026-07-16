import crypto from "crypto";
import pool from "@/lib/db";
export async function createSession(userId: number) {
  const sessionId = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const result = await pool.query(
    "INSERT INTO sessions(session_id, user_id, expires_at) VALUES ($1, $2, $3) RETURNING *",
    [sessionId, userId, expiresAt],
  );
  return result.rows[0];
}

export async function getSessionUser(tokenId: string | null) {
  if (!tokenId) {
    throw new Error("NO SESSION TOKEN");
  }
  const session = await pool.query(
    "SELECT user_id FROM sessions WHERE session_id = $1 AND expires_at > NOW()",
    [tokenId],
  );

  if (session.rows.length === 0) {
    throw new Error("COOKIE DOES NOT EXIST");
  }

  const user_id = session.rows[0].user_id;

  const user = await pool.query(
    "SELECT id, email, created_at FROM users WHERE id = $1",
    [user_id],
  );

  if (user.rows.length === 0) {
    throw new Error("USER DOES NOT EXIST");
  }

  return user.rows[0];
}
