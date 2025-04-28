"use client";
import { DataPlayers } from "@/components/dataPlayers";
import { Search } from "@/components/search";
import { useSearch } from "@/context/searchContext";

export default function SearchPage() {
  const { results, loading } = useSearch(); // Obtém os resultados e o estado de carregamento do contexto

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Componente de busca */}
      <div className="bg-white p-4 w-full max-w-md rounded-md">
        <Search />
      </div>

      {/* Título dinâmico */}
      <h1 className="text-2xl font-bold text-center text-white">
        {loading
          ? "Carregando resultados..."
          : results.length > 0
          ? "Resultados encontrados:"
          : "Nenhum jogador encontrado"}
      </h1>

      {/* Lista de resultados */}
      <div className="flex flex-col gap-5 w-full">
        {loading ? (
          <div className="text-center text-white">Carregando...</div>
        ) : results.length > 0 ? (
          results.map((player, index) => (
            <DataPlayers key={index} player={player} />
          ))
        ) : null}
      </div>
    </div>
  );
}
