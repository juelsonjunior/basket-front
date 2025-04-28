"use client";
import { DataPlayers } from "@/components/dataPlayers";
import { Search } from "@/components/search";
import { useSearch } from "@/context/searchContext";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export default function SearchPage() {
  const { results, loading } = useSearch(); // Obtém os resultados e o estado de carregamento do contexto
  const [currentPage, setCurrentPage] = useState(1); // Página atual
  const itemsPerPage = 5; // Número de registros por página

  // Calcula os dados da página atual
  const currentData = results.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Calcula o número total de páginas
  const totalPages = Math.ceil(results.length / itemsPerPage);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {/* Componente de busca */}
      <div className="bg-white p-4 w-full max-w-md rounded-md">
        <Search />
      </div>

      {/* Título dinâmico */}
      <h1 className="text-2xl font-bold text-center text-white">
        {loading
          ? "Carregando resultados..."
          : results.length > 0
          ? "Resultados encontrados:"
          : "Nenhum jogador encontrado"}
      </h1>

      {/* Lista de resultados */}
      <div className="flex flex-col gap-5 w-full">
        {loading ? (
          <div className="text-center text-white">Carregando...</div>
        ) : currentData.length > 0 ? (
          currentData.map((player, index) => (
            <DataPlayers key={index} player={player} />
          ))
        ) : (
          <p className="text-white text-center">Nenhum jogador encontrado.</p>
        )}
      </div>

      {/* Paginação */}
      {results.length > itemsPerPage && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
