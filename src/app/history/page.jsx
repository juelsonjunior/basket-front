"use client";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { DataPlayers } from "@/components/dataPlayers";
import { API_ROUTES } from "@/config/api";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_ROUTES.history.list);
      if (response.data.success) {
        setHistory(response.data.data);
      } else {
        toast.error(response.data.error || "Erro ao buscar o histórico");
      }
    } catch (error) {
      console.error("Erro ao buscar histórico:", error);
      toast.error(error.response?.data?.error || "Erro ao buscar o histórico");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  // Calcula o índice inicial e final para a paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(history.length / itemsPerPage);

  // Função para mudar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Histórico de Pesquisas</h1>

      {currentItems.length === 0 ? (
        <div className="text-center text-white py-8">
          Nenhum histórico encontrado.
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentItems.map((item, index) => (
              <DataPlayers
                key={index}
                player={item}
                userId={item.userId}
                history={history}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handlePageChange(currentPage - 1)}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index + 1}>
                    <PaginationLink
                      onClick={() => handlePageChange(index + 1)}
                      isActive={currentPage === index + 1}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handlePageChange(currentPage + 1)}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      )}
    </div>
  );
}
