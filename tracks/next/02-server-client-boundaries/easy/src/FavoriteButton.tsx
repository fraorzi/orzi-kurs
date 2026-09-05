"use client";

import { useState } from "react";

export function FavoriteButton({
  name,
  initialFavorite,
}: {
  name: string;
  initialFavorite: boolean;
}) {
  const [favorite, setFavorite] = useState(initialFavorite);

  return (
    <button
      type="button"
      onClick={() => setFavorite((value) => !value)}
    >
      {favorite
        ? `Usuń ${name} z ulubionych`
        : `Dodaj ${name} do ulubionych`}
    </button>
  );
}
