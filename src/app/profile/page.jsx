import { Calendar, MapPin, Star } from "lucide-react";

export default function ProfilePage() {
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
              <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 "></div>
            </div>
            {/* Informações do Usuário */}
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-center">LeBron James</h2>
              <p className="text-gray-600 mb-4 text-center">
                Jogador profissional de basquete, considerado um dos maiores de
                todos os tempos.
              </p>
              {/* Lista de Informações Adicionais */}
              <ul className="space-y-2 flex flex-col items-center md:block md:flex-row md:items-start">
                <li className="text-gray-700 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>Idade: 38 anos</span>
                </li>
                <li className="text-gray-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>Localização: Los Angeles, EUA</span>
                </li>
                <li className="text-gray-700 flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-500" />
                  <span>Hobbies: Basquete, cinema, filantropia</span>
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
            <p className="text-gray-700">
              LeBron James nasceu em Akron, Ohio, e começou a jogar basquete
              desde cedo. Ele foi destaque no ensino médio e entrou na NBA em
              2003, sendo selecionado pelo Cleveland Cavaliers. Ao longo de sua
              carreira, jogou pelos Miami Heat, Cleveland Cavaliers e Los
              Angeles Lakers, conquistando diversos títulos e prêmios.
            </p>
          </div>

          {/* Seção Conquistas */}
          <div className="bg-white text-gray-900 rounded-lg shadow p-6 flex-grow">
            <h3 className="text-xl font-semibold mb-2">Conquistas</h3>
            <p className="text-gray-700">
              - 4 vezes campeão da NBA
              <br />
              - 4 vezes MVP da temporada regular
              <br />
              - 2 medalhas de ouro olímpicas
              <br />- Mais de 38.000 pontos na carreira, sendo um dos maiores
              pontuadores da história da NBA
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
