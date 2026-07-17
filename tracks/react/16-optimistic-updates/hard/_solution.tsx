import {
  startTransition,
  useOptimistic,
} from "react";

export interface Comment {
  readonly id: string;
  readonly text: string;
}

interface CommentView extends Comment {
  readonly pending?: boolean;
}

export function OptimisticComments({
  comments,
  saveComment,
  commitComment,
}: {
  readonly comments: readonly Comment[];
  readonly saveComment: (text: string) => Promise<Comment>;
  readonly commitComment: (comment: Comment) => void;
}) {
  const [optimisticComments, addOptimisticComment] = useOptimistic<
    readonly CommentView[],
    Comment
  >(
    comments,
    (currentComments, draft) => [
      ...currentComments,
      { ...draft, pending: true },
    ],
  );

  async function addAction(formData: FormData) {
    const text = String(formData.get("comment") ?? "").trim();
    if (!text) return;

    addOptimisticComment({ id: `draft-${text}`, text });
    const savedComment = await saveComment(text);
    startTransition(() => commitComment(savedComment));
  }

  return (
    <section>
      <ul>
        {optimisticComments.map((comment) => (
          <li key={comment.id}>
            {comment.text} {comment.pending && "(wysyłanie…)"}
          </li>
        ))}
      </ul>
      <form action={addAction}>
        <label htmlFor="new-comment">Komentarz</label>
        <input id="new-comment" name="comment" />
        <button type="submit">Dodaj komentarz</button>
      </form>
    </section>
  );
}
