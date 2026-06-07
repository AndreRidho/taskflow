import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

export function getTasks() {
  return client.get('/tasks').then((res) => res.data)
}

export function createTask(data) {
  return client.post('/tasks', data).then((res) => res.data)
}

export function updateTask(id, data) {
  return client.patch(`/tasks/${id}`, data).then((res) => res.data)
}

export function deleteTask(id) {
  return client.delete(`/tasks/${id}`)
}
