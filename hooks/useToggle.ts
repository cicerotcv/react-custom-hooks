import { useState } from 'react';

type TMutator = () => void;
type TReturnValue = [boolean, TMutator];

export function useToggle(initialValue: boolean): TReturnValue {
  const [value, setValue] = useState(initialValue);

  function toggleValue() {
    setValue((prev) => !prev);
  }

  return [value, toggleValue];
}
