import { useState } from "react";

export function LikeButton({
  initialLiked,
  saveLike,
}: {
  readonly initialLiked: boolean;
  readonly saveLike: (liked: boolean) => Promise<boolean>;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [error, setError] = useState<string | null>(null);

  async function handleClick() {
    const nextLiked = !liked;
    setError(null);

    try {
      setLiked(await saveLike(nextLiked));
    } catch {
      setError("Nie udało się zapisać polubienia.");
    }
  }

  return (
    <div>
      <button type="button" aria-pressed={liked} onClick={handleClick}>
        {liked ? "Cofnij polubienie" : "Polub"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
