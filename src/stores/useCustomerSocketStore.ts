import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

type SocketState = {
  socket: Socket;
  setSocket: (restaurantId: string, autoConnect?: boolean) => void;
};

const useCustomerSocketStore = create<SocketState>()(set => ({
  socket: io(),
  setSocket: (restaurantId, autoConnect = true) => {
    set(() => ({
      socket: io('https://pocurq.store/', {
        query: {
          restaurantId,
        },
        autoConnect: autoConnect,
      }),
    }));
  },
}));

export default useCustomerSocketStore;
