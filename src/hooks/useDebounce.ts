import { useState, useEffect } from "react";

/**
 * Custom hook to debounce any value by a given delay in milliseconds.
 * Useful for debouncing search input keystrokes (e.g. 300ms) to avoid
 * triggering excessive network requests or UI re-renders on every keypress.
 *
 * @param value The value to debounce.
 * @param delay Milliseconds to wait after the last change before updating (default 300ms).
 */
export function useDebounce<T>(value: T, delay: number = 300): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
