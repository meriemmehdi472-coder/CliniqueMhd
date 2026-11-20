import { useState } from 'react';
import type { AuthUser, RoleDashboardData } from '../../types/clinic';

export function AssistantDashboard({ user, data, onLogout }: { user: AuthUser; data: RoleDashboardData; onLogout: () => Promise<void> }) {
  const [logoutError, setLogoutError] = useState(false);
  const displayName = user.prenom ? `${user.prenom} ${user.nom || ''}`.trim() : 'Espace assistant';
  const today = new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(new Date());

  async function logout() {
    try { await onLogout(); } catch { setLogoutError(true); }
  }

  return <main className="min-h-screen bg-stone-50 text-slate-800">
    {logoutError && <div role="alert" className="fixed right-5 top-5 z-50 rounded-xl bg-red-700 px-5 py-3 text-sm font-medium text-white shadow-lg">La déconnexion a échoué. Réessayez.</div>}
    <header className="border-b border-stone-200 bg-white"><div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"><div className="flex items-center gap-3"><span className="grid size-11 place-items-center rounded-xl bg-amber-100 text-2xl">📋</span><div><p className="font-bold text-slate-900">Clinique<span className="text-sky-600">Mhd</span></p><p className="text-xs font-semibold uppercase tracking-wider text-amber-700">Espace assistant</p></div></div><button onClick={() => { void logout(); }} className="rounded-lg border border-stone-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-stone-50">Se déconnecter</button></div></header>
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
      <section className="mb-8 flex flex-col justify-between gap-5 rounded-3xl bg-gradient-to-r from-amber-600 to-orange-700 p-7 text-white shadow-lg shadow-amber-900/10 sm:flex-row sm:items-center sm:p-9"><div><span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">Gestion du planning clinique</span><h1 className="mt-4 text-3xl font-bold">Bonjour, {displayName}</h1><p className="mt-2 text-sm text-amber-50">Vue des rendez-vous qui vous sont attribués et des dossiers associés.</p></div><div className="rounded-2xl border border-white/20 bg-white/10 px-5 py-4"><p className="text-sm text-amber-50">Aujourd’hui</p><p className="mt-1 text-xl font-bold">{today}</p></div></section>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric icon="📅" label="Rendez-vous aujourd’hui" value={data.stats.today_appointments} tint="bg-sky-50 text-sky-700" />
        <Metric icon="⏳" label="À confirmer" value={data.stats.pending_appointments} tint="bg-amber-50 text-amber-700" />
        <Metric icon="🩺" label="Médecins associés" value={data.stats.doctors} tint="bg-emerald-50 text-emerald-700" />
        <Metric icon="📎" label="Documents des patients suivis" value={data.stats.documents} tint="bg-violet-50 text-violet-700" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"><div className="border-b border-stone-100 px-6 py-5"><h2 className="font-bold text-slate-900">Planning des rendez-vous</h2><p className="mt-1 text-sm text-slate-500">Rendez-vous attribués à votre compte</p></div><div className="divide-y divide-stone-100">
          {data.appointments.length ? data.appointments.map(appointment => <article key={appointment.id} className="flex flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center"><span className="min-w-24 rounded-lg bg-stone-100 px-3 py-2 text-center text-sm font-bold text-slate-700">{formatDate(appointment.date)}<br />{appointment.time || 'Heure non définie'}</span><div className="min-w-0 flex-1"><p className="font-semibold text-slate-900">{appointment.patient || 'Patient'}</p><p className="mt-0.5 text-sm text-slate-500">{appointment.doctor || 'Médecin'}{appointment.specialty ? ` · ${appointment.specialty}` : ''}</p></div><StatusBadge status={appointment.status} /></article>) : <p className="px-6 py-8 text-sm text-slate-500">Aucun rendez-vous à venir ne vous est attribué.</p>}
        </div></section>

        <aside className="space-y-6"><section className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"><h2 className="font-bold text-slate-900">Documents récents</h2><p className="mt-1 text-sm text-slate-500">Documents liés aux patients de vos rendez-vous</p><div className="mt-4 divide-y divide-stone-100">
          {data.documents?.length ? data.documents.map(document => <article key={document.id} className="py-3"><p className="font-semibold text-slate-800">{document.name}</p><p className="mt-1 text-xs text-slate-500">{document.type || 'Document'} · {formatDate(document.date)}</p></article>) : <p className="py-5 text-sm text-slate-500">Aucun document trouvé.</p>}
        </div></section><section className="rounded-2xl border border-dashed border-amber-300 bg-amber-50/70 p-5"><p className="text-sm font-bold text-amber-950">Périmètre d’accès</p><p className="mt-1 text-sm leading-6 text-amber-900">Les indicateurs et la liste affichée sont limités aux rendez-vous associés à votre profil d’assistant.</p></section></aside>
      </div>
    </div>
  </main>;
}

function Metric({ icon, label, value, tint }: { icon: string; label: string; value: number | undefined; tint: string }) { return <article className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><p className="text-sm font-medium text-slate-500">{label}</p><span className={`grid size-10 place-items-center rounded-xl ${tint}`}>{icon}</span></div><p className="mt-4 text-3xl font-bold tracking-tight text-slate-900">{value ?? 0}</p></article>; }
function StatusBadge({ status }: { status: string }) { const normalized = status.toLocaleLowerCase('fr'); const color = normalized.includes('confirm') ? 'bg-emerald-50 text-emerald-700' : normalized.includes('annul') ? 'bg-red-50 text-red-700' : 'bg-amber-50 text-amber-800'; return <span className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${color}`}>{status}</span>; }
function formatDate(date: string) { return new Intl.DateTimeFormat('fr-FR', { day: '2-digit', month: 'short' }).format(new Date(`${date}T00:00:00`)); }
