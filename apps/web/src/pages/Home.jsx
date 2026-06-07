import { useState, useEffect, useCallback } from 'react'
import TaskForm from '../components/TaskForm'
import TaskList from '../components/TaskList'
import { getTasks, createTask, updateTask, deleteTask } from '../services/api'

export default function Home() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState(null)

  const fetchTasks = useCallback(async () => {
    try {
      const data = await getTasks()
      setTasks(data)
    } catch {
      setError('Failed to load tasks')
    }
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  async function handleCreate(data) {
    try {
      const task = await createTask(data)
      setTasks((prev) => [task, ...prev])
    } catch {
      setError('Failed to create task')
    }
  }

  async function handleToggle(id, completed) {
    try {
      const task = await updateTask(id, { completed })
      setTasks((prev) => prev.map((t) => (t.id === id ? task : t)))
    } catch {
      setError('Failed to update task')
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(id)
      setTasks((prev) => prev.filter((t) => t.id !== id))
    } catch {
      setError('Failed to delete task')
    }
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-slate-800">TaskFlow</h1>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
          <button
            onClick={() => setError(null)}
            className="ml-2 font-semibold underline"
          >
            Dismiss
          </button>
        </div>
      )}

      <TaskForm onSubmit={handleCreate} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main>
  )
}
