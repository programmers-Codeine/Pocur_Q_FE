import clsx from 'clsx';

interface Props {
  text: string;
  onClick: () => void;
  type?: 'warn' | 'default';
}

export default function ModalButton({ onClick, text, type = 'default' }: Props) {
  return (
    <button
      className={clsx(
        'min-w-[170px] max-w-[200px] flex-1 text-base font-bold px-[12px] py-[8px] bg-d30 border border-d200 rounded-lg',
        type !== 'default' ? 'text-highlightRed' : 'text-b500'
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
