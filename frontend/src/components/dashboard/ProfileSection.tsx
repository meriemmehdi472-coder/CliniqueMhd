import { useState } from 'react';
import type { AuthUser } from '../../types/clinic';
import { PageHeading } from './HomeSection';
import { Field, PrimaryButton, SecondaryButton } from './AppointmentSection';

export function ProfileSection({ user, onBack, showToast }: { user: AuthUser; onBack: () => void; showToast: (message: string) => void }) {
  const [firstName, setFirstName] = useState(user.prenom || '');
  const [email, setEmail] = useState(user.email);

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showToast('Le profil sera synchronisé avec le serveur dans une prochaine étape.');
  }

  return <>
    <PageHeading title="⚙️ Paramètres & Profil" description="Consultez vos informations de compte" />
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-slate-900">Informations personnelles</h2>
      <form onSubmit={submit} className="grid max-w-2xl gap-5">
        <Field label="Prénom"><input value={firstName} onChange={event => setFirstName(event.target.value)} /></Field>
        <Field label="Email"><input type="email" value={email} onChange={event => setEmail(event.target.value)} /></Field>
        <div className="flex flex-wrap gap-3"><PrimaryButton>Mettre à jour le profil</PrimaryButton><SecondaryButton onClick={onBack}>← Retour à l’accueil</SecondaryButton></div>
      </form>
    </section>
  </>;
}
