import pool from "@/lib/db";
import bcrypt from "bcryptjs";
import { createSession } from "./sessionsService";
import { getSessionUser } from "./sessionsService";

export async function registerUserService(userData: {
  email: string;
  password: string;
}) {
  console.log(userData);
  const hashedPassword = await bcrypt.hash(userData.password, 8);
  const result = await pool.query(
    "INSERT INTO users(email, password_hash) VALUES ($1, $2) RETURNING id, email",
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

  const fakeHash =
    "$2b$08$WZC4ubhriOeskXIJMPq0ee1Sw6uXPTiOFc8PPLMklaPG4VzktJQgm";
  const hashStored = result.rows[0]?.password_hash ?? fakeHash;

  const passwordCorrect = await bcrypt.compare(userData.password, hashStored);
  if (!passwordCorrect || !result.rows[0]) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const correctResult = await pool.query(
    "SELECT id, email, created_at FROM users WHERE email = $1",
    [userData.email],
  );
  const user = correctResult.rows[0];

  const session = await createSession(user.id);
  return {
    sessionId: session.session_id,
  };
}

export async function requireAuth(tokenId: string | null) {
  const user = await getSessionUser(tokenId);
  return user.role == "admin";
}
