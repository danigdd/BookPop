import crypto from "crypto";
import pool from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function createRefreshToken(user: { id: string; role: string }) {
  const refreshToken = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const hashedToken = await bcrypt.hash(refreshToken, 8);

  await pool.query(
    "INSERT INTO refresh_tokens(token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
    [hashedToken, user.id, expiresAt],
  );
  return refreshToken;
}
