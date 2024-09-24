import { MouseEvent, ReactNode } from 'react';

export type ButtonProps = {
  title: string;
  type: 'menu' | 'others';
  state?: 'normal' | 'active';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};
