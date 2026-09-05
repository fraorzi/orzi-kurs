import { useState } from "react";

export interface CheckoutData {
  readonly fullName: string;
  readonly email: string;
  readonly postalCode: string;
}

export interface CheckoutFormProps {
  onSubmit: (data: CheckoutData) => void;
}

type CheckoutErrors = Partial<
  Record<keyof CheckoutData, string>
>;

export function CheckoutForm({
  onSubmit,
}: CheckoutFormProps) {
  const [data, setData] = useState<CheckoutData>({
    fullName: "",
    email: "",
    postalCode: "",
  });
  const [errors, setErrors] = useState<CheckoutErrors>({});

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: sprawdź dane, ustaw errors i wywołaj callback tylko dla poprawnych danych.
      }}
    >
      {Object.keys(errors).length > 0 ? (
        <p role="alert">Popraw dane formularza.</p>
      ) : null}
      <label>
        Imię i nazwisko
        <input
          name="fullName"
          value={data.fullName}
          aria-invalid={errors.fullName ? true : undefined}
          aria-describedby={
            errors.fullName ? "full-name-error" : undefined
          }
          onChange={(event) => {
            setData({
              ...data,
              fullName: event.currentTarget.value,
            });
          }}
        />
      </label>
      {errors.fullName ? (
        <p id="full-name-error">{errors.fullName}</p>
      ) : null}
      <label>
        E-mail
        <input
          name="email"
          type="email"
          value={data.email}
          aria-invalid={errors.email ? true : undefined}
          aria-describedby={
            errors.email ? "email-error" : undefined
          }
          onChange={(event) => {
            setData({
              ...data,
              email: event.currentTarget.value,
            });
          }}
        />
      </label>
      {errors.email ? (
        <p id="email-error">{errors.email}</p>
      ) : null}
      <label>
        Kod pocztowy
        <input
          name="postalCode"
          value={data.postalCode}
          aria-invalid={
            errors.postalCode ? true : undefined
          }
          aria-describedby={
            errors.postalCode
              ? "postal-code-error"
              : undefined
          }
          onChange={(event) => {
            setData({
              ...data,
              postalCode: event.currentTarget.value,
            });
          }}
        />
      </label>
      {errors.postalCode ? (
        <p id="postal-code-error">{errors.postalCode}</p>
      ) : null}
      <button type="submit">Zamawiam</button>
    </form>
  );
}
