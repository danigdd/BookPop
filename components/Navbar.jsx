import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">Inicio</Link>
      {" | "}
      <Link href="/libros">Libros</Link>
      {" | "}
      <Link href="/login">Iniciar sesión</Link>
      {" | "}
      <Link href="/register">Registrarse</Link>
      {" | "}
      <LogoutButton></LogoutButton>
    </nav>
  );
}
