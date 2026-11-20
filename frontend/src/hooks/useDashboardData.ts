import { useCallback, useEffect, useState } from 'react';
import type { AuthUser, RoleDashboardData } from '../types/clinic';

export function useDashboardData(user: AuthUser) {
  const [data, setData] = useState<RoleDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError('');

    fetch(`/api/dashboard/${user.role}`, { credentials: 'include' })
      .then(async response => {
        const result = await response.json() as RoleDashboardData & { error?: string };
        if (!response.ok) throw new Error(result.error || 'Impossible de charger le tableau de bord.');
        return result;
      })
      .then(result => { if (active) setData(result); })
      .catch(requestError => {
        if (active) setError(requestError instanceof Error ? requestError.message : 'Impossible de charger le tableau de bord.');
      })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, [user.id, user.role, refreshKey]);

  const retry = useCallback(() => setRefreshKey(key => key + 1), []);
  return { data, loading, error, retry };
}
