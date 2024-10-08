import { create } from 'zustand';
import { UserType } from '@/types';

type userState = {
  userInfo: UserType;
  loginFirst: boolean;

  setLoginFirst: (isFirstLogin: boolean) => void;
};

const useUserStore = create<userState>(set => ({
  userInfo: {
    id: null,
  },
  loginFirst: true,
  setLoginFirst: isFirstLogin => set(() => ({ loginFirst: isFirstLogin })),
}));

export default useUserStore;
