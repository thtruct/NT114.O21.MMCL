import { useMemo } from 'react';
import useSWRSubscription from 'swr/subscription';

import { WEBSOCKET_URL } from '../config-global';

export const useWebSocket = (key: string = 'default') => {
  const { data, error } = useSWRSubscription(
    [key, WEBSOCKET_URL],
    ([_, url], { next }) => {
      const socket = new WebSocket(url);

      socket.addEventListener('message', (event) => {
        next(null, event);
      });

      socket.addEventListener('error', (event) => next(event));

      return () => socket.close();
    },
    {
      // shouldRetryOnError: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      // revalidateOnMount: false,
    }
  );

  return useMemo(
    () => ({
      data,
      error,
    }),
    [data, error]
  );
};
