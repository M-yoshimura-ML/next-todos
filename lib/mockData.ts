export type MockTodo = {
  _id: string
  text: string
  completed: boolean
}

// Pseudo memory data shared within server
export let mockTodos: MockTodo[] = [
  { _id: '1', text: 'go shopping', completed: false },
  { _id: '2', text: 'read book', completed: true },
]

// function for add, update, delete（Switch to MongoDB operation）
export const addTodo = (text: string) => {
  const newTodo: MockTodo = {
    _id: Date.now().toString(),
    text,
    completed: false,
  }
  mockTodos.push(newTodo)
  return newTodo
}

export const toggleTodo = (id: string) => {
  mockTodos = mockTodos.map((todo) =>
    todo._id === id ? { ...todo, completed: !todo.completed } : todo
  )
}

export const deleteTodo = (id: string) => {
  mockTodos = mockTodos.filter((todo) => todo._id !== id)
}
