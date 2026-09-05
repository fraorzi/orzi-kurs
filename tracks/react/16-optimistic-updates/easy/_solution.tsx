import {
  startTransition,
  useOptimistic,
  useState,
} from "react";

export function LikeButton({
  initialLiked,
  saveLike,
}: {
  initialLiked: boolean;
  saveLike: (liked: boolean) => Promise<boolean>;
}) {
  const [liked, setLiked] = useState(initialLiked);
  const [optimisticLiked, setOptimisticLiked] =
    useOptimistic(liked);
  const [error, setError] = useState<string | null>(null);

  function handleClick() {
    const nextLiked = !optimisticLiked;
    setError(null);

    startTransition(async () => {
      setOptimisticLiked(nextLiked);

      try {
        const savedLiked = await saveLike(nextLiked);
        startTransition(() => setLiked(savedLiked));
      } catch {
        startTransition(() => {
          setError("Nie udało się zapisać polubienia.");
        });
      }
    });
  }

  return (
    <div>
      <button
        type="button"
        aria-pressed={optimisticLiked}
        onClick={handleClick}
      >
        {optimisticLiked ? "Cofnij polubienie" : "Polub"}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}
