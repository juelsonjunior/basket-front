import { Search } from "@/components/search";

export default function Home() {
  return (
    <div className="flex items-center justify-center" style={{ minHeight: "calc(100vh - 5.5rem)" }}>
      <div className="flex flex-col gap-6 items-center justify-center w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center ">Pesquisar jogador</h1>
        <Search />
      </div>
    </div>
  );
}
