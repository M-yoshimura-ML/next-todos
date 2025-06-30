import { NextResponse } from 'next/server';
import { mockTodos, addTodo } from '@/lib/mockData';
import mongoDBClient from '@/lib/mongodb';


const DB_NAME = 'next-todos';
const COLLECTION_NAME = 'todos';

export async function GET() {
  const client = await mongoDBClient;
  const db = client.db(DB_NAME);

  const todos = await db.collection(COLLECTION_NAME).find().toArray();

  const todosWithId = todos.map((todo) => ({
    _id: todo._id.toString(),
    text: todo.text,
    completed: todo.completed
  }));
  return NextResponse.json(todosWithId);
}

export async function POST(req: Request) {
  const client = await mongoDBClient;
  const db = client.db(DB_NAME);

  const { text } = await req.json();
  const newTodo = { text, completed: false };

  const result = await db.collection(COLLECTION_NAME).insertOne(newTodo);

  return NextResponse.json({
    _id: result.insertedId.toString(),
    ...newTodo,
  })

}
