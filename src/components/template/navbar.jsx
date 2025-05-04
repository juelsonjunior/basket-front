import Link from "next/link";

export function Navbar() {
  return (
    <>
      <nav className="flex items-center justify-between bg-white text-black h-10 py-6 max-w-[1000px] w-full mx-auto">
        <div className="text-1xl font-bold uppercase">Basket info</div>
        <ul className="flex space-x-8">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/search">Pesquisar</Link>
          </li>
          <li>
            <Link href="/history">Histórico</Link>
          </li>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}
