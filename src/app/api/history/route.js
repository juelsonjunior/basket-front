import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import History from '@/models/History';

// Listar histórico
export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      query.userId = userId;
    }

    const history = await History.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: history });
  } catch (error) {
    console.error('Erro ao buscar histórico:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar histórico' },
      { status: 500 }
    );
  }
}

// Salvar histórico
export async function POST(request) {
  try {
    await connectDB();
    const { players, userId } = await request.json();

    if (!players || players.length === 0) {
      return NextResponse.json(
        { success: false, error: "Nenhum jogador fornecido para salvar no histórico." },
        { status: 400 }
      );
    }

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "O campo 'userId' é obrigatório." },
        { status: 400 }
      );
    }

    const savedEntries = [];
    for (const player of players) {
      // Verifica se o jogador já existe no histórico
      const exists = await History.findOne({
        id: player.id,
        userId: userId,
      });

      if (!exists) {
        try {
          const newEntry = await History.create({
            id: player.id,
            nome: player.nome,
            equipe: player.equipe,
            userId: userId,
          });
          savedEntries.push(newEntry);
        } catch (error) {
          console.error('Erro ao salvar entrada no histórico:', error);
          // Continua com o próximo jogador mesmo se houver erro
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Histórico salvo com sucesso",
      data: savedEntries,
      count: savedEntries.length
    });
  } catch (error) {
    console.error('Erro ao salvar histórico:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao salvar histórico' },
      { status: 500 }
    );
  }
} 