import { AddOptionsTypes, InputMenuFormTypes } from '@/types';
import { ChangeEvent, MouseEvent } from 'react';

export type CategoryBoxProps = {
  message: string;
  category: string;
  onCategory: (id: number) => void;
  onSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onOpenCategoryOptions: (e: MouseEvent, id: string) => void;
};

export type FastToolBoxProps = {
  onToggleTool: (toolId: string) => void;
};

export type MainMenuBoxProps = {
  search: string;
  onAddMenu: () => void;
  onSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchMenu: () => void;
  onToggleMenu: (menuId: string) => void;
  onSetMenu: (menuId: string) => void;
  onCancelMenu: (menuId?: string) => void;
};

export type ManageMenuBoxProps = {
  warn: boolean;
  inputMenuForm: InputMenuFormTypes;
  onSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onSaveMenu: () => void;
  onSelectCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  onAddMenuImage: (imgUrl: string) => void;
  onEditOptions: () => void;
  onCancelMenu: (menuId?: string) => void;
};

export type AddOptionsBoxProps = {
  optionsInput: AddOptionsTypes[];
  onSaveOptions: () => void;
  onSetInputOption: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteOptions: (optionId: string) => void;
  onAddOptions: () => void;
};
