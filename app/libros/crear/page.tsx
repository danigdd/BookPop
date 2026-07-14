export default async function CreateBookPage() {
  return (
    <form method="POST" action="/api/books">
      <label>Nombre del libro</label>
      <input placeholder="Nombre..." id="title" name="title"></input>
      <button type="submit">Crear</button>
    </form>
  );
}
