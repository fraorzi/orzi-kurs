"use client";

import { useState } from "react";

export function ProductCard({
  name,
  initialFavorite,
}: {
  readonly name: string;
  readonly initialFavorite: boolean;
}) {
  const [favorite, setFavorite] = useState(initialFavorite);

  return (
    <article>
      <h2>{name}</h2>
      <button type="button" onClick={() => setFavorite((value) => !value)}>
        {favorite ? `Usuń ${name} z ulubionych` : `Dodaj ${name} do ulubionych`}
      </button>
    </article>
  );
}
