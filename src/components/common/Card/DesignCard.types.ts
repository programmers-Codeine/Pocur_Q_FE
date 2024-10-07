import { MouseEvent } from 'react';

export type DesignCardProps = {
  title?: string;
  edit?: string;
  image?: string;
  state: 'normal' | 'active' | 'none';
  onContextMenu?: (e: MouseEvent<HTMLDivElement>) => void;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
};
