"use client";
import { redirect } from "next/navigation";

export default function LoginPage() {
  async function handleLogin(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");
    await fetch(`/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    redirect("/");
  }

  return (
    <form action={handleLogin}>
      <label>Correo</label>
      <input placeholder="email..." name="email" type="email"></input>
      <label>Contraseña</label>
      <input placeholder="password.." name="password" type="password"></input>
      <button type="submit">Iniciar sesion</button>
    </form>
  );
}
