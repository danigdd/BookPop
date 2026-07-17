import crypto from "crypto";
import pool from "@/lib/db";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

export async function createRefreshToken(user: { id: string; role: string }) {
  const refreshToken = crypto.randomBytes(32).toString("hex");

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await pool.query(
    "INSERT INTO refresh_tokens(token_hash, user_id, expires_at) VALUES ($1, $2, $3)",
    [hashedToken, user.id, expiresAt],
  );
  return refreshToken;
}

export async function getRefreshToken(refreshToken: string) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  const result = await pool.query(
    "SELECT user_id, expires_at, revoked FROM refresh_tokens WHERE token_hash = $1",
    [hashedToken],
  );

  return result.rows[0];
}

export async function revokeRefreshToken(refreshToken: string) {
  const hashedToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");
  await pool.query(
    "UPDATE refresh_tokens SET revoked = TRUE WHERE token_hash = $1 ",
    [hashedToken],
  );
}
