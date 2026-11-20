import { useState } from 'react';
import type { AuthUser, RoleDashboardData } from '../../types/clinic';

export function DoctorDashboard({ user, data, onLogout }: { user: AuthUser; data: RoleDashboardData; onLogout: () => Promise<void> }) {
  const [logoutError, setLogoutError] = useState(false);
  const displayName = user.prenom ? `Dr ${user.prenom} ${user.nom || ''}`.trim() : 'Espace médecin';
  const today = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date());

  async function logout() {
    try { await onLogout(); } catch { setLogoutError(true); }
  }

  return <main className="min-h-screen bg-slate-50 text-slate-800">
    {logoutError && <div role="alert" className="fixed right-5 top-5 z-50 rounded-xl bg-red-700 px-5 py-3 text-sm font-medium text-white shadow-lg">La déconnexion a échoué. Réessayez.</div>}
    <DashboardHeader onLogout={() => { void logout(); }} />
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <section className="mb-8 flex flex-col justify-between gap-5 rounded-3xl bg-gradient-to-r from-teal-700 to-cyan-800 p-7 text-white shadow-lg shadow-teal-900/10 sm:flex-row sm:items-center sm:p-9">
        <div><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">Espace médecin</span><h1 className="mt-4 text-3xl font-bold">Bonjour, {displayName}</h1><p className="mt-2 text-sm text-teal-50">Votre activité est calculée à partir de vos rendez-vous, disponibilités et dossiers.</p></div>
        <div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4"><p className="text-sm text-teal-50">Aujourd’hui</p><p className="mt-1 text-xl font-bold">{today}</p></div>
      </section>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon="📅" label="Rendez-vous aujourd’hui" value={data.stats.today_appointments} tint="bg-cyan-50 text-cyan-700" />
        <Metric icon="🗓️" label="Rendez-vous à venir" value={data.stats.upcoming_appointments} tint="bg-indigo-50 text-indigo-700" />
        <Metric icon="👥" label="Patients suivis" value={data.stats.patients} tint="bg-emerald-50 text-emerald-700" />
        <Metric icon="📋" label="Comptes rendus" value={data.stats.diagnostics} tint="bg-violet-50 text-violet-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5"><h2 className="font-bold text-slate-900">Vos prochains rendez-vous</h2><p className="mt-1 text-sm text-slate-500">Données enregistrées dans votre agenda</p></div>
          <div className="divide-y divide-slate-100">
            {data.appointments.length ? data.appointments.map(appointment => <article key={appointment.id} className="flex flex-col gap-3 px-6 py-5 sm:flex-row sm:items-center">
              <span className="min-w-24 rounded-lg bg-slate-100 px-3 py-2 text-center text-sm font-bold text-slate-700">{formatDate(appointment.date)}<br />{appointment.time || 'Heure non définie'}</span>
              <div className="min-w-0 flex-1"><p className="font-semibold text-slate-900">{appointment.patient || 'Patient'}</p><p className="mt-0.5 text-sm text-slate-500">{appointment.reason || appointment.specialty || 'Consultation'}</p></div>
              <StatusBadge status={appointment.status} />
            </article>) : <EmptyState>Aucun rendez-vous à venir.</EmptyState>}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">Vos disponibilités</h2><p className="mt-1 text-sm text-slate-500">Créneaux à partir d’aujourd’hui</p>
          <div className="mt-4 divide-y divide-slate-100">
            {data.availability?.length ? data.availability.map((slot, index) => <div key={`${slot.date}-${slot.time}-${index}`} className="flex items-center justify-between gap-3 py-3 text-sm"><span className="font-medium text-slate-800">{formatDate(slot.date)} · {slot.time || 'Heure non définie'}</span><StatusBadge status={slot.status || 'Disponible'} /></div>) : <p className="py-6 text-sm text-slate-500">Aucun créneau disponible enregistré.</p>}
          </div>
        </section>
      </div>
    </div>
  </main>;
}

function DashboardHeader({ onLogout }: { onLogout: () => void }) {
  return <header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-teal-100 text-2xl">🩺</span><div><p className="font-bold text-slate-900">Clinique<span className="text-sky-600">Mhd</span></p><p className="text-xs font-semibold uppercase tracking-wider text-teal-700">Espace médecin</p></div></div><button onClick={onLogout} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Se déconnecter</button></div></header>;
}

function Metric({ icon, label, value, tint }: { icon: string; label: string; value: number | undefined; tint: string }) {
  return <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><span className={`grid size-10 place-items-center rounded-xl ${tint}`}>{icon}</span></div><p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{value ?? 0}</p></article>;
}

function StatusBadge({ status }: { status: string }) {
  const normalized = status.toLocaleLowerCase('fr');
  const color = normalized.includes('confirm') || normalized.includes('disponible') ? 'bg-emerald-50 text-emerald-700' : normalized.includes('annul') ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800';
  return <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{status}</span>;
}

function EmptyState({ children }: { children: React.ReactNode }) { return <p className="px-6 py-8 text-sm text-slate-500">{children}</p>; }
function formatDate(date: string) { return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(`${date}T00:00:00`)); }
