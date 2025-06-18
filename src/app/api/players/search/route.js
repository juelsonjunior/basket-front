import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Player from '@/models/Player';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const query = body.q?.toLowerCase();

    if (!query) {
      return NextResponse.json(
        { 
          success: false, 
          error: "Por favor, forneça um parâmetro 'q' no corpo da requisição." 
        },
        { status: 400 }
      );
    }

    const players = await Player.find({
      nome: { $regex: query, $options: "i" },
    }).sort({ nome: 1 });

    return NextResponse.json({
      success: true,
      data: players,
      count: players.length
    });
  } catch (error) {
    console.error('Erro ao buscar jogadores:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao buscar jogadores' },
      { status: 500 }
    );
  }
} 