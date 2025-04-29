"use client";
import { useState, useCallback } from "react";
import { useSearch } from "@/context/searchContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  const [searchData, setSearchData] = useState("");
  const { searchPlayers } = useSearch();

  // Função de pesquisa otimizada com useCallback para evitar recriações desnecessárias
  const handleSearch = useCallback(async () => {
    const trimmedQuery = searchData.trim();
    if (!trimmedQuery) {
      return; // Evita pesquisas vazias
    }
    await searchPlayers(trimmedQuery); // Realiza a pesquisa usando o contexto
  }, [searchData, searchPlayers]);

  // Função para lidar com a tecla Enter
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex gap-3 w-full max-w-md">
        <Input
          type="text"
          placeholder="Pesquisar jogador"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          onKeyDown={handleKeyDown} // Permite pesquisa ao pressionar Enter
          className="flex-1 p-2 border-2 rounded-md"
        />
        <Button
          className="cursor-pointer px-6 py-3"
          type="button"
          onClick={handleSearch}
          disabled={!searchData.trim()} // Desabilita o botão se o campo estiver vazio
        >
          Pesquisar
        </Button>
      </div>
    </div>
  );
}
