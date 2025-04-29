"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { Calendar, MapPin, Star, Users } from "lucide-react";
import { useEffect, useMemo, Suspense } from "react";
import axios from "axios";
import { useSearch } from "@/context/searchContext";

function ProfileContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { results } = useSearch(); // Obtém os resultados do contexto
  const playerId = useMemo(() => searchParams.get("id"), [searchParams]); // Obtém o ID como string

  // Verifica se o jogador existe no contexto
  const player = useMemo(
    () => results.find((p) => p._id === playerId),
    [results, playerId]
  );

  useEffect(() => {
    if (!player) {
      router.push("/search"); // Redireciona para a página de pesquisa se o jogador não for encontrado
    } else {
      // Salva o jogador no histórico ao acessar o perfil
      axios
        .post("http://localhost:3001/save-history", {
          players: [player],
        })
        .catch((error) => {
          console.error("Erro ao salvar no histórico:", error);
        });
    }
  }, [player, router]);

  if (!player) {
    return <div>Carregando...</div>; // Exibe um fallback enquanto redireciona
  }

  return (
    <div
      className="flex flex-col items-center"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <div className="w-full max-w-4xl flex flex-1 flex-col md:grid md:grid-cols-3 gap-6">
        {/* Coluna Esquerda */}
        <div className="bg-white text-gray-900 rounded-lg shadow p-6 flex flex-col">
          <div className="flex flex-col items-center md:items-start">
            {/* Foto de Perfil */}
            <div className="w-full flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
            </div>
            {/* Informações do Usuário */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-center">{player.nome}</h2>
              <p className="text-gray-600 mb-4 text-center flex items-center gap-2 justify-center">
                <Users className="w-4 h-4 text-gray-500" />
                {player.equipe}
              </p>

              <div className="border w-full mt-5 mb-5"></div>

              {/* Lista de Informações Adicionais */}
              <ul className="space-y-2 flex flex-col items-center md:block md:flex-row md:items-start">
                <li className="text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Idade: {player.idade} anos</span>
                </li>
                <li className="text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Localização: {player.localizacao}</span>
                </li>
                <li className="text-gray-700 flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span>Hobbies: {player.hobbies.join(", ")}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Coluna Direita */}
        <div className="md:col-span-2 flex flex-col gap-6">
          {/* Seção História */}
          <div className="bg-white text-gray-900 rounded-lg shadow p-6 flex-grow">
            <h3 className="text-xl font-semibold mb-2">História</h3>
            <p className="text-gray-700">{player.historia}</p>
          </div>

          {/* Seção Conquistas */}
          <div className="bg-white text-gray-900 rounded-lg shadow p-6 flex-grow">
            <h3 className="text-xl font-semibold mb-2">Conquistas</h3>
            {player.conquistas.map((conquista, index) => (
              <p className="text-gray-700" key={index}>
                {conquista}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">Carregando...</div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}
