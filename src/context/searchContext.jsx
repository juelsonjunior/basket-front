"use client";
import { createContext, useContext, useState, useMemo } from "react";
import axios from "axios";
import { toast } from "sonner";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false); // Estado para indicar carregamento

  const searchPlayers = async (query) => {
    setLoading(true); // Inicia o carregamento
    try {
      const response = await axios.post("http://localhost:3001/search", {
        q: query,
      });

      if (response.status === 200) {
        if (response.data.length === 0) {
          // Caso nenhum jogador seja encontrado
          setResults([]); // Atualiza os resultados para um array vazio
          toast("Nenhum jogador encontrado."); // Exibe mensagem de aviso
        } else {
          setResults(response.data); // Atualiza os resultados no contexto
          toast.success("Jogadores encontrados com sucesso!"); // Exibe mensagem de sucesso
        }
      } else {
        setResults([]); // Garante que os resultados sejam limpos em caso de erro
        toast.error("Erro ao buscar jogadores."); // Exibe mensagem de erro
      }
    } catch (error) {
      setResults([]); // Garante que os resultados sejam limpos em caso de erro
      toast.error("Erro na requisição: " + error.message); // Exibe mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  // Memoriza os valores do contexto para evitar re-renderizações desnecessárias
  const value = useMemo(
    () => ({
      results,
      searchPlayers,
      loading,
    }),
    [results, loading]
  );

  return (
    <SearchContext.Provider value={value}>{children}</SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
