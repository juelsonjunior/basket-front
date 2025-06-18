import mongoose from 'mongoose';

const PlayerSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: [true, 'Nome é obrigatório'],
  },
  idade: {
    type: Number,
    required: [true, 'Idade é obrigatória'],
  },
  localizacao: {
    type: String,
    required: [true, 'Localização é obrigatória'],
  },
  equipe: {
    type: String,
    required: [true, 'Equipe é obrigatória'],
  },
  hobbies: {
    type: [String],
    default: [],
  },
  historia: {
    type: String,
    default: '',
  },
  conquistas: {
    type: [String],
    default: [],
  },
}, {
  timestamps: true,
});

const Player = mongoose.models.Player || mongoose.model('Player', PlayerSchema);

export default Player; 