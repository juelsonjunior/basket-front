import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function Search() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 w-full">
      <div className="flex gap-3 w-full max-w-md">
        <Input
          type="email"
          placeholder="Pesquisar jogador"
          className="flex-1 p-2 border-2 rounded-md"
        />
        <Button className="cursor-pointer px-6 py-3" type="submit">
          Pesquisar
        </Button>
      </div>
    </div>
  );
}
