function HotOption({ color }: { color: string }) {
  return (
    <div
      className="absolute -top-2 left-0 text-2xl font-bold text-highlightRed [text-shadow:_-1.5px_0_black,_0_1.5px_black,_1.5px_0_black,_0_-1.5px_black]"
      style={{ color: color }}
    >
      Hot
    </div>
  );
}

function NewOption({ color }: { color: string }) {
  return (
    <div
      className="absolute -top-2 left-0 text-2xl font-bold text-highlightYellow [text-shadow:_-1.5px_0_black,_0_1.5px_black,_1.5px_0_black,_0_-1.5px_black]"
      style={{ color: color }}
    >
      New
    </div>
  );
}

function SoldOutOption({ color }: { color: string }) {
  return (
    <>
      <div
        className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-d200 [text-shadow:_-1.5px_0_black,_0_1.5px_black,_1.5px_0_black,_0_-1.5px_black]"
        style={{ color: color }}
      >
        Sold Out
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-30" />
    </>
  );
}

interface MenuOptionProps {
  optType: 'hot' | 'new' | 'soldOut' | string;
  color: string | undefined;
}

export default function MenuOption({ optType, color }: MenuOptionProps) {
  if (optType === 'hot') return <HotOption color={color as string} />;
  else if (optType === 'new') return <NewOption color={color as string} />;
  else if (optType === 'soldOut') return <SoldOutOption color={color as string} />;

  return null;
}
