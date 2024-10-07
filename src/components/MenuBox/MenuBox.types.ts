import { AddOptionsTypes, InputMenuFormTypes } from '@/types';
import { ChangeEvent, MouseEvent } from 'react';

export type CategoryBoxProps = {
  category: string;
  onCategory: (id: number) => void;
  onSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onOpenCategoryOptions: (e: MouseEvent, id: number) => void;
};

export type FastToolBoxProps = {
  onToggleTool: (toolId: number) => void;
};

export type MainMenuBoxProps = {
  search: string;
  onAddMenu: () => void;
  onSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onSearchMenu: () => void;
  onToggleMenu: (menuId: number) => void;
  onSetMenu: (menuId: number) => void;
  onDeleteMenu: (menuId?: number) => void;
};

export type ManageMenuBoxProps = {
  inputMenuForm: InputMenuFormTypes;
  onSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  onSaveMenu: () => void;
  onSelectCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  onAddMenuImage: () => void;
  onEditOptions: () => void;
  onDeleteMenu: (menuId?: number) => void;
};

export type AddOptionsBoxProps = {
  optionsInput: AddOptionsTypes[];
  onSaveOptions: () => void;
  onSetInputOption: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteOptions: (optionId: number) => void;
  onAddOptions: () => void;
};
