import { useCallback, useEffect, useRef, useState } from 'react';

export function useToast() {
  const [message, setMessage] = useState<string | null>(null);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((nextMessage: string) => {
    if (timeout.current) clearTimeout(timeout.current);
    setMessage(nextMessage);
    timeout.current = setTimeout(() => setMessage(null), 3500);
  }, []);

  useEffect(() => () => { if (timeout.current) clearTimeout(timeout.current); }, []);
  return { message, showToast };
}
