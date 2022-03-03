import { useEffect, useRef } from 'react';

type TAction = () => void;

export function useThrottle(
  action: TAction,
  dependencies: any[],
  delayMillis: number
) {
  const timeoutHandler = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeoutHandler.current) {
      clearTimeout(timeoutHandler.current);
    }
    timeoutHandler.current = setTimeout(action, delayMillis);
  }, dependencies);
}
