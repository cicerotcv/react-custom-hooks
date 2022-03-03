import { useCallback, useMemo, useState } from 'react';

type TReturnValue<T> = {
  top: T;
  push(value: T): void;
  pop(): T | undefined;
};

export function useStack<T = any>(initialValue: T[]): TReturnValue<T> {
  const [stack, setStack] = useState<T[]>(initialValue);

  const push = useCallback(
    (newValue: T) => {
      setStack((previous) => [...previous, newValue]);
    },
    [stack]
  );

  const pop = useCallback(() => {
    const stackLength = stack.length;
    if (!stackLength) return;

    setStack([...stack.slice(0, stackLength - 1)]);

    return top;
  }, [stack]);

  const top = useMemo(() => stack[stack.length - 1], [stack]);

  return { top, push, pop };
}
