import { AddOptionsTypes, InputMenuFormTypes } from '@/types';
import { ChangeEvent, MouseEvent } from 'react';

export type CategoryBoxProps = {
  category: string;
  handleCategory: (id: number) => void;
  handleSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOpenCategoryOptions: (e: MouseEvent, id: number) => void;
};

export type MainMenuBoxProps = {
  search: string;
  handleAddMenu: () => void;
  handleSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSearchMenu: () => void;
  handleToggleMenu: (menuId: number) => void;
  handleSetMenu: (menuId: number) => void;
  handleDeleteMenu: (menuId?: number) => void;
};

export type ManageMenuBoxProps = {
  inputMenuForm: InputMenuFormTypes;
  handleSetInputMenuForm: (e: ChangeEvent<HTMLInputElement>) => void;
  handleSaveMenu: () => void;
  handleSelectCategory: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleAddMenuImage: () => void;
  handleEditOptions: () => void;
  handleDeleteMenu: (menuId?: number) => void;
};

export type AddOptionsBoxProps = {
  optionsInput: AddOptionsTypes[];
  handleSaveOptions: () => void;
  handleSetInputOption: (e: ChangeEvent<HTMLInputElement>) => void;
  handleDeleteOptions: (optionId: number) => void;
  handleAddOptions: () => void;
};
