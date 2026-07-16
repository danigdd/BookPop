import pool from "@/lib/db";
import bcrypt from "bcryptjs";
//import { createSession } from "./sessionsService";
import jwt, { JwtPayload } from "jsonwebtoken";

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
    "SELECT id, role FROM users WHERE email = $1",
    [userData.email],
  );
  const user = correctResult.rows[0];

  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("TOKEN NOT DEFINED");
  }
  //CHANGE TO JWT AUTH
  const jwtToken = jwt.sign(user, secret);
  return {
    jwtToken,
  };
}

export async function requireAuth(jwtToken: string | null) {
  if (!jwtToken) {
    throw new Error("TOKEN NOT EXISTS");
  }
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("TOKEN NOT DEFINED");
  }

  const payload = jwt.verify(jwtToken, secret);
  console.log(payload);
  return payload;
}
