import { MouseEvent } from 'react';

export type DesignCardProps = {
  title: string;
  edit: string;
  image?: string;
  state: 'normal' | 'active';
  onContextMenu: (e: MouseEvent<HTMLDivElement>) => void;
};
