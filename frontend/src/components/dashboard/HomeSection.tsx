import type { DashboardAppointment, DashboardDocument, DashboardSection } from '../../types/clinic';

export function HomeSection({ name, appointments, documents, onNavigate }: {
  name: string;
  appointments: DashboardAppointment[];
  documents: DashboardDocument[];
  onNavigate: (section: DashboardSection) => void;
}) {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  const activeAppointments = appointments.filter(appointment => appointment.date >= today && !appointment.status.toLocaleLowerCase('fr').includes('annul'));
  const nextAppointment = activeAppointments[0];
  const actions: { section: DashboardSection; icon: string; title: string; description: string }[] = [
    { section: 'rdv', icon: '📅', title: 'Prendre un rendez-vous', description: 'Accédez au formulaire de demande de consultation' },
    { section: 'document', icon: '📄', title: 'Envoyer un document', description: 'Accédez à l’espace de transmission de documents' },
    { section: 'dossier', icon: '📁', title: 'Mon dossier médical', description: 'Consultez les informations disponibles dans votre dossier' },
  ];

  return <>
    <PageHeading title={`Bonjour ${name} 👋`} description="Bienvenue sur votre espace patient sécurisé" />
    <section className={`mb-8 flex flex-col gap-5 rounded-2xl p-6 text-white shadow-lg sm:flex-row sm:items-center sm:justify-between ${nextAppointment ? 'bg-gradient-to-r from-violet-600 to-indigo-700 shadow-violet-600/20' : 'bg-slate-600'}`}>
      <div className="flex items-center gap-4"><span className="rounded-xl bg-white/15 p-3 text-2xl">📅</span><div><p className="text-xs font-bold uppercase tracking-wide text-white/80">{nextAppointment ? 'Votre prochain rendez-vous' : 'Aucun rendez-vous à venir'}</p><p className="mt-1 text-lg font-bold">{nextAppointment ? `${nextAppointment.doctor || 'Médecin'}${nextAppointment.specialty ? ` · ${nextAppointment.specialty}` : ''} — ${formatDate(nextAppointment.date)} à ${nextAppointment.time || 'heure à confirmer'}` : 'Vos rendez-vous enregistrés apparaîtront ici.'}</p></div></div>
      <button className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-indigo-700 hover:bg-indigo-50" onClick={() => onNavigate('rdv')}>Prendre un rendez-vous</button>
    </section>
    <div className="mb-8 grid gap-4 md:grid-cols-3">{actions.map(action => <button key={action.section} onClick={() => onNavigate(action.section)} className="rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="mb-4 grid size-12 place-items-center rounded-xl bg-slate-100 text-2xl">{action.icon}</span><span className="block font-bold text-slate-900">{action.title}</span><span className="mt-1 block text-sm text-slate-500">{action.description}</span></button>)}</div>
    <div className="grid gap-5 xl:grid-cols-[2fr_1fr]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="mb-5 font-bold text-slate-900">Mes prochains rendez-vous ({activeAppointments.length})</h2>
        {activeAppointments.length ? activeAppointments.slice(0, 5).map(appointment => <article key={appointment.id} className="flex flex-col gap-2 border-b border-slate-100 py-4 text-sm sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-slate-900">{appointment.reason || appointment.specialty || 'Consultation'}</p><p className="mt-1 text-slate-500">{appointment.doctor || 'Médecin'} · {formatDate(appointment.date)} à {appointment.time || 'heure à confirmer'}</p></div><span className="w-fit rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">{appointment.status}</span></article>) : <p className="py-6 text-center text-sm text-slate-500">Aucun rendez-vous enregistré pour le moment.</p>}
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h2 className="mb-5 font-bold text-slate-900">Mes documents ({documents.length})</h2>
        {documents.length ? documents.slice(0, 5).map(document => <article key={document.id} className="border-b border-slate-100 py-3"><p className="font-semibold text-slate-900">{document.name}</p><p className="mt-1 text-xs text-slate-500">{document.type || 'Document'} · {formatDate(document.date)}</p></article>) : <p className="py-6 text-center text-sm text-slate-500">Aucun document enregistré.</p>}
      </section>
    </div>
  </>;
}

export function PageHeading({ title, description }: { title: string; description: string }) { return <header className="mb-6"><h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></header>; }
function formatDate(date: string) { return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'medium' }).format(new Date(`${date}T00:00:00`)); }
