"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { DataPlayers } from "@/components/dataPlayers";

export default function HistoryPage() {
  const [history, setHistory] = useState([]); // Estado para armazenar o histórico
  const [loading, setLoading] = useState(true); // Estado para indicar carregamento

  // Função para buscar o histórico, otimizada com useCallback
  const fetchHistory = useCallback(async () => {
    setLoading(true); // Inicia o carregamento
    try {
      const response = await axios.get("http://localhost:3001/history");
      if (response.status === 200) {
        setHistory(response.data); // Atualiza o estado com os dados do histórico
      } else {
        toast.error("Erro ao buscar o histórico."); // Exibe mensagem de erro genérica
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Exibe a mensagem de erro retornada pela API
        toast.error(error.response.data.error);
      } else {
        // Exibe uma mensagem genérica de erro
        toast.error("Erro na requisição: " + error.message);
      }
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  }, []);

  // useEffect para buscar o histórico ao carregar o componente
  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <h1 className="text-2xl font-bold text-center text-white">
        Histórico de Pesquisa
      </h1>
      <div className="flex flex-col gap-5 w-full">
        {loading ? (
          <div className="text-center text-white">Carregando histórico...</div>
        ) : history.length > 0 ? (
          history.map((player, index) => (
            <DataPlayers key={index} player={player} />
          ))
        ) : (
          <p className="text-white text-center">Nenhum histórico encontrado.</p>
        )}
      </div>
    </div>
  );
}
