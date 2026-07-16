import { useEffect } from "react";

export interface ChatService {
  connect(workspaceId: string): () => void;
}

export interface ActivityService {
  start(): () => void;
}

export interface WorkspacePresenceProps {
  readonly workspaceId: string;
  readonly chat: ChatService;
  readonly activity: ActivityService;
}

export function WorkspacePresence({
  workspaceId,
  chat,
  activity,
}: WorkspacePresenceProps) {
  useEffect(() => {
    const disconnectChat = chat.connect(workspaceId);
    const stopActivity = activity.start();

    return () => {
      disconnectChat();
      stopActivity();
    };
  }, [activity, chat, workspaceId]);

  return <h1>Workspace {workspaceId}</h1>;
}
