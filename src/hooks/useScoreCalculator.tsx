import { useEffect, useState } from 'react';

export interface Frame {
  ball1Result: number | null;
  ball2Result: number | null;
  ball3Result: number | null;
  frameScore: number;
  totalScoreAtFrame: number;
  frame: number;
  readyToScore: boolean;
}

// function generateStartingData() {
//   const startingArray: Frame[] = [];
//   for (let i = 0; i < 10; i++) {
//     startingArray.push({
//       ball1Result: null,
//       ball2Result: null,
//       ball3Result: null,
//       frameScore: 0,
//       totalScoreAtFrame: 0,
//       frame: i + 1,
//       readyToScore: false,
//     });
//   }
//   return startingArray;
// }

export default function useScoreCalculator(scoreArray: (number | null)[]) {
  const [frames, setFrames] = useState<Frame[]>([]);

  useEffect(() => {
    setFrames([]);
    generateScore();
  }, [scoreArray]);

  function generateScore() {
    computeFirstNineFrames();
    computeTenthFrame();
  }

  function computeFirstNineFrames() {
    let count = 0;
    for (let i = 0; i < scoreArray.length && i < 18; i += 2) {
      const firstBallResult = scoreArray[i];
      const secondBallResult = scoreArray[i + 1];

      const previousTotal = frames[count - 1]?.totalScoreAtFrame ?? 0;

      const frame: Frame = {
        ball1Result: firstBallResult,
        ball2Result: secondBallResult,
        ball3Result: null,
        frameScore: 0,
        totalScoreAtFrame: 0,
        frame: count + 1,
        readyToScore: false,
      };

      const isStrike = frame.ball1Result == 10;
      const isSpare =
        !isStrike &&
        frame.ball1Result != null &&
        frame.ball2Result != null &&
        frame.ball1Result + frame.ball2Result == 10;

      if (isStrike) {
        const firstBonusBall = scoreArray[i + 2];
        const secondBonusBall = scoreArray[i + 3] ?? scoreArray[i + 4];

        if (firstBonusBall != null && secondBonusBall != null)
          frame.readyToScore = true;

        frame.frameScore = 10 + (firstBonusBall ?? 0) + (secondBonusBall ?? 0);
      } else if (isSpare) {
        const bonusBall = scoreArray[i + 2];

        if (bonusBall != null) frame.readyToScore = true;

        frame.frameScore = 10 + (bonusBall ?? 0);
      } else {
        if (frame.ball1Result != null && frame.ball2Result != null)
          frame.readyToScore = true;

        frame.frameScore = (frame.ball1Result ?? 0) + (frame.ball2Result ?? 0);
      }
      frame.totalScoreAtFrame = previousTotal + frame.frameScore;
      setFrames((prev) => [...prev, frame]);
      count++;
    }
  }

  function computeTenthFrame() {
    if (scoreArray[18] != null) {
      const frame: Frame = {
        ball1Result: scoreArray[18],
        ball2Result: scoreArray[19],
        ball3Result: scoreArray[20],
        frameScore: 0,
        totalScoreAtFrame: 0,
        frame: 10,
        readyToScore: false,
      };
      const previousTotal = frames[8]?.totalScoreAtFrame ?? 0;
      console.log(previousTotal);

      if (frame.ball1Result != null && frame.ball2Result != null) {
        if (frame.ball1Result + frame.ball2Result < 10) {
          frame.readyToScore = true;
          frame.frameScore = frame.ball1Result + frame.ball2Result;
        } else if (
          frame.ball1Result + frame.ball2Result >= 10 &&
          frame.ball3Result != null
        ) {
          frame.readyToScore = true;
          frame.frameScore =
            frame.ball1Result + frame.ball2Result + frame.ball3Result;
        }
      }
      frame.totalScoreAtFrame = previousTotal + frame.frameScore;

      setFrames((prev) => [...prev, frame]);
    }
  }

  return { frames };
}
