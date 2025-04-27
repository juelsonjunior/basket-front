"use client";
import { useState } from "react";
import { useSearch } from "@/context/searchContext";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  const [searchData, setSearchData] = useState("");
  const { searchPlayers } = useSearch();

  const handleSearch = async () => {
    await searchPlayers(searchData); // Realiza a pesquisa usando o contexto // Redireciona para a página de resultados
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex gap-3 w-full max-w-md">
        <Input
          type="text"
          placeholder="Pesquisar jogador"
          value={searchData}
          onChange={(e) => setSearchData(e.target.value)}
          className="flex-1 p-2 border-2 rounded-md"
        />
        <Button
          className="cursor-pointer px-6 py-3"
          type="button"
          onClick={handleSearch}
        >
          Pesquisar
        </Button>
      </div>
    </div>
  );
}
