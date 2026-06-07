import TaskCard from './TaskCard'

export default function TaskList({ tasks, onToggle, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-sm text-slate-400">No tasks yet. Create one above.</p>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
