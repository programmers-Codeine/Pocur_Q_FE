import { MouseEvent, ReactNode } from 'react';

export type ButtonProps = {
  title: string;
  type: 'menu' | 'others' | 'warn';
  state?: 'normal' | 'active';
  size?: 'default' | 'small';
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  children?: ReactNode;
};

export type ItemButtonProps = {
  title: string;
  state: 'normal' | 'active' | 'select';
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onContextMenu?: (e: MouseEvent<HTMLDivElement>) => void;
};

export type DesignColorButtonProps = {
  id: string;
  title: string;
  color: string;
  status?: 'default' | 'warn' | 'danger';
  onClick: (e: MouseEvent<HTMLDivElement>, color: string) => void;
  onChange?: (newColor: string) => void;
};
