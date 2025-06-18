import mongoose from 'mongoose';

const HistorySchema = new mongoose.Schema({
  id: {
    type: String,
    required: [true, 'ID é obrigatório'],
  },
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  equipe: {
    type: String,
    required: [true, 'Equipe é obrigatória'],
  },
  userId: {
    type: String,
    required: [true, 'UserId é obrigatório'],
  },
}, {
  timestamps: true,
});

const History = mongoose.models.History || mongoose.model('History', HistorySchema);

export default History; 