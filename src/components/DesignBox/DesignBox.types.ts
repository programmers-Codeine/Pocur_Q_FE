import { InputDesignFormTypes } from '@/types';
import { ChangeEvent, MouseEvent } from 'react';

export type DesignHomeBoxProps = {
  onOpenDesignOptions: (e: MouseEvent<HTMLDivElement>, id: number) => void;
  onNavigate: (id: number) => void;
};

export type DesignInputBoxProps = {
  inputDesignForm: InputDesignFormTypes;
  onSetInputDesignForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onReset: (reset: 'all' | 'color') => void;
  onNavigate: (id: number) => void;
  onSaveDesign: (use: 'create' | 'update') => void;
};

export type DesignPreviewBoxProps = {
  onNavigate: (id: number) => void;
}