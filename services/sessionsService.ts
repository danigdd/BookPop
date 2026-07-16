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
