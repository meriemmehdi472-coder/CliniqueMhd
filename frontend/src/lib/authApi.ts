import type { AuthUser } from '../types/clinic';

async function csrfToken() {
  const response = await fetch('/api/csrf', { credentials: 'include' });
  if (!response.ok) throw new Error('Impossible de préparer une session sécurisée.');
  const data = await response.json() as { csrf_token: string };
  return data.csrf_token;
}

export async function authenticate(mode: 'login' | 'register', payload: Record<string, FormDataEntryValue>) {
  const token = await csrfToken();
  const response = await fetch(mode === 'register' ? '/api/users' : '/api/session', {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
    body: JSON.stringify(payload),
  });
  const data = await response.json() as { user?: AuthUser; error?: string; errors?: string[] };
  if (!response.ok || !data.user) {
    throw new Error(data.error || data.errors?.join(', ') || 'Une erreur est survenue.');
  }
  return data.user;
}

export async function endSession() {
  const token = await csrfToken();
  const response = await fetch('/api/session', {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'X-CSRF-Token': token },
  });
  if (!response.ok) throw new Error('La déconnexion a échoué.');
}

export async function currentSession() {
  const response = await fetch('/api/session', { credentials: 'include' });
  if (!response.ok) return null;
  const data = await response.json() as { user: AuthUser };
  return data.user;
}
