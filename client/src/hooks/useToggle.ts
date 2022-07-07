import { useState } from 'react';

export function useToggle(
  initalState: boolean | (() => boolean) = false
): [boolean, () => void] {
  const [state, setState] = useState(initalState);
  const toggle = () => setState((state) => !state);
  return [state, toggle];
}
