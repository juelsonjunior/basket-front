"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";

export function DataPlayers({ player, userId, history }) {
  // Determina o ID do usuário, priorizando o `userId` passado como prop
  const resolvedUserId = userId || player._id;

  // Verifica se o jogador já está no histórico
  const isAlreadyInHistory = history?.some(
    (item) => item.userId === resolvedUserId && item.nome === player.nome
  );

  const handleSaveHistory = async () => {
    if (isAlreadyInHistory) {
      console.log("Jogador já está no histórico. Nenhuma ação necessária.");
      return;
    }

    try {
      // Envia o jogador para a rota /save-history
      await axios.post("https://basket-api-info.up.railway.app/save-history", {
        players: [player],
        userId: resolvedUserId, // Usa o ID resolvido
      });
    } catch (error) {
      console.error("Erro ao salvar no histórico:", error);
    }
  };

  const handleProfileClick = async () => {
    await handleSaveHistory(); // Salva no histórico
  };

  return (
    <div className="p-2 bg-white rounded-lg shadow-lg flex justify-between items-center gap-6">
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 rounded-full bg-black"></div>
        <div>
          <p className="text-xs">Nome: {player.nome}</p>
          <p className="text-xs">Equipa: {player.equipe}</p>
        </div>
      </div>
      <Link href={`/profile?id=${resolvedUserId}`} onClick={() => handleProfileClick()}>
        <Button className="cursor-pointer px-6 py-3" type="button">
          Perfil
        </Button>
      </Link>
    </div>
  );
}
