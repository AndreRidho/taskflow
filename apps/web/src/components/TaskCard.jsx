export default function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div
      className={`rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        task.completed ? 'opacity-60' : ''
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3
          className={`font-semibold ${
            task.completed ? 'text-slate-400 line-through' : 'text-slate-800'
          }`}
        >
          {task.title}
        </h3>
        <button
          onClick={() => onDelete(task.id)}
          className="shrink-0 text-sm text-slate-400 transition-colors hover:text-red-500"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
      {task.description && (
        <p className="mb-4 text-sm text-slate-500">{task.description}</p>
      )}
      <div className="flex items-center justify-between">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-500">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id, !task.completed)}
            className="h-4 w-4 rounded border-slate-300 text-violet-600 focus:ring-violet-300"
          />
          {task.completed ? 'Completed' : 'Mark complete'}
        </label>
        <span className="text-xs text-slate-400">
          {new Date(task.created_at + 'Z').toLocaleDateString()}
        </span>
      </div>
    </div>
  )
}
