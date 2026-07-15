"use client";
import { DeleteBookButtonProps } from "@/types/book";
import { useRouter } from "next/navigation";

export default function DeleteBookButton({ id }: DeleteBookButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return <button onClick={handleDelete}>Eliminar</button>;
}
