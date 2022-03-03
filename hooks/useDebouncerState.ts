import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

type TResponse<T> = [T, Dispatch<SetStateAction<T>>];

export function useDebouncerState<T = any>(
  initialValue: T,
  debounceInterval: number
): TResponse<T> {
  const [value, setValue] = useState<T>(initialValue);
  const timeout = useRef<NodeJS.Timeout>();

  const mutator: Dispatch<SetStateAction<T>> = useCallback(
    (value) => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
      timeout.current = setTimeout(() => {
        setValue(value);
      }, debounceInterval);
    },
    [debounceInterval]
  );

  return [value, mutator];
}
