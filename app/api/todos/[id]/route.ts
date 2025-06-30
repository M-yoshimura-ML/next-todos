import { NextRequest, NextResponse } from 'next/server';
import { toggleTodo, deleteTodo } from '@/lib/mockData';
import mongoDBClient from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const DB_NAME = 'next-todos';
const COLLECTION_NAME = 'todos';

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await mongoDBClient;
  const db = client.db(DB_NAME);

  const todos = db.collection(COLLECTION_NAME);
  const todo = await todos.findOne({ _id: new ObjectId(id) });
  if(!todo) return NextResponse.json({ error: 'Not Found' }, { status: 404 });
  //toggleTodo(id);
  await todos.updateOne({ _id: new ObjectId(id) }, { $set: { completed: !todo.completed } });
  return NextResponse.json({ message: 'updated' });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const client = await mongoDBClient;
  const db = client.db(DB_NAME);

  const todos = await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });
  //deleteTodo(id);
  return NextResponse.json({ message: 'deleted' });
}
