"use client";
import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";
import { API_ROUTES } from "@/config/api";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]); // Armazena os resultados da pesquisa
  const [loading, setLoading] = useState(false); // Indica o estado de carregamento

  const searchPlayers = async (query) => {
    setLoading(true); // Inicia o carregamento
    try {
      const response = await axios.post(API_ROUTES.players.search, {
        q: query,
      });

      if (response.data.success) {
        if (response.data.data.length === 0) {
          // Caso nenhum jogador seja encontrado
          setResults([]); // Atualiza os resultados para um array vazio
          toast("Nenhum jogador encontrado."); // Exibe mensagem de aviso
        } else {
          setResults(response.data.data); // Atualiza os resultados no contexto
          toast.success("Jogadores encontrados com sucesso!"); // Exibe mensagem de sucesso
        }
      } else {
        setResults([]);
        toast.error(response.data.error || "Erro ao buscar jogadores");
      }
    } catch (error) {
      setResults([]); // Garante que os resultados sejam limpos em caso de erro
      if (error.response?.data?.error) {
        toast.error(error.response.data.error);
      } else {
        toast.error("Erro ao buscar jogadores: " + error.message);
      }
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Memoriza os valores do contexto para evitar re-renderizações desnecessárias
  const value = useMemo(
    () => ({
      results,
      loading,
      searchPlayers,
    }),
    [results, loading]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch deve ser usado dentro de um SearchProvider");
  }
  return context;
}
