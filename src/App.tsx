import { useState } from 'react';
import './index.css';
import Frame from './components/frame';
import useScoreCalculator from './hooks/useScoreCalculator';
import PinsStanding from './components/pinsStanding';

function App() {
  const [scoreArray, setScoreArray] = useState<(number | null)[]>([]);
  const { frames } = useScoreCalculator(scoreArray);

  const tenthFrame = scoreArray.length > 17;
  const isFirstBallInFrame = scoreArray.length % 2 == 0;

  const max = isFirstBallInFrame
    ? 10
    : tenthFrame && scoreArray[scoreArray.length - 1] == 10
    ? 10
    : 10 - (scoreArray[scoreArray.length - 1] ?? 0);

  function handleRoll(pinsHit: number) {
    setScoreArray((prev) => [...prev, pinsHit]);
    if (pinsHit == 10 && isFirstBallInFrame && !tenthFrame)
      setScoreArray((prev) => [...prev, null]);
  }

  function handleReset() {
    setScoreArray([]);
  }

  const doNotDisplay =
    (frames[9] != null &&
      frames[9].ball1Result != null &&
      frames[9].ball2Result != null &&
      frames[9].ball1Result + frames[9].ball2Result < 10) ||
    frames[9]?.ball3Result != null;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Bowling App</h1>
      <div className="flex flex-wrap justify-center">
        {frames.map((f, idx) => (
          <Frame key={idx} frame={f} />
        ))}
      </div>
      {!doNotDisplay ? (
        <PinsStanding pins={max} bowl={handleRoll} />
      ) : (
        <div>
          <div>GAME OVER</div>
          <PlayAgainButton reset={handleReset} />
        </div>
      )}
    </div>
  );
}

export function PlayAgainButton({ reset }: { reset: () => void }) {
  return (
    <button
      onClick={reset}
      type="button"
      className="rounded-full bg-blue-300 px-4 py-2 text-sm font-medium text-blue-900"
    >
      Play again?
    </button>
  );
}

export default App;
