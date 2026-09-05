export interface FieldDefinition {
  readonly id: string;
  readonly label: string;
}

export interface FieldRegistry {
  attach(id: string, node: HTMLInputElement): () => void;
}

export interface RegisteredFieldsProps {
  fields: readonly FieldDefinition[];
  registry: FieldRegistry;
}

export function RegisteredFields({
  fields,
  registry,
}: RegisteredFieldsProps) {
  return (
    <div>
      {fields.map((field) => (
        <label key={field.id}>
          {field.label}
          <input
            ref={(node) => {
              if (node) {
                registry.attach(field.id, node);
              }
            }}
          />
        </label>
      ))}
    </div>
  );
}
