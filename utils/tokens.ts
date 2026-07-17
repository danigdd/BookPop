import jwt from "jsonwebtoken";

export function createJWT(payload: Record<string, unknown>) {
  const secret = process.env.ACCESS_TOKEN_SECRET;
  if (!secret) {
    throw new Error("TOKEN_NOT_DEFINED");
  }
  const jwt_token = jwt.sign(payload, secret, {
    expiresIn: "900s",
  });
  return jwt_token;
}
