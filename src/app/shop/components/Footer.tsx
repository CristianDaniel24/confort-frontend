export default function Footer() {
  return (
    <footer className=" border-t text-center py-4 text-sm text-gray-600 bg-white dark:bg-zinc-900">
      © {new Date().getFullYear()} Tapiceria Confort. Todos los derechos
      reservados.
    </footer>
  );
}
