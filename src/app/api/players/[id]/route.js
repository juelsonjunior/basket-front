import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Player from '@/models/Player';

// Atualizar jogador
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = params;
    const updates = await request.json();

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do jogador não fornecido' },
        { status: 400 }
      );
    }

    const updatedPlayer = await Player.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedPlayer) {
      return NextResponse.json(
        { success: false, error: 'Jogador não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPlayer });
  } catch (error) {
    console.error('Erro ao atualizar jogador:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao atualizar jogador' },
      { status: 500 }
    );
  }
}

// Deletar jogador
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { success: false, error: 'ID do jogador não fornecido' },
        { status: 400 }
      );
    }

    const deletedPlayer = await Player.findByIdAndDelete(id);
    
    if (!deletedPlayer) {
      return NextResponse.json(
        { success: false, error: 'Jogador não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Jogador eliminado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao deletar jogador:', error);
    return NextResponse.json(
      { success: false, error: 'Erro ao deletar jogador' },
      { status: 500 }
    );
  }
} 