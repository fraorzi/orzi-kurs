import { FavoriteButton } from "./FavoriteButton";

export function ProductCard({
  name,
  initialFavorite,
}: {
  name: string;
  initialFavorite: boolean;
}) {
  return (
    <article>
      <h2>{name}</h2>
      <FavoriteButton
        name={name}
        initialFavorite={initialFavorite}
      />
    </article>
  );
}
