import { useEffect } from 'react';

type TState = {
  isMounted: boolean;
};
type TAction = (state: TState) => (() => void) | void;

export function useCleanupEffect(action: TAction, dependencies: any[]) {
  useEffect(() => {
    const state: TState = { isMounted: true };
    const cleanupFunction = action(state);
    return () => {
      state.isMounted = false;
      if (typeof cleanupFunction === 'function') {
        cleanupFunction();
      }
    };
  }, dependencies);
}
