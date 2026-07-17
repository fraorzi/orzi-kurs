export interface ApiKeyFieldProps {
  readonly label: string;
  readonly hint: string;
}

export function ApiKeyField({ label, hint }: ApiKeyFieldProps) {
  return (
    <div>
      <label htmlFor="api-key">{label}</label>
      <input id="api-key" aria-describedby="api-key-hint" />
      <p id="api-key-hint">{hint}</p>
    </div>
  );
}
