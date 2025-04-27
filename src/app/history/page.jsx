"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HistoryPage() {
  const [history, setHistory] = useState([]); // Estado para armazenar o histórico

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("http://localhost:3001/history");
        if (response.ok) {
          const data = await response.json();
          setHistory(data); // Atualiza o estado com os dados do histórico
        } else {
          console.error("Erro ao buscar o histórico");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-5 w-full">
      <h1 className="text-2xl font-bold text-center text-white">
        Histórico de Pesquisa
      </h1>
      <div className="flex flex-col gap-5 w-full">
        {history.length > 0 ? (
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
                  Perfil {player.id}
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
