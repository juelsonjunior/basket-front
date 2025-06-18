"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { API_ROUTES } from "@/config/api";
import { toast } from "sonner";

export function PlayersTable() {
  const [players, setPlayers] = useState([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    localizacao: "",
    equipe: "",
    hobbies: [],
    historia: "",
    conquistas: [],
  });
  const [novaConquista, setNovaConquista] = useState("");
  const [editingConquista, setEditingConquista] = useState({ index: -1, value: "" });
  const [novoHobbie, setNovoHobbie] = useState("");
  const [editingHobbie, setEditingHobbie] = useState({ index: -1, value: "" });

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const response = await axios.get(API_ROUTES.players.list);
      if (response.data.success) {
        // Ordena os jogadores por data de criação em ordem decrescente
        const sortedPlayers = [...response.data.data].sort((a, b) => {
          const dateA = new Date(a.createdAt || a.updatedAt);
          const dateB = new Date(b.createdAt || b.updatedAt);
          return dateB - dateA;
        });
        setPlayers(sortedPlayers);
      } else {
        toast.error('Erro ao carregar jogadores');
      }
    } catch (error) {
      console.error('Erro ao buscar jogadores:', error);
      toast.error('Erro ao carregar jogadores');
    }
  };

  const handleAddPlayer = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(API_ROUTES.players.create, formData);
      if (response.data.success) {
        toast.success('Jogador cadastrado com sucesso!');
        // Adiciona o novo jogador no início da lista
        setPlayers(prevPlayers => [response.data.data, ...prevPlayers]);
        resetForm();
      } else {
        toast.error(response.data.error || 'Erro ao cadastrar jogador');
      }
    } catch (error) {
      console.error('Erro ao cadastrar jogador:', error);
      toast.error('Erro ao cadastrar jogador');
    }
  };

  const handleUpdatePlayer = async () => {
    if (!selectedPlayer) return;

    try {
      const response = await axios.put(
        API_ROUTES.players.update(selectedPlayer._id),
        formData
      );
      if (response.data.success) {
        toast.success("Jogador atualizado com sucesso!");
        setIsEditDialogOpen(false);
        fetchPlayers();
        resetForm();
      } else {
        toast.error(response.data.error || "Erro ao atualizar jogador");
      }
    } catch (error) {
      console.error("Erro ao atualizar jogador:", error);
      toast.error(error.response?.data?.error || "Erro ao atualizar jogador");
    }
  };

  const handleDeletePlayer = async (id) => {
    if (!confirm("Tem certeza que deseja excluir este jogador?")) return;

    try {
      const response = await axios.delete(API_ROUTES.players.delete(id));
      if (response.data.success) {
        toast.success("Jogador excluído com sucesso!");
        fetchPlayers();
      } else {
        toast.error(response.data.error || "Erro ao excluir jogador");
      }
    } catch (error) {
      console.error("Erro ao excluir jogador:", error);
      toast.error(error.response?.data?.error || "Erro ao excluir jogador");
    }
  };

  const resetForm = () => {
    setFormData({
      nome: "",
      idade: "",
      localizacao: "",
      equipe: "",
      hobbies: [],
      historia: "",
      conquistas: [],
    });
    setSelectedPlayer(null);
  };

  const handleAddConquista = () => {
    if (novaConquista.trim()) {
      setFormData(prev => ({
        ...prev,
        conquistas: [...prev.conquistas, novaConquista.trim()]
      }));
      setNovaConquista("");
    }
  };

  const handleRemoveConquista = (index) => {
    setFormData(prev => ({
      ...prev,
      conquistas: prev.conquistas.filter((_, i) => i !== index)
    }));
  };

  const handleEditConquista = (index) => {
    setEditingConquista({ index, value: formData.conquistas[index] });
  };

  const handleSaveConquista = () => {
    if (editingConquista.value.trim()) {
      setFormData(prev => ({
        ...prev,
        conquistas: prev.conquistas.map((conquista, index) =>
          index === editingConquista.index ? editingConquista.value.trim() : conquista
        )
      }));
      setEditingConquista({ index: -1, value: "" });
    }
  };

  const handleCancelEdit = () => {
    setEditingConquista({ index: -1, value: "" });
  };

  const handleAddHobbie = () => {
    if (novoHobbie.trim()) {
      setFormData(prev => ({
        ...prev,
        hobbies: [...prev.hobbies, novoHobbie.trim()]
      }));
      setNovoHobbie("");
    }
  };

  const handleRemoveHobbie = (index) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.filter((_, i) => i !== index)
    }));
  };

  const handleEditHobbie = (index) => {
    setEditingHobbie({ index, value: formData.hobbies[index] });
  };

  const handleSaveHobbie = () => {
    if (editingHobbie.value.trim()) {
      setFormData(prev => ({
        ...prev,
        hobbies: prev.hobbies.map((hobbie, index) =>
          index === editingHobbie.index ? editingHobbie.value.trim() : hobbie
        )
      }));
      setEditingHobbie({ index: -1, value: "" });
    }
  };

  const handleCancelEditHobbie = () => {
    setEditingHobbie({ index: -1, value: "" });
  };

  // Cálculo da paginação
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPlayers = players.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(players.length / itemsPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const openEditDialog = (player) => {
    setSelectedPlayer(player);
    setFormData({
      nome: player.nome,
      idade: player.idade,
      localizacao: player.localizacao,
      equipe: player.equipe,
      hobbies: player.hobbies,
      historia: player.historia,
      conquistas: player.conquistas || [],
    });
    setIsEditDialogOpen(true);
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const ConquistasList = ({ conquistas, onEdit, onRemove, editingConquista, onSave, onCancel }) => {
    const [localValue, setLocalValue] = useState(editingConquista.value);

    useEffect(() => {
      setLocalValue(editingConquista.value);
    }, [editingConquista.value]);

    const handleLocalChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleLocalSave = () => {
      setEditingConquista(prev => ({ ...prev, value: localValue }));
      onSave();
    };

    return (
      <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto">
        {conquistas.map((conquista, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            {editingConquista.index === index ? (
              <div className="flex-1 flex gap-2">
                <Input
                  value={localValue}
                  onChange={handleLocalChange}
                  className="flex-1"
                />
                <Button type="button" size="sm" onClick={handleLocalSave}>
                  Salvar
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <>
                <span className="flex-1">{conquista}</span>
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(index)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                  >
                    Remover
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  const HobbiesList = ({ hobbies, onEdit, onRemove, editingHobbie, onSave, onCancel }) => {
    const [localValue, setLocalValue] = useState(editingHobbie.value);

    useEffect(() => {
      setLocalValue(editingHobbie.value);
    }, [editingHobbie.value]);

    const handleLocalChange = (e) => {
      setLocalValue(e.target.value);
    };

    const handleLocalSave = () => {
      setEditingHobbie(prev => ({ ...prev, value: localValue }));
      onSave();
    };

    return (
      <div className="mt-2 space-y-2 max-h-[200px] overflow-y-auto">
        {hobbies.map((hobbie, index) => (
          <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
            {editingHobbie.index === index ? (
              <div className="flex-1 flex gap-2">
                <Input
                  value={localValue}
                  onChange={handleLocalChange}
                  className="flex-1"
                />
                <Button type="button" size="sm" onClick={handleLocalSave}>
                  Salvar
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
                  Cancelar
                </Button>
              </div>
            ) : (
              <>
                <span className="flex-1">{hobbie}</span>
                <div className="space-x-2">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(index)}
                  >
                    Editar
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemove(index)}
                  >
                    Remover
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Jogadores</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (open) {
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>Adicionar Jogador</Button>
          </DialogTrigger>
          <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Jogador</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleAddPlayer} className="space-y-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="idade">Idade</Label>
                <Input
                  id="idade"
                  name="idade"
                  type="number"
                  value={formData.idade}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="localizacao">Localização</Label>
                <Input
                  id="localizacao"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="equipe">Equipe</Label>
                <Input
                  id="equipe"
                  name="equipe"
                  value={formData.equipe}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="historia">História</Label>
                <Textarea
                  id="historia"
                  name="historia"
                  value={formData.historia}
                  onChange={handleInputChange}
                  className="min-h-[100px]"
                />
              </div>
              <div>
                <Label>Conquistas</Label>
                <div className="flex gap-2">
                  <Input
                    value={novaConquista}
                    onChange={(e) => setNovaConquista(e.target.value)}
                    placeholder="Nova conquista"
                  />
                  <Button type="button" onClick={handleAddConquista}>
                    Adicionar
                  </Button>
                </div>
                <ConquistasList
                  conquistas={formData.conquistas}
                  onEdit={handleEditConquista}
                  onRemove={handleRemoveConquista}
                  editingConquista={editingConquista}
                  onSave={handleSaveConquista}
                  onCancel={handleCancelEdit}
                />
              </div>
              <div>
                <Label>Hobbies</Label>
                <div className="flex gap-2">
                  <Input
                    value={novoHobbie}
                    onChange={(e) => setNovoHobbie(e.target.value)}
                    placeholder="Novo hobbie"
                  />
                  <Button type="button" onClick={handleAddHobbie}>
                    Adicionar
                  </Button>
                </div>
                <HobbiesList
                  hobbies={formData.hobbies}
                  onEdit={handleEditHobbie}
                  onRemove={handleRemoveHobbie}
                  editingHobbie={editingHobbie}
                  onSave={handleSaveHobbie}
                  onCancel={handleCancelEditHobbie}
                />
              </div>
              <Button type="submit">Salvar</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Idade</TableHead>
            <TableHead>Localização</TableHead>
            <TableHead>Equipe</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPlayers.map((player) => (
            <TableRow key={player._id}>
              <TableCell>{player.nome}</TableCell>
              <TableCell>{player.idade}</TableCell>
              <TableCell>{player.localizacao}</TableCell>
              <TableCell>{player.equipe}</TableCell>
              <TableCell className="space-x-2">
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      onClick={() => openEditDialog(player)}
                    >
                      Editar
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Editar Jogador</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleUpdatePlayer} className="space-y-4">
                      <div>
                        <Label htmlFor="edit-nome">Nome</Label>
                        <Input
                          id="edit-nome"
                          name="nome"
                          value={formData.nome}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-idade">Idade</Label>
                        <Input
                          id="edit-idade"
                          name="idade"
                          type="number"
                          value={formData.idade}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-localizacao">Localização</Label>
                        <Input
                          id="edit-localizacao"
                          name="localizacao"
                          value={formData.localizacao}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-equipe">Equipe</Label>
                        <Input
                          id="edit-equipe"
                          name="equipe"
                          value={formData.equipe}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-historia">História</Label>
                        <Textarea
                          id="edit-historia"
                          name="historia"
                          value={formData.historia}
                          onChange={handleInputChange}
                          className="min-h-[100px]"
                        />
                      </div>
                      <div>
                        <Label>Conquistas</Label>
                        <div className="flex gap-2">
                          <Input
                            value={novaConquista}
                            onChange={(e) => setNovaConquista(e.target.value)}
                            placeholder="Nova conquista"
                          />
                          <Button type="button" onClick={handleAddConquista}>
                            Adicionar
                          </Button>
                        </div>
                        <ConquistasList
                          conquistas={formData.conquistas}
                          onEdit={handleEditConquista}
                          onRemove={handleRemoveConquista}
                          editingConquista={editingConquista}
                          onSave={handleSaveConquista}
                          onCancel={handleCancelEdit}
                        />
                      </div>
                      <div>
                        <Label>Hobbies</Label>
                        <div className="flex gap-2">
                          <Input
                            value={novoHobbie}
                            onChange={(e) => setNovoHobbie(e.target.value)}
                            placeholder="Novo hobbie"
                          />
                          <Button type="button" onClick={handleAddHobbie}>
                            Adicionar
                          </Button>
                        </div>
                        <HobbiesList
                          hobbies={formData.hobbies}
                          onEdit={handleEditHobbie}
                          onRemove={handleRemoveHobbie}
                          editingHobbie={editingHobbie}
                          onSave={handleSaveHobbie}
                          onCancel={handleCancelEditHobbie}
                        />
                      </div>
                      <Button type="submit">Salvar Alterações</Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant="destructive"
                  onClick={() => handleDeletePlayer(player._id)}
                >
                  Eliminar
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Paginação */}
      <div className="flex justify-center items-center gap-2 mt-4">
        <Button
          variant="outline"
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Anterior
        </Button>
        <span className="text-sm">
          Página {currentPage} de {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Próximo
        </Button>
      </div>
    </div>
  );
} 