import { useFormStatus } from "react-dom";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      {pending ? "Wysyłanie…" : "Wyślij"}
    </button>
  );
}

export function ContactForm({
  sendMessage,
}: {
  readonly sendMessage: (message: string) => Promise<void>;
}) {
  async function sendAction(formData: FormData) {
    await sendMessage(String(formData.get("message") ?? ""));
  }

  return (
    <form action={sendAction}>
      <label htmlFor="contact-message">Wiadomość</label>
      <textarea id="contact-message" name="message" />
      <SubmitButton />
    </form>
  );
}
