"use client";
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { toast } from "sonner";

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
            <div
              key={index}
              className="p-2 bg-white rounded-lg shadow-lg flex justify-between items-center gap-6"
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
          <p className="text-white text-center">Nenhum histórico encontrado.</p>
        )}
      </div>
    </div>
  );
}
