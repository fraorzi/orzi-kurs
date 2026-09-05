export default function ErrorPage({
  error,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  console.error(error);
  return <p>{error.message}</p>;
}
