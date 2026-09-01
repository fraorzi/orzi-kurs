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
          setScore((current) => ({
            ...score,
            home: current.home + 1,
          }));
        }}
      >
        Punkt dla gospodarzy
      </button>
      <button
        type="button"
        onClick={() => {
          setScore((current) => ({
            ...score,
            away: current.away + 1,
          }));
        }}
      >
        Punkt dla gości
      </button>
    </section>
  );
}
