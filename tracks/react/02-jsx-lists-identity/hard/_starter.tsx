export interface Contact {
  id: string;
  name: string;
}

export interface ContactEditorProps {
  selected: Contact;
}

function Editor({ contact }: { contact: Contact }) {
  return (
    <label>
      Nazwa kontaktu
      <input defaultValue={contact.name} />
    </label>
  );
}

export function ContactEditor({
  selected,
}: ContactEditorProps) {
  return <Editor contact={selected} />;
}
