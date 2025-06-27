import { NextResponse } from 'next/server';
import { mockTodos, addTodo } from '@/lib/mockData';

// let mockTodos = [
//   { _id: '1', text: 'go shopping', completed: false },
//   { _id: '2', text: 'read book', completed: true },
// ]

export async function GET() {
  return NextResponse.json(mockTodos)
}

export async function POST(req: Request) {
  const { text } = await req.json()
  const newTodo = addTodo(text);
  return NextResponse.json(newTodo);
}
