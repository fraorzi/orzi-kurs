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
  readonly initialBoard: SprintBoardState;
}

export function SprintBoard({ initialBoard }: SprintBoardProps) {
  const [board, setBoard] = useState(initialBoard);

  function startTask(id: string) {
    setBoard((current) => {
      const task = current.backlog.find((candidate) => candidate.id === id);
      if (!task) {
        return current;
      }

      return {
        backlog: current.backlog.filter((candidate) => candidate.id !== id),
        inProgress: [...current.inProgress, task],
      };
    });
  }

  return (
    <div>
      <section aria-label="Backlog">
        <h2>Backlog</h2>
        <ul>
          {board.backlog.map((task) => (
            <li key={task.id}>
              {task.title}
              <button type="button" onClick={() => startTask(task.id)}>
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
