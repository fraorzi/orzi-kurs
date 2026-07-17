import {
  startTransition,
  useOptimistic,
  useState,
} from "react";

export interface FollowState {
  readonly isFollowing: boolean;
  readonly followerCount: number;
}

export function FollowCard({
  initialState,
  saveFollow,
}: {
  readonly initialState: FollowState;
  readonly saveFollow: (isFollowing: boolean) => Promise<FollowState>;
}) {
  const [state, setState] = useState(initialState);
  const [optimisticFollowing, setOptimisticFollowing] = useOptimistic(
    state.isFollowing,
  );

  function handleClick() {
    const nextFollowing = !optimisticFollowing;

    startTransition(async () => {
      setOptimisticFollowing(nextFollowing);
      const savedState = await saveFollow(nextFollowing);
      startTransition(() => setState(savedState));
    });
  }

  return (
    <article>
      <p>{state.followerCount} obserwujących</p>
      <button type="button" onClick={handleClick}>
        {optimisticFollowing ? "Przestań obserwować" : "Obserwuj"}
      </button>
    </article>
  );
}
