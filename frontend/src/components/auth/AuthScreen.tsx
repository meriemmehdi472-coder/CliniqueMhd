import { useState } from 'react';

interface AuthScreenProps {
  onAuthenticated: (mode: 'login' | 'register', payload: Record<string, FormDataEntryValue>) => Promise<void>;
}

export function AuthScreen({ onAuthenticated }: AuthScreenProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setBusy(true);
    const payload = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      await onAuthenticated(mode, payload);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Impossible de contacter le serveur.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-gradient-to-br from-violet-50 to-amber-50 px-5 py-10">
      <form className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5 sm:p-10" onSubmit={submit}>
        <div className="text-xl font-bold text-slate-900">🩺 Clinique<span className="text-sky-600">Mhd</span></div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{mode === 'login' ? 'Connexion' : 'Créer mon compte patient'}</h1>
          <p className="mt-1 text-sm text-slate-500">{mode === 'login' ? 'Connectez-vous à votre espace sécurisé.' : 'Créez votre espace patient en quelques instants.'}</p>
        </div>
        {mode === 'register' && <>
          <Field label="Nom"><input name="nom" autoComplete="family-name" required /></Field>
          <Field label="Prénom"><input name="prenom" autoComplete="given-name" required /></Field>
          <Field label="Date de naissance"><input name="date_naissance" type="date" /></Field>
        </>}
        <Field label="Email"><input name="email" type="email" autoComplete="email" required /></Field>
        <Field label="Mot de passe"><input name="password" type="password" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} minLength={8} required /></Field>
        {mode === 'register' && <small className="-mt-3 text-slate-500">8 caractères minimum.</small>}
        {error && <div role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>}
        <button disabled={busy} className="rounded-lg bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-wait disabled:opacity-60">
          {busy ? 'Veuillez patienter…' : mode === 'login' ? 'Se connecter' : 'Créer mon compte'}
        </button>
        <button type="button" className="text-sm font-medium text-indigo-700 hover:underline" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}>
          {mode === 'login' ? 'Pas encore de compte ? Créer un compte' : 'Déjà un compte ? Se connecter'}
        </button>
      </form>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5 text-sm font-semibold text-slate-700">
    {label}
    {children && <span className="[&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-slate-300 [&_input]:px-3 [&_input]:py-2.5 [&_input]:font-normal [&_input]:outline-none focus-within:[&_input]:border-indigo-500 focus-within:[&_input]:ring-2 focus-within:[&_input]:ring-indigo-100">{children}</span>}
  </label>;
}
