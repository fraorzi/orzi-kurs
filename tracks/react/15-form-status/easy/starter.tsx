import { useFormStatus } from "react-dom";

export function ContactForm({
  sendMessage,
}: {
  readonly sendMessage: (message: string) => Promise<void>;
}) {
  const { pending } = useFormStatus();

  async function sendAction(formData: FormData) {
    await sendMessage(String(formData.get("message") ?? ""));
  }

  return (
    <form action={sendAction}>
      <label htmlFor="contact-message">Wiadomość</label>
      <textarea id="contact-message" name="message" />
      <button type="submit" disabled={pending}>
        {pending ? "Wysyłanie…" : "Wyślij"}
      </button>
    </form>
  );
}
