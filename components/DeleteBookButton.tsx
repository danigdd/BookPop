"use client";
import { DeleteBookButtonProps } from "@/types/book";

export default function DeleteBookButton({ id }: DeleteBookButtonProps) {
  async function handleDelete() {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
  }
  return <button onClick={handleDelete}>Eliminar</button>;
}
