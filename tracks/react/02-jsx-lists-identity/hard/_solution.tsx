export interface Contact {
  readonly id: string;
  readonly name: string;
}

export interface ContactEditorProps {
  readonly selected: Contact;
}

function Editor({ contact }: { readonly contact: Contact }) {
  return (
    <label>
      Nazwa kontaktu
      <input defaultValue={contact.name} />
    </label>
  );
}

export function ContactEditor({ selected }: ContactEditorProps) {
  return <Editor key={selected.id} contact={selected} />;
}
