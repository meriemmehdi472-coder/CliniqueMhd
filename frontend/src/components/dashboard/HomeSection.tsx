import type { Appointment, DashboardSection, DocumentItem } from '../../types/clinic';

export function HomeSection({ name, appointments, documents, onNavigate, onToggleAppointment, onDeleteDocument, showToast }: {
  name: string;
  appointments: Appointment[];
  documents: DocumentItem[];
  onNavigate: (section: DashboardSection) => void;
  onToggleAppointment: (id: string) => void;
  onDeleteDocument: (id: string) => void;
  showToast: (message: string) => void;
}) {
  const activeAppointment = appointments.find(item => item.status === 'confirmé');
  const actions: { section: DashboardSection; icon: string; title: string; description: string }[] = [
    { section: 'rdv', icon: '📅', title: 'Prendre un rendez-vous', description: 'Choisissez un créneau avec votre médecin' },
    { section: 'document', icon: '📄', title: 'Envoyer un document', description: 'Partagez une pièce jointe à la clinique' },
    { section: 'dossier', icon: '📁', title: 'Mon dossier médical', description: 'Consultez vos informations de santé' },
  ];

  return <>
    <PageHeading title={`Bonjour ${name} 👋`} description="Bienvenue sur votre espace patient sécurisé" />
    <section className={`mb-8 flex flex-col gap-5 rounded-2xl p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between ${activeAppointment ? 'bg-gradient-to-r from-violet-600 to-indigo-700 shadow-violet-600/20' : 'bg-slate-500'}`}>
      <div className="flex items-center gap-4">
        <span className="rounded-xl bg-white/15 p-3 text-2xl">📅</span>
        <div><p className="text-xs font-bold uppercase tracking-wide text-white/80">{activeAppointment ? `Prochain rendez-vous (${activeAppointment.specialty})` : 'Aucun rendez-vous actif'}</p>
          <p className="mt-1 text-lg font-bold">{activeAppointment ? `${activeAppointment.doctor} — ${activeAppointment.date} à ${activeAppointment.time}` : 'Prenez rendez-vous avec la clinique.'}</p></div>
      </div>
      {activeAppointment
        ? <button className="rounded-lg border border-white/40 px-4 py-2 text-sm font-semibold hover:bg-white/10" onClick={() => onToggleAppointment(activeAppointment.id)}>Annuler</button>
        : <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50" onClick={() => onNavigate('rdv')}>Prendre un rendez-vous</button>}
    </section>
    <div className="mb-8 grid gap-4 md:grid-cols-3">
      {actions.map(action => <button key={action.section} onClick={() => onNavigate(action.section)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
        <span className="mb-4 grid size-12 place-items-center rounded-xl bg-slate-100 text-2xl">{action.icon}</span>
        <span className="block font-bold text-slate-900">{action.title}</span><span className="mt-1 block text-sm text-slate-500">{action.description}</span>
      </button>)}
    </div>
    <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="mb-5 font-bold text-slate-900">Mes documents ({documents.length})</h2>
        <div className="hidden grid-cols-[2fr_1fr_auto] border-b border-slate-200 pb-3 text-xs font-semibold uppercase text-slate-500 sm:grid"><span>Document</span><span>Date</span><span>Action</span></div>
        {documents.length ? documents.map(document => <div key={document.id} className="grid gap-2 border-b border-slate-100 py-4 text-sm sm:grid-cols-[2fr_1fr_auto] sm:items-center">
          <span className="font-medium text-slate-900">{document.title} <small className="text-slate-400">({document.size})</small></span><span className="text-slate-500">{document.date}</span>
          <div className="flex gap-2"><button className="rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-100" onClick={() => showToast(`Téléchargement de « ${document.title} »…`)}>Télécharger</button><button className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700 hover:bg-red-100" onClick={() => onDeleteDocument(document.id)}>Supprimer</button></div>
        </div>) : <p className="py-8 text-center text-sm text-slate-500">Aucun document enregistré.</p>}
      </section>
      <aside className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-800 p-7 text-white shadow-lg shadow-indigo-700/20">
        <h2 className="mb-3 font-bold">Espace patient interactif</h2><p className="text-sm leading-6 text-white/85">Gérez vos rendez-vous, vos documents et votre dossier médical depuis votre espace sécurisé.</p>
      </aside>
    </div>
  </>;
}

export function PageHeading({ title, description }: { title: string; description: string }) {
  return <header className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></header>;
}
