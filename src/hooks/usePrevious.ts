import { useState } from "react";

export default function usePrevious<T>(value: T, defaultValue: T): T {
  const [current, setCurrent] = useState<T>(value);
  const [previous, setPrevious] = useState<T>(defaultValue);

  if (!Object.is(current, value)) {
    setPrevious(current);
    setCurrent(value);
  }

  return previous;
}
