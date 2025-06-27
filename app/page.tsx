'use client'

import { useEffect, useState } from 'react';
import { ToDo } from '@/types/todo';
import TodoItem from '@/components/TodoItem';

export default function HomePage() {
  const [todos, setTodos] = useState<ToDo[]>([])
  const [text, setText] = useState('')

  // GET todos
  const fetchTodos = async () => {
    const res = await fetch('/api/todos')
    const data = await res.json()
    setTodos(data)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  // POST todo
  const addTodo = async () => {
    if (!text.trim()) return
    await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ text }),
      headers: { 'Content-Type': 'application/json' },
    })
    setText('')
    fetchTodos()
  }

  // PUT toggle completed
  const toggleTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: 'PUT' })
    fetchTodos()
  }

  // DELETE todo
  const deleteTodo = async (id: string) => {
    await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    fetchTodos()
  }

  return (
    <main className="max-w-xl mx-auto mt-12">
      <h1 className="text-3xl font-bold text-center mb-6">My ToDo App</h1>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new task"
          className="flex-1 border px-3 py-2 rounded"
        />
        <button
          onClick={addTodo}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div>
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
          />
        ))}
      </div>
    </main>
  )
}
