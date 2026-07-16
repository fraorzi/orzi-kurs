import {
  useEffect,
  useEffectEvent,
} from "react";

export interface ChatConnection {
  connect(roomId: string, onConnected: () => void): () => void;
}

export interface ChatNotificationsProps {
  readonly roomId: string;
  readonly muted: boolean;
  readonly chat: ChatConnection;
  readonly onNotify: (message: string) => void;
}

export function ChatNotifications({
  roomId,
  muted,
  chat,
  onNotify,
}: ChatNotificationsProps) {
  const notifyConnected = useEffectEvent((connectedRoomId: string) => {
    if (!muted) {
      onNotify(`Połączono z ${connectedRoomId}`);
    }
  });

  useEffect(() => (
    chat.connect(roomId, () => notifyConnected(roomId))
  ), [chat, roomId]);

  return <h1>Pokój {roomId}</h1>;
}
