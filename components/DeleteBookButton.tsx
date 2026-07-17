"use client";
import { DeleteBookButtonProps } from "@/types/book";
import { apiFetch } from "@/utils/fetch";
import { useRouter } from "next/navigation";

export default function DeleteBookButton({ id }: DeleteBookButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    await apiFetch(`/api/books/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return <button onClick={handleDelete}>Eliminar</button>;
}
