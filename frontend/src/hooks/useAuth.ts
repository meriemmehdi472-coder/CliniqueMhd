import { useCallback, useEffect, useState } from 'react';
import { authenticate as authenticateRequest, currentSession, endSession } from '../lib/authApi';
import type { AuthUser } from '../types/clinic';

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    currentSession()
      .then(sessionUser => { if (active) setUser(sessionUser); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const authenticate = useCallback(async (mode: 'login' | 'register', payload: Record<string, FormDataEntryValue>) => {
    const authenticatedUser = await authenticateRequest(mode, payload);
    setUser(authenticatedUser);
  }, []);

  const logout = useCallback(async () => {
    await endSession();
    setUser(null);
  }, []);

  return { user, loading, authenticate, logout };
}
