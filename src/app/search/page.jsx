import { Search } from "@/components/search";
import { Button } from "@/components/ui/button";

export default function SearchPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="bg-white p-4 w-full max-w-md rounded-md">
        <Search />
      </div>
      <h1 className="text-2xl font-bold text-center text-white">
        Resultados encontrados:
      </h1>
      <div className="flex flex-col gap-5 w-full">
        {[1, 2].map((_, index) => (
          <div
            key={index}
            className="p-2 bg-white rounded-lg shadow-lg flex justify-between items-center gap-6 w-full"
          >
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-black"></div>
              <div>
                <p className="text-xs">Nome: Juelson Júnior</p>
                <p className="text-xs">Time: Waipos Time</p>
              </div>
            </div>
            <Button className="cursor-pointer px-6 py-3" type="submit">
              Perfil
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
