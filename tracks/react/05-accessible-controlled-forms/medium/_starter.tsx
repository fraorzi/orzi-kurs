import { useState } from "react";

export interface ProfileData {
  readonly displayName: string;
  readonly bio: string;
}

export interface ProfileFormProps {
  onSave: (data: ProfileData) => void;
}

type ProfileErrors = Partial<
  Record<keyof ProfileData, string>
>;

export function ProfileForm({ onSave }: ProfileFormProps) {
  const [data, setData] = useState<ProfileData>({
    displayName: "",
    bio: "",
  });
  const [errors, setErrors] = useState<ProfileErrors>({});

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        // TODO: sprawdź dane, ustaw errors i wywołaj callback tylko dla poprawnych danych.
      }}
    >
      <label>
        Nazwa wyświetlana
        <input
          value={data.displayName}
          aria-invalid={
            errors.displayName ? true : undefined
          }
          aria-describedby={
            errors.displayName
              ? "display-name-error"
              : undefined
          }
          onChange={(event) => {
            setData({
              ...data,
              displayName: event.currentTarget.value,
            });
          }}
        />
      </label>
      {errors.displayName ? (
        <p id="display-name-error">{errors.displayName}</p>
      ) : null}
      <label>
        Bio
        <textarea
          value={data.bio}
          aria-invalid={errors.bio ? true : undefined}
          aria-describedby={
            errors.bio ? "bio-error" : undefined
          }
          onChange={(event) => {
            setData({
              ...data,
              bio: event.currentTarget.value,
            });
          }}
        />
      </label>
      {errors.bio ? (
        <p id="bio-error">{errors.bio}</p>
      ) : null}
      <button type="submit">Zapisz</button>
    </form>
  );
}
