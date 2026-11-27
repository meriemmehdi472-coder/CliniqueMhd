import { useState } from 'react';
import type { AppointmentInput } from '../../lib/appointmentsApi';
import type { Appointment, Doctor } from '../../types/clinic';
import { PageHeading } from './HomeSection';

export function AppointmentSection({
  appointments,
  doctors,
  loading,
  onBook,
  onUpdate,
  onCancel,
  onBack,
}: {
  appointments: Appointment[];
  doctors: Doctor[];
  loading: boolean;
  onBook: (appointment: AppointmentInput) => Promise<void>;
  onUpdate: (id: string, appointment: AppointmentInput) => Promise<void>;
  onCancel: (id: string) => Promise<void>;
  onBack: () => void;
}) {
  const [editing, setEditing] = useState<Appointment | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function cancel(appointment: Appointment) {
    if (!window.confirm(`Annuler le rendez-vous du ${appointment.date} à ${appointment.time} ?`)) return;
    setBusyId(appointment.id);
    try { await onCancel(appointment.id); } catch { /* Le hook affiche l'erreur. */ }
    finally { setBusyId(null); }
  }

  function startEditing(appointment: Appointment) {
    setEditing(appointment);
    setShowForm(true);
  }

  function closeForm() {
    setEditing(null);
    setShowForm(false);
  }

  return <>
    <PageHeading title="📅 Mes rendez-vous" description="Consultez, planifiez ou modifiez vos rendez-vous." />
    <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold text-slate-900">Historique et rendez-vous à venir</h2>
        <PrimaryButton type="button" onClick={() => {
          if (showForm && !editing) closeForm();
          else { setEditing(null); setShowForm(true); }
        }}>
          {showForm && !editing ? 'Fermer le formulaire' : '＋ Nouveau rendez-vous'}
        </PrimaryButton>
      </div>
      {loading ? <p className="py-8 text-center text-sm text-slate-500">Chargement des rendez-vous…</p>
        : appointments.length === 0 ? <p className="py-8 text-center text-sm text-slate-500">Vous n’avez pas encore de rendez-vous.</p>
          : <div className="divide-y divide-slate-100">
            {appointments.map(appointment => {
              const canceled = appointment.status.toLowerCase() === 'annulé';
              const canManage = !canceled && new Date(`${appointment.date}T${appointment.time}`) > new Date();
              return <article key={appointment.id} className="flex flex-col gap-4 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-slate-900">{appointment.doctor}
                    {appointment.specialty && <span className="font-normal text-slate-500"> · {appointment.specialty}</span>}
                  </p>
                  <p className="mt-1 text-sm text-slate-600">{formatDate(appointment.date)} à {appointment.time}</p>
                  {appointment.reason && <p className="mt-1 text-sm text-slate-500">Motif : {appointment.reason}</p>}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${canceled ? 'bg-slate-100 text-slate-500' : appointment.status.toLowerCase() === 'en attente' ? 'bg-amber-50 text-amber-700' : 'bg-emerald-50 text-emerald-700'}`}>
                    {appointment.status}
                  </span>
                  {canManage && <>
                    <button disabled={busyId === appointment.id} onClick={() => startEditing(appointment)} className="rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50">Modifier</button>
                    <button disabled={busyId === appointment.id} onClick={() => void cancel(appointment)} className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50 disabled:opacity-50">{busyId === appointment.id ? 'En cours…' : 'Annuler'}</button>
                  </>}
                </div>
              </article>;
            })}
          </div>}
    </section>

    {showForm && <AppointmentForm key={editing?.id ?? 'new'} doctors={doctors} appointment={editing} onSave={async input => {
      if (editing) await onUpdate(editing.id, input);
      else await onBook(input);
      closeForm();
    }} onCancel={closeForm} />}
    <SecondaryButton onClick={onBack}>← Retour à l’accueil</SecondaryButton>
  </>;
}

function AppointmentForm({ doctors, appointment, onSave, onCancel }: {
  doctors: Doctor[];
  appointment: Appointment | null;
  onSave: (input: AppointmentInput) => Promise<void>;
  onCancel: () => void;
}) {
  const [doctorId, setDoctorId] = useState(appointment ? String(appointment.doctorId) : '');
  const [date, setDate] = useState(appointment?.date ?? '');
  const [time, setTime] = useState(appointment?.time ?? '');
  const [reason, setReason] = useState(appointment?.reason ?? '');
  const [saving, setSaving] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    try { await onSave({ doctorId: Number(doctorId), date, time, reason }); }
    catch { /* Le hook affiche l'erreur et le formulaire reste ouvert. */ }
    finally { setSaving(false); }
  }

  return <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
    <h2 className="mb-6 text-lg font-bold text-slate-900">{appointment ? 'Modifier le rendez-vous' : 'Planifier une consultation'}</h2>
    <form onSubmit={submit} className="grid max-w-2xl gap-5 sm:grid-cols-2">
      <Field label="Médecin"><select value={doctorId} onChange={event => setDoctorId(event.target.value)} required disabled={doctors.length === 0}>
        <option value="">Choisir un médecin</option>{doctors.map(doctor => <option key={doctor.id} value={doctor.id}>{doctor.name}{doctor.specialty ? ` — ${doctor.specialty}` : ''}</option>)}
      </select></Field>
      <Field label="Date souhaitée"><input type="date" value={date} min={new Date().toISOString().slice(0, 10)} onChange={event => setDate(event.target.value)} required /></Field>
      <Field label="Heure souhaitée"><input type="time" value={time} onChange={event => setTime(event.target.value)} required /></Field>
      <Field label="Motif (facultatif)"><input value={reason} onChange={event => setReason(event.target.value)} maxLength={255} /></Field>
      {doctors.length === 0 && <p className="text-sm text-slate-500 sm:col-span-2">Aucun médecin n’est disponible pour le moment.</p>}
      <div className="flex flex-wrap gap-3 sm:col-span-2">
        <PrimaryButton disabled={saving || doctors.length === 0}>{saving ? 'Enregistrement…' : appointment ? 'Enregistrer les modifications' : 'Demander un rendez-vous'}</PrimaryButton>
        <SecondaryButton onClick={onCancel}>Fermer</SecondaryButton>
      </div>
    </form>
  </section>;
}

function formatDate(value: string) {
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('fr-FR', { dateStyle: 'long' }).format(date);
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">{label}
    <span className="[&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-slate-300 [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-sm [&_input]:outline-none focus-within:[&_input]:border-indigo-500 focus-within:[&_input]:ring-2 focus-within:[&_input]:ring-indigo-100 [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-slate-300 [&_select]:bg-white [&_select]:px-3 [&_select]:py-2.5 [&_select]:text-sm [&_select]:outline-none">{children}</span>
  </label>;
}

export function PrimaryButton({ children, type = 'submit', onClick, disabled }: {
  children: React.ReactNode; type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean;
}) {
  return <button type={type} onClick={onClick} disabled={disabled} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60">{children}</button>;
}

export function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">{children}</button>;
}
