/**
 * useState wrapper that persists to sessionStorage.
 * When the component remounts, it restores the last value.
 * Key is prefixed with "ss:" to avoid collisions.
 */
import { useState, useCallback, useRef } from "react";

export function useSessionState(key, initialValue) {
  const storageKey = "ss:" + key;

  const [value, setValueRaw] = useState(() => {
    try {
      const stored = sessionStorage.getItem(storageKey);
      if (stored !== null) return JSON.parse(stored);
    } catch { /* ignore */ }
    return initialValue;
  });

  // Track latest value for the write callback
  const valueRef = useRef(value);

  const setValue = useCallback((update) => {
    setValueRaw(prev => {
      const next = typeof update === "function" ? update(prev) : update;
      valueRef.current = next;
      try {
        sessionStorage.setItem(storageKey, JSON.stringify(next));
      } catch { /* quota exceeded — ignore */ }
      return next;
    });
  }, [storageKey]);

  return [value, setValue];
}
