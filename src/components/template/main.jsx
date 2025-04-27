import { Navbar } from "./navbar";

export function Main({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="px-4">
        <Navbar />
      </div>
      <main className="flex-grow bg-slate-800 p-4">
        <div className="max-w-[1000px] mx-auto">{children}</div>
      </main>
    </div>
  );
}
