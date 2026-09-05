export interface EditableTask {
  readonly id: string;
  readonly title: string;
}

export interface EditableTaskListProps {
  tasks: readonly EditableTask[];
}

export function EditableTaskList({
  tasks,
}: EditableTaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <input
            aria-label={`Nazwa zadania ${task.id}`}
            defaultValue={task.title}
          />
        </li>
      ))}
    </ul>
  );
}
