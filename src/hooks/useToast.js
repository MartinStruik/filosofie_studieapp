import { useState, useCallback } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);
  const show = useCallback((message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  }, []);
  return { toast, show };
}
