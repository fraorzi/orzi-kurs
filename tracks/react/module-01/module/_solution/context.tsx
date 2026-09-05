import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
import { createInitialState, taskReducer } from "./reducer";
import type {
  TaskAction,
  TaskState,
  TeamTask,
} from "./types";

const TaskStateContext = createContext<TaskState | null>(
  null,
);
const TaskDispatchContext =
  createContext<Dispatch<TaskAction> | null>(null);

export function TaskProvider({
  initialTasks,
  children,
}: {
  initialTasks: readonly TeamTask[];
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(
    taskReducer,
    initialTasks,
    createInitialState,
  );

  return (
    <TaskStateContext value={state}>
      <TaskDispatchContext value={dispatch}>
        {children}
      </TaskDispatchContext>
    </TaskStateContext>
  );
}

export function useTaskState(): TaskState {
  const state = useContext(TaskStateContext);
  if (!state) {
    throw new Error("Brak TaskProvider");
  }
  return state;
}

export function useTaskDispatch(): Dispatch<TaskAction> {
  const dispatch = useContext(TaskDispatchContext);
  if (!dispatch) {
    throw new Error("Brak TaskProvider");
  }
  return dispatch;
}
