export default function ErrorPage({
  error,
}: {
  readonly error: Error & { readonly digest?: string };
  readonly unstable_retry: () => void;
}) {
  console.error(error);
  return <p>{error.message}</p>;
}
