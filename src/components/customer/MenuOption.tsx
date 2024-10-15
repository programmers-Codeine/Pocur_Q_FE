function HotOption() {
  return (
    <div className="absolute -top-6 left-0 text-2xl font-bold text-highlightRed [text-shadow:_-1.5px_0_black,_0_1.5px_black,_1.5px_0_black,_0_-1.5px_black]">
      Hot
    </div>
  );
}

function NewOption() {
  return (
    <div className="absolute -top-6 left-0 text-2xl font-bold text-highlightYellow [text-shadow:_-1.5px_0_black,_0_1.5px_black,_1.5px_0_black,_0_-1.5px_black]">
      New
    </div>
  );
}

function SoldOutOption() {
  return (
    <>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-2xl font-bold text-d200 [text-shadow:_-1.5px_0_black,_0_1.5px_black,_1.5px_0_black,_0_-1.5px_black]">
        Sold Out
      </div>
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-black opacity-30" />
    </>
  );
}

interface MenuOptionProps {
  optType: 'hot' | 'new' | 'soldOut' | string;
}

export default function MenuOption({ optType }: MenuOptionProps) {
  if (optType === 'hot') return <HotOption />;
  else if (optType === 'new') return <NewOption />;
  else if (optType === 'soldOut') return <SoldOutOption />;

  return null;
}
