import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  createInitialState,
  taskReducer,
} from "./reducer";
import type {
  TaskAction,
  TaskState,
  TeamTask,
} from "./types";

interface TaskContextValue {
  readonly state: TaskState;
  readonly dispatch: Dispatch<TaskAction>;
}

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({
  initialTasks,
  children,
}: {
  readonly initialTasks: readonly TeamTask[];
  readonly children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTasks,
    createInitialState,
  );

  return (
    <TaskContext value={{ state, dispatch }}>
      {children}
    </TaskContext>
  );
}

function useTaskContext(): TaskContextValue {
  const value = useContext(TaskContext);
  if (!value) {
    throw new Error("Brak TaskProvider");
  }
  return value;
}

export function useTaskState(): TaskState {
  return useTaskContext().state;
}

export function useTaskDispatch(): Dispatch<TaskAction> {
  return useTaskContext().dispatch;
}
