import { useState } from "react";

export interface SprintTask {
  readonly id: string;
  readonly title: string;
}

export interface SprintBoardState {
  readonly backlog: SprintTask[];
  readonly inProgress: SprintTask[];
}

export interface SprintBoardProps {
  initialBoard: SprintBoardState;
}

export function SprintBoard({
  initialBoard,
}: SprintBoardProps) {
  const [board, setBoard] = useState(initialBoard);

  function startTask(id: string) {
    // TODO: startTask - zaimplementuj zachowanie opisane w poleceniu.
    throw new Error("TODO: startTask");
  }

  return (
    <div>
      <section aria-label="Backlog">
        <h2>Backlog</h2>
        <ul>
          {board.backlog.map((task) => (
            <li key={task.id}>
              {task.title}
              <button
                type="button"
                onClick={() => startTask(task.id)}
              >
                Rozpocznij {task.title}
              </button>
            </li>
          ))}
        </ul>
      </section>
      <section aria-label="W toku">
        <h2>W toku</h2>
        <ul>
          {board.inProgress.map((task) => (
            <li key={task.id}>{task.title}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
