"use client";
import { createContext, useContext, useState } from "react";
import axios from "axios";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]);

  const searchPlayers = async (query) => {
    try {
      const response = await axios.post("basket-api-info.up.railway.app/search", {
        q: query,
      });

      if (response.status === 200) {
        setResults(response.data); // Atualiza os resultados no contexto
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