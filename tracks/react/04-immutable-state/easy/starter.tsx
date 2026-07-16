import { useState } from "react";

export function ScoreBoard() {
  const [score, setScore] = useState({ home: 0, away: 0 });

  return (
    <section>
      <output aria-label="Gospodarze">{score.home}</output>
      <output aria-label="Goście">{score.away}</output>
      <button
        type="button"
        onClick={() => {
          score.home += 1;
          setScore(score);
        }}
      >
        Punkt dla gospodarzy
      </button>
      <button
        type="button"
        onClick={() => {
          score.away += 1;
          setScore(score);
        }}
      >
        Punkt dla gości
      </button>
    </section>
  );
}
