"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DataPlayers({ player }) {
  return (
    <div className="p-2 bg-white rounded-lg shadow-lg flex justify-between items-center gap-6">
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
  );
}