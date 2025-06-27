import { NextRequest, NextResponse } from 'next/server';
import { toggleTodo, deleteTodo } from '@/lib/mockData';

// let mockTodos = [
//   { _id: '1', text: 'go shopping', completed: false },
//   { _id: '2', text: 'read book', completed: true },
// ]

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  toggleTodo(id);
  return NextResponse.json({ message: 'updated' })
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  deleteTodo(id);
  return NextResponse.json({ message: 'deleted' });
}
