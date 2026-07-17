import { useState } from "react";

export interface CheckoutData {
  readonly fullName: string;
  readonly email: string;
  readonly postalCode: string;
}

export interface CheckoutFormProps {
  readonly onSubmit: (data: CheckoutData) => void;
}

export function CheckoutForm({ onSubmit }: CheckoutFormProps) {
  const [data, setData] = useState<CheckoutData>({
    fullName: "",
    email: "",
    postalCode: "",
  });

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit(data);
      }}
    >
      <label>
        Imię i nazwisko
        <input
          name="fullName"
          value={data.fullName}
          onChange={(event) => {
            setData({ ...data, fullName: event.currentTarget.value });
          }}
        />
      </label>
      <label>
        E-mail
        <input
          name="email"
          type="email"
          value={data.email}
          onChange={(event) => {
            setData({ ...data, email: event.currentTarget.value });
          }}
        />
      </label>
      <label>
        Kod pocztowy
        <input
          name="postalCode"
          value={data.postalCode}
          onChange={(event) => {
            setData({ ...data, postalCode: event.currentTarget.value });
          }}
        />
      </label>
      <button type="submit">Zamawiam</button>
    </form>
  );
}
