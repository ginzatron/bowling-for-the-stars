interface PinsStandingProps {
  pins: number;
  bowl: (pins: number) => void;
}

export default function PinsStanding({ pins, bowl }: PinsStandingProps) {
  const pinArray = Array.from({ length: pins + 1 }, (_, index) => index);

  function handleBowl(pins: number) {
    bowl(pins);
  }

  return (
    <div className="flex">
      {pinArray.map((pin) => (
        <Pin pin={pin} bowl={handleBowl} />
      ))}
    </div>
  );
}

interface PinProps {
  pin: number;
  bowl: (pins: number) => void;
}
export function Pin({ pin, bowl }: PinProps) {
  return (
    <button
      onClick={() => bowl(pin)}
      type="button"
      className="inline-block px-3 py-1 text-sm font-semibold text-white bg-blue-500 rounded-full mr-2 mb-2"
    >
      {pin}
    </button>
  );
}
