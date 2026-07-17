import { useState } from "react";

export interface ProfileData {
  readonly displayName: string;
  readonly bio: string;
}

export interface ProfileFormProps {
  readonly onSave: (data: ProfileData) => void;
}

export function ProfileForm({ onSave }: ProfileFormProps) {
  const [data, setData] = useState<ProfileData>({
    displayName: "",
    bio: "",
  });

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        onSave(data);
      }}
    >
      <label>
        Nazwa wyświetlana
        <input
          value={data.displayName}
          onChange={(event) => {
            setData({ ...data, displayName: event.currentTarget.value });
          }}
        />
      </label>
      <label>
        Bio
        <textarea
          value={data.bio}
          onChange={(event) => {
            setData({ ...data, bio: event.currentTarget.value });
          }}
        />
      </label>
      <button type="submit">Zapisz</button>
    </form>
  );
}
