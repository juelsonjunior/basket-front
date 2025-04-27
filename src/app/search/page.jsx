"use client";
import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";
import { useSearch } from "@/context/searchContext";
import Link from "next/link";

export default function SearchPage() {
  const { results } = useSearch(); // Obtém os resultados do contexto

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="bg-white p-4 w-full max-w-md rounded-md">
        <Search />
      </div>
      <h1 className="text-2xl font-bold text-center text-white">
        {results.length > 0
          ? "Resultados encontrados:"
          : "Nenhum jogador encontrado"}
      </h1>
      <div className="flex flex-col gap-5 w-full">
        {results.length > 0 ? (
          results.map((player, index) => (
            <div
              key={index}
              className="p-2 bg-white rounded-lg shadow-lg flex justify-between items-center gap-6 w-full"
            >
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-black"></div>
                <div>
                  <p className="text-xs">Nome: {player.nome}</p>
                  <p className="text-xs">Equipa: {player.equipe}</p>
                </div>
              </div>
              <Link href={`/profile?id=${player.id}`}>
                <Button className="cursor-pointer px-6 py-3" type="button">
                  Perfil
                </Button>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-white text-center">Tente pesquisar outro nome.</p>
        )}
      </div>
    </div>
  );
}
