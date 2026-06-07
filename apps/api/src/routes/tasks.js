import { Router } from 'express'
import { getDb } from '../db.js'

const router = Router()

function serializeTask(task) {
  return {
    ...task,
    completed: task.completed === 1,
  }
}

router.get('/', (req, res) => {
  try {
    const db = getDb()
    const tasks = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all()
    res.json(tasks.map(serializeTask))
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' })
  }
})

router.post('/', (req, res) => {
  try {
    const { title, description } = req.body
    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' })
    }
    const db = getDb()
    const stmt = db.prepare('INSERT INTO tasks (title, description) VALUES (?, ?)')
    const result = stmt.run(title.trim(), description ?? null)
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid)
    res.status(201).json(serializeTask(task))
  } catch (err) {
    res.status(500).json({ error: 'Failed to create task' })
  }
})

router.patch('/:id', (req, res) => {
  try {
    const db = getDb()
    const { id } = req.params
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    const { title, description, completed } = req.body
    const updates = {}
    if (title !== undefined) updates.title = title.trim()
    if (description !== undefined) updates.description = description
    if (completed !== undefined) updates.completed = completed ? 1 : 0
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No fields to update' })
    }
    const setClauses = Object.keys(updates).map((key) => `${key} = ?`).join(', ')
    const values = Object.values(updates)
    db.prepare(`UPDATE tasks SET ${setClauses} WHERE id = ?`).run(...values, id)
    const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id)
    res.json(serializeTask(updated))
  } catch (err) {
    res.status(500).json({ error: 'Failed to update task' })
  }
})

router.delete('/:id', (req, res) => {
  try {
    const db = getDb()
    const { id } = req.params
    const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id)
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }
    db.prepare('DELETE FROM tasks WHERE id = ?').run(id)
    res.status(204).end()
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete task' })
  }
})

export default router
