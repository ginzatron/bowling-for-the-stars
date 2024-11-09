import { type Frame } from '../hooks/useScoreCalculator';

type FrameProps = {
  frame: Frame;
};

export default function Frame({ frame }: FrameProps) {
  const isStrike = frame.ball1Result == 10;
  const isSpare =
    (frame.ball1Result ?? 0) + (frame.ball2Result ?? 0) == 10 && !isStrike;

  let display = String(frame.ball2Result ?? '');
  if (isStrike && frame.frame < 10) display = 'X';
  if (isSpare) display = '/';

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div className="">frame: {frame.frame}</div>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div
            style={{
              marginRight: '10px',
            }}
          >
            {frame.ball1Result}
          </div>
          <div>{display}</div>
          <div>{frame.frame == 10 && frame.ball3Result}</div>
        </div>
        <div className="">
          {frame.readyToScore ? frame.totalScoreAtFrame : ''}
        </div>
      </div>
    </div>
  );
}
