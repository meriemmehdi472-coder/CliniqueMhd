import { useState } from 'react';
import { PageHeading } from './HomeSection';
import { Field, PrimaryButton, SecondaryButton } from './AppointmentSection';

export function DocumentSection({ onUpload, onBack }: { onUpload: (title: string, type: string) => void; onBack: () => void }) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('Ordonnance');

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onUpload(title.trim(), type);
    setTitle('');
    onBack();
  }

  return <>
    <PageHeading title="📄 Envoyer un document" description="Transmettez vos pièces justificatives et ordonnances" />
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-slate-900">Partage de pièces justificatives</h2>
      <form onSubmit={submit} className="grid max-w-2xl gap-5">
        <Field label="Titre / Description du document"><input placeholder="Ex. Analyse de sang du laboratoire" value={title} onChange={event => setTitle(event.target.value)} required /></Field>
        <Field label="Type de document"><select value={type} onChange={event => setType(event.target.value)}><option>Ordonnance</option><option>Compte-rendu</option><option>Carte Vitale</option><option>Autre</option></select></Field>
        <div className="rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center text-sm text-slate-500">📁 Sélection de fichier (simulation)</div>
        <div className="flex flex-wrap gap-3"><PrimaryButton>Transmettre le document</PrimaryButton><SecondaryButton onClick={onBack}>← Retour à l’accueil</SecondaryButton></div>
      </form>
    </section>
  </>;
}
