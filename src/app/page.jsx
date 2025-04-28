export default function Home() {
  return (
    <div
      className="flex items-center justify-center"
      style={{ minHeight: "calc(100vh - 5.5rem)" }}
    >
      <div className="flex flex-col gap-6 items-center justify-center w-full p-8 bg-white rounded-lg shadow-lg text-center text-gray-800">
        <h1 className="text-3xl font-bold">Bem-vindo ao Basket System!</h1>
        <p className="text-lg">
          O Basket System é uma plataforma dedicada a jogadores de basquete. Aqui você pode:
        </p>
        <ul className="list-disc list-inside text-left">
          <li>Pesquisar jogadores e visualizar seus perfis detalhados.</li>
          <li>Explorar conquistas e histórias de atletas.</li>
        </ul>
        <p className="text-lg">
          Comece agora mesmo pesquisando por um jogador ou explorando as funcionalidades do sistema!
        </p>
      </div>
    </div>
  );
}
