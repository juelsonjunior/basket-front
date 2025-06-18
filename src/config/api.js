// Configuração da API
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const API_ROUTES = {
  players: {
    list: `${API_BASE_URL}/api/players`,
    search: `${API_BASE_URL}/api/players/search`,
    create: `${API_BASE_URL}/api/players`,
    update: (id) => `${API_BASE_URL}/api/players/${id}`,
    delete: (id) => `${API_BASE_URL}/api/players/${id}`,
  },
  history: {
    list: `${API_BASE_URL}/api/history`,
    save: `${API_BASE_URL}/api/history`,
  },
}; 