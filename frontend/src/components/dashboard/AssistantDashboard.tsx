import { useState } from 'react';
import type { AuthUser } from '../../types/clinic';

const todayAppointments = [
  { time: '09:00', patient: 'Sophie Bernard', doctor: 'Dr Martin', status: 'Confirmé' },
  { time: '10:30', patient: 'Thomas Petit', doctor: 'Dr Lefèvre', status: 'À confirmer' },
  { time: '11:15', patient: 'Nadia Laurent', doctor: 'Dr Martin', status: 'Confirmé' },
  { time: '14:00', patient: 'Yanis Moreau', doctor: 'Dr Benali', status: 'À confirmer' },
];

export function AssistantDashboard({ user, onLogout }: { user: AuthUser; onLogout: () => Promise<void> }) {
  const [logoutError, setLogoutError] = useState(false);
  const displayName = user.prenom ? `${user.prenom} ${user.nom || ''}`.trim() : 'Espace assistant';
  const today = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date());

  async function logout() {
    try {
      await onLogout();
    } catch {
      setLogoutError(true);
    }
  }

  return <main className="min-h-screen bg-stone-50 text-slate-800">
    {logoutError && <div role="alert" className="fixed right-5 top-5 z-50 rounded-xl bg-red-700 px-5 py-3 text-sm font-medium text-white shadow-lg">La déconnexion a échoué. Réessayez.</div>}
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-2xl">📋</span>
          <div><p className="font-bold text-slate-900">Clinique<span className="text-sky-600">Mhd</span></p><p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Espace secrétariat</p></div>
        </div>
        <button onClick={() => { void logout(); }} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Se déconnecter</button>
      </div>
    </header>

    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <section className="mb-8 flex flex-col justify-between gap-5 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-700 p-7 text-white shadow-lg shadow-amber-900/10 sm:flex-row sm:items-center sm:p-9">
        <div>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">Gestion de la clinique</span>
          <h1 className="mt-4 text-3xl font-bold">Bonjour, {displayName}</h1>
          <p className="mt-2 text-sm text-amber-50">Retrouvez les rendez-vous et les tâches administratives du jour.</p>
        </div>
        <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4 sm:min-w-44">
          <p className="text-sm text-amber-50">Aujourd’hui</p><p className="mt-1 text-xl font-bold">{today}</p>
        </div>
      </section>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon="📅" label="Rendez-vous du jour" value="12" tint="bg-sky-50 text-sky-700" />
        <Metric icon="⏳" label="À confirmer" value="3" tint="bg-amber-50 text-amber-700" />
        <Metric icon="📎" label="Documents reçus" value="6" tint="bg-violet-50 text-violet-700" />
        <Metric icon="🩺" label="Médecins présents" value="4" tint="bg-emerald-50 text-emerald-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-stone-100 px-6 py-5">
            <div><h2 className="font-bold text-slate-900">Planning des rendez-vous</h2><p className="mt-1 text-sm text-slate-500">Aperçu des prochains passages</p></div>
            <button className="rounded-lg bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-100">Ouvrir le planning</button>
          </div>
          <div className="divide-y divide-stone-100">
            {todayAppointments.map(appointment => <article key={`${appointment.time}-${appointment.patient}`} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center">
              <span className="w-16 rounded-lg bg-stone-100 px-3 py-2 text-center text-sm font-bold text-slate-700">{appointment.time}</span>
              <div className="min-w-0 flex-1"><p className="font-semibold text-slate-900">{appointment.patient}</p><p className="mt-0.5 text-sm text-slate-500">{appointment.doctor}</p></div>
              <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${appointment.status === 'Confirmé' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-800'}`}>{appointment.status}</span>
            </article>)}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Tâches rapides</h2>
            <div className="mt-4 grid gap-3">
              <QuickAction icon="☎️" label="Rappeler les patients à confirmer" />
              <QuickAction icon="📄" label="Trier les nouveaux documents" />
              <QuickAction icon="🗓️" label="Consulter les disponibilités" />
            </div>
          </section>
          <section className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-5">
            <p className="text-sm font-bold text-amber-950">Aperçu temporaire</p>
            <p className="mt-1 text-sm leading-6 text-amber-900">Les rendez-vous, compteurs et tâches affichés sont des exemples. Ils ne modifient pas encore les données de la clinique.</p>
          </section>
        </aside>
      </div>
    </div>
  </main>;
}

function Metric({ icon, label, value, tint }: { icon: string; label: string; value: string; tint: string }) {
  return <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
    <div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><span className={`grid size-10 place-items-center rounded-xl ${tint}`}>{icon}</span></div>
    <p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
  </article>;
}

function QuickAction({ icon, label }: { icon: string; label: string }) {
  return <button className="flex items-center gap-3 rounded-xl border border-stone-200 px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:border-amber-200 hover:bg-amber-50">
    <span className="text-lg">{icon}</span>{label}<span className="ml-auto text-slate-400">→</span>
  </button>;
}
