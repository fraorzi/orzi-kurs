export interface FieldDefinition {
  id: string;
  label: string;
}

export interface FieldRegistry {
  attach(id: string, node: HTMLInputElement): () => void;
}

export interface RegisteredFieldsProps {
  fields: FieldDefinition[];
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
                return registry.attach(field.id, node);
              }
            }}
          />
        </label>
      ))}
    </div>
  );
}
