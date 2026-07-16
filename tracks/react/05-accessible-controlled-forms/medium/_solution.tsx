import { useState } from "react";

export interface ProfileData {
  readonly displayName: string;
  readonly bio: string;
}

export interface ProfileFormProps {
  readonly onSave: (data: ProfileData) => void;
}

type ProfileErrors = Partial<Record<keyof ProfileData, string>>;

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
        const nextErrors: ProfileErrors = {};
        if (!data.displayName.trim()) {
          nextErrors.displayName = "Podaj nazwę wyświetlaną.";
        }
        if (data.bio.length > 120) {
          nextErrors.bio = "Bio może mieć maksymalnie 120 znaków.";
        }

        setErrors(nextErrors);
        if (Object.keys(nextErrors).length > 0) {
          return;
        }

        onSave({
          displayName: data.displayName.trim(),
          bio: data.bio.trim(),
        });
      }}
    >
      <label>
        Nazwa wyświetlana
        <input
          value={data.displayName}
          aria-invalid={errors.displayName ? true : undefined}
          aria-describedby={errors.displayName ? "display-name-error" : undefined}
          onChange={(event) => {
            setData({ ...data, displayName: event.currentTarget.value });
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
          aria-describedby={errors.bio ? "bio-error" : undefined}
          onChange={(event) => {
            setData({ ...data, bio: event.currentTarget.value });
          }}
        />
      </label>
      {errors.bio ? <p id="bio-error">{errors.bio}</p> : null}
      <button type="submit">Zapisz</button>
    </form>
  );
}
