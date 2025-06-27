'use client';

import { ToDo } from '@/types/todo';
import { useState } from 'react';
import { Icon } from '@iconify/react';

type Props = {
  todo: ToDo
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function TodoItem({ todo, onToggle, onDelete }: Props) {
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-white shadow rounded mb-2">
      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {
            setLoading(true)
            onToggle(todo._id)
            setLoading(false)
          }}
          className="w-5 h-5"
        />
        <span className={todo.completed ? 'line-through text-gray-400' : ''}>
          {todo.text}
        </span>
      </label>
      <button
        onClick={() => {
          setLoading(true)
          onDelete(todo._id)
          setLoading(false)
        }}
        className="text-red-500 hover:text-red-700"
      >
        <Icon
            icon="solar:trash-bin-trash-outline"
            fontSize={21}
        />
      </button>
    </div>
  )
}
