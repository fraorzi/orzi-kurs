import { useEffect } from "react";

export interface ChatConnection {
  connect(
    roomId: string,
    onConnected: () => void,
  ): () => void;
}

export interface ChatNotificationsProps {
  roomId: string;
  muted: boolean;
  chat: ChatConnection;
  onNotify: (message: string) => void;
}

export function ChatNotifications({
  roomId,
  muted,
  chat,
  onNotify,
}: ChatNotificationsProps) {
  useEffect(
    () =>
      chat.connect(roomId, () => {
        if (!muted) {
          onNotify(`Połączono z ${roomId}`);
        }
      }),
    [chat, muted, onNotify, roomId],
  );

  return <h1>Pokój {roomId}</h1>;
}
