import { Dispatch, SetStateAction, useEffect, useState } from 'react';

type TReturnValue<T> = [T, Dispatch<SetStateAction<T>>];

export function usePersistentState<T = any>(
  key: string,
  initialState: T
): TReturnValue<T> {
  const [state, setState] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);

    if (storedValue) {
      return JSON.parse(storedValue);
    }

    return initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
