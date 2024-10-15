import { InputDesignFormTypes, SetDesignData } from '@/types';
import { ChangeEvent, MouseEvent } from 'react';

export type DesignHomeBoxProps = {
  onOpenDesignOptions: (e: MouseEvent<HTMLDivElement>, id: string) => void;
  onNavigate: (id: number) => void;
};

export type DesignInputBoxProps = {
  inputDesignForm: InputDesignFormTypes;
  onSetInputDesignForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onSetCurrentDesignForm: (design: SetDesignData) => void;
  onReset: (reset: 'all' | 'color') => void;
  onNavigate: (id: number) => void;
  onSaveDesign: (use: 'create' | 'update') => void;
  onAddDesignImage: (imgUrl: string) => void;
};

export type DesignPreviewBoxProps = {
  onNavigate: (id: number) => void;
};
