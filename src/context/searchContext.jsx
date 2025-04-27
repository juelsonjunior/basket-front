"use client";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]);

  const searchPlayers = async (query) => {
    try {
      const response = await fetch("basket-api-info.up.railway.app/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ q: query }),
      });

      if (response.ok) {
        const data = await response.json();
        setResults(data); // Atualiza os resultados no contexto
      } else {
        console.error("Erro ao buscar jogadores");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <SearchContext.Provider value={{ results, searchPlayers }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}