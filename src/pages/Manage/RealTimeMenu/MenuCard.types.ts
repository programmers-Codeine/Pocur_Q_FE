import { Menu } from '@/stores/useMenuStore';

export interface MenuCardProps {
  menu: Menu;
  onSelectLabel: (menu: Menu, id: string, isActive: boolean) => void;
}
