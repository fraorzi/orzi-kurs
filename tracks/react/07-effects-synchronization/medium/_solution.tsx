import { useEffect, useState } from "react";

export interface MessageSource {
  subscribe(
    roomId: string,
    listener: (message: string) => void,
  ): () => void;
}

export interface RoomMessagesProps {
  roomId: string;
  source: MessageSource;
}

export function RoomMessages({
  roomId,
  source,
}: RoomMessagesProps) {
  const [lastMessage, setLastMessage] = useState(
    "Brak wiadomości",
  );

  useEffect(
    () => source.subscribe(roomId, setLastMessage),
    [roomId, source],
  );

  return (
    <output aria-label="Ostatnia wiadomość">
      {lastMessage}
    </output>
  );
}
