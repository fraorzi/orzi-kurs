import { useEffect } from "react";

export interface ChatService {
  connect(workspaceId: string): () => void;
}

export interface ActivityService {
  start(): () => void;
}

export interface WorkspacePresenceProps {
  workspaceId: string;
  chat: ChatService;
  activity: ActivityService;
}

export function WorkspacePresence({
  workspaceId,
  chat,
  activity,
}: WorkspacePresenceProps) {
  useEffect(
    () => chat.connect(workspaceId),
    [chat, workspaceId],
  );

  useEffect(() => activity.start(), [activity]);

  return <h1>Workspace {workspaceId}</h1>;
}
