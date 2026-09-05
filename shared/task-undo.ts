export interface StarterFileSnapshot {
  path: string;
  contentBase64: string;
}

export interface StarterSnapshot {
  artifactName: "starter.tsx" | "starter.ts" | "starter.jsx" | "starter.js" | "starter.sql" | "src";
  kind: "file" | "directory" | "missing";
  files: StarterFileSnapshot[];
}

interface TaskUndoRecordBase {
  id: string;
  taskId: string;
  message: string;
  createdAt: number;
  expiresAt: number;
}

export type TaskUndoRecord<TProgress> =
  | (TaskUndoRecordBase & {
      kind: "code";
      payload: StarterSnapshot;
      revealedHints?: string[];
    })
  | (TaskUndoRecordBase & {
      kind: "progress";
      payload: TProgress;
    });
