import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import tasksRouter from './routes/tasks.js'

const app = express()
const PORT = process.env.PORT || 3000
const CLIENT_URL = process.env.CLIENT_URL || 'http://localhost:5173'

app.use(cors({ origin: CLIENT_URL }))
app.use(express.json())

app.use('/tasks', tasksRouter)

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
