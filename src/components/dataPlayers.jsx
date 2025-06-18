"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { API_ROUTES } from "@/config/api";
import { toast } from "sonner";

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
      // Prepara os dados do jogador no formato correto
      const playerData = {
        id: player._id || player.id, // Usa _id se disponível, senão usa id
        nome: player.nome,
        equipe: player.equipe,
      };

      const response = await axios.post(API_ROUTES.history.save, {
        players: [playerData],
        userId: resolvedUserId,
      });

      if (response.data.success) {
        toast.success("Jogador salvo no histórico com sucesso!");
      } else {
        toast.error(response.data.error || "Erro ao salvar no histórico");
      }
    } catch (error) {
      console.error("Erro ao salvar no histórico:", error);
      toast.error(error.response?.data?.error || "Erro ao salvar no histórico");
    }
  };

  const handleProfileClick = async () => {
    await handleSaveHistory();
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
