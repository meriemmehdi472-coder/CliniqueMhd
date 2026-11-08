import { useState } from 'react';
import type { Appointment } from '../../types/clinic';
import { PageHeading } from './HomeSection';

export function AppointmentSection({ onBook, onBack }: { onBook: (appointment: Omit<Appointment, 'id' | 'status'>) => void; onBack: () => void }) {
  const [specialty, setSpecialty] = useState('Médecine générale');
  const [doctor, setDoctor] = useState('Dr. Jean Martin');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:30');

  function changeSpecialty(value: string) {
    setSpecialty(value);
    setDoctor(value === 'Cardiologie' ? 'Dr. Sophie Bernard' : value === 'Dermatologie' ? 'Dr. Marc Leroy' : 'Dr. Jean Martin');
  }

  function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onBook({ specialty, doctor, date, time });
    onBack();
  }

  return <>
    <PageHeading title="📅 Prendre un rendez-vous" description="Sélectionnez votre spécialité, votre médecin et votre créneau" />
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="mb-6 text-lg font-bold text-slate-900">Planification d’une consultation</h2>
      <form onSubmit={submit} className="grid max-w-2xl gap-5 sm:grid-cols-2">
        <Field label="Spécialité médicale"><select value={specialty} onChange={event => changeSpecialty(event.target.value)}><option>Médecine générale</option><option>Cardiologie</option><option>Dermatologie</option></select></Field>
        <Field label="Médecin traitant / praticien"><input value={doctor} onChange={event => setDoctor(event.target.value)} required /></Field>
        <Field label="Date souhaitée"><input type="date" value={date} onChange={event => setDate(event.target.value)} required /></Field>
        <Field label="Heure"><select value={time} onChange={event => setTime(event.target.value)}><option>09:00</option><option>10:30</option><option>14:00</option><option>16:30</option></select></Field>
        <div className="flex flex-wrap gap-3 sm:col-span-2"><PrimaryButton>Confirmer la réservation</PrimaryButton><SecondaryButton onClick={onBack}>← Retour à l’accueil</SecondaryButton></div>
      </form>
    </section>
  </>;
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">{label}<span className="[&_input]:w-full [&_input]:rounded-lg [&_input]:border [&_input]:border-slate-300 [&_input]:bg-white [&_input]:px-3 [&_input]:py-2.5 [&_input]:text-sm [&_input]:outline-none focus-within:[&_input]:border-indigo-500 focus-within:[&_input]:ring-2 focus-within:[&_input]:ring-indigo-100 [&_select]:w-full [&_select]:rounded-lg [&_select]:border [&_select]:border-slate-300 [&_select]:bg-white [&_select]:px-3 [&_select]:py-2.5 [&_select]:text-sm [&_select]:outline-none">{children}</span></label>;
}

export function PrimaryButton({ children, type = 'submit', onClick, disabled }: { children: React.ReactNode; type?: 'button' | 'submit'; onClick?: () => void; disabled?: boolean }) {
  return <button type={type} onClick={onClick} disabled={disabled} className="rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60">{children}</button>;
}

export function SecondaryButton({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return <button type="button" onClick={onClick} className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50">{children}</button>;
}
