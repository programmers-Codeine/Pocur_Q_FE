import { MouseEvent, ReactNode } from 'react';

export type ButtonProps = {
  title: string;
  type: 'menu' | 'others';
  state?: 'normal' | 'active';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

export type ItemButtonProps = {
  title: string;
  state: 'normal' | 'active';
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: MouseEvent<HTMLDivElement>) => void;
};
