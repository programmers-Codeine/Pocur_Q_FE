import { MouseEvent, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'second';
  size?: 'small' | 'medium' | 'large';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

export default function Button2({ children, type, color, size, onClick }: Props) {
  const className = {
    getColor: () => {
      switch (color) {
        case 'primary': {
          return 'bg-blue-500 text-white';
        }

        case 'second': {
          return 'bg-red-400 text-white';
        }

        default: {
          return '';
        }
      }
    },

    getSize: () => {
      switch (size) {
        case 'small': {
          return 'w-12 h-6';
        }

        case 'medium': {
          return 'w-18 h-8';
        }

        case 'large': {
          return 'w-24 h-10';
        }

        default: {
          return '';
        }
      }
    },
  };

  return (
    <div>
      <button
        className={`border-none rounded-lg outline-none px-2 py-1 ${className.getColor()} ${className.getSize()}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  );
}
