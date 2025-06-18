import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Player from '@/models/Player';

// Listar todos os jogadores
export async function GET() {
  try {
    await connectDB();
    const players = await Player.find().sort({ nome: 1 });
    return NextResponse.json({ success: true, data: players });
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar jogadores' },
      { status: 500 }
    );
  }
}

// Criar novo jogador
export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { nome, idade, localizacao, equipe, hobbies, historia, conquistas } = body;

    if (!nome || !idade || !localizacao || !equipe) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Os campos 'nome', 'idade', 'localizacao' e 'equipe' são obrigatórios." 
        },
        { status: 400 }
      );
    }

    const newPlayer = new Player({
      nome,
      idade,
      localizacao,
      equipe,
      hobbies: hobbies || [],
      historia: historia || "",
      conquistas: conquistas || [],
    });

    const savedPlayer = await newPlayer.save();
    return NextResponse.json(
      { success: true, data: savedPlayer },
      { status: 201 }
    );
  } catch (error) {
    console.error('Erro ao criar jogador:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao criar jogador' },
      { status: 500 }
    );
  }
} 