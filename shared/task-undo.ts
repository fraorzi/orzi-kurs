export interface StarterFileSnapshot {
  path: string;
  contentBase64: string;
}

export interface StarterSnapshot {
  artifactName: "starter.ts" | "starter.js" | "starter.sql" | "starter.java" | "src";
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
    })
  | (TaskUndoRecordBase & {
      kind: "progress";
      payload: TProgress;
    });
