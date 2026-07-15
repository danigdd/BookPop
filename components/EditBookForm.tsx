"use client";
import { Book } from "@/types/book";
import { redirect } from "next/navigation";
export default function EditBookForm({ id, title }: Book) {
  async function handleEditBook(formData: FormData) {
    const newTitle = formData.get("title");
    await fetch(`/api/books/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    });
    redirect("/libros");
  }

  return (
    <form action={handleEditBook}>
      <label>Nombre nuevo del libro</label>
      <input defaultValue={`${title}...`} name="title"></input>
      <button type="submit">Confirmar cambios</button>
    </form>
  );
}
