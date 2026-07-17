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
  const [optimisticState, setOptimisticFollowing] = useOptimistic(
    state,
    (currentState, isFollowing: boolean): FollowState => ({
      isFollowing,
      followerCount: currentState.followerCount + (isFollowing ? 1 : -1),
    }),
  );

  function handleClick() {
    const nextFollowing = !optimisticState.isFollowing;

    startTransition(async () => {
      setOptimisticFollowing(nextFollowing);
      const savedState = await saveFollow(nextFollowing);
      startTransition(() => setState(savedState));
    });
  }

  return (
    <article>
      <p>{optimisticState.followerCount} obserwujących</p>
      <button type="button" onClick={handleClick}>
        {optimisticState.isFollowing ? "Przestań obserwować" : "Obserwuj"}
      </button>
    </article>
  );
}
