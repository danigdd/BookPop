"use client";
import { redirect } from "next/navigation";
export default function LogoutButton() {
  async function handleLogout() {
    await fetch(`/api/auth/logout`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    redirect("/");
  }

  return (
    <form action={handleLogout}>
      <button type="submit">Logout</button>
    </form>
  );
}
