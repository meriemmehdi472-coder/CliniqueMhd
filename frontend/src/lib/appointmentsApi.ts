import type { Appointment, Doctor } from '../types/clinic';

async function csrfToken() {
  const response = await fetch('/api/csrf', { credentials: 'include' });
  if (!response.ok) throw new Error('Impossible de préparer une session sécurisée.');
  const data = await response.json() as { csrf_token: string };
  return data.csrf_token;
}

async function readError(response: Response) {
  const data = await response.json().catch(() => ({})) as { error?: string; errors?: string[] };
  return data.error || data.errors?.join(', ') || 'Une erreur est survenue.';
}

type AppointmentResponse = Omit<Appointment, 'doctorId'> & { doctor_id: number };

function normalizeAppointment(item: AppointmentResponse): Appointment {
  return { ...item, id: String(item.id), doctorId: item.doctor_id };
}

export async function fetchDoctors(): Promise<Doctor[]> {
  const response = await fetch('/api/doctors', { credentials: 'include' });
  if (!response.ok) throw new Error(await readError(response));
  const data = await response.json() as { doctors: Doctor[] };
  return data.doctors;
}

export async function fetchAppointments(): Promise<Appointment[]> {
  const response = await fetch('/api/appointments', { credentials: 'include' });
  if (!response.ok) throw new Error(await readError(response));
  const data = await response.json() as { appointments: AppointmentResponse[] };
  return data.appointments.map(normalizeAppointment);
}

export type AppointmentInput = {
  doctorId: number;
  date: string;
  time: string;
  reason: string;
};

async function saveAppointment(input: AppointmentInput, id?: string) {
  const token = await csrfToken();
  const response = await fetch(id ? `/api/appointments/${encodeURIComponent(id)}` : '/api/appointments', {
    method: id ? 'PATCH' : 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-CSRF-Token': token },
    body: JSON.stringify({
      appointment: {
        id_medecin: input.doctorId,
        date: input.date,
        heure_rdv: input.time,
        motif: input.reason,
      },
    }),
  });
  if (!response.ok) throw new Error(await readError(response));
  const data = await response.json() as { appointment: AppointmentResponse };
  return { appointment: normalizeAppointment(data.appointment) };
}

export function createAppointment(input: AppointmentInput) {
  return saveAppointment(input);
}

export function updateAppointment(id: string, input: AppointmentInput) {
  return saveAppointment(input, id);
}

export async function cancelAppointment(id: string) {
  const token = await csrfToken();
  const response = await fetch(`/api/appointments/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'X-CSRF-Token': token },
  });
  if (!response.ok) throw new Error(await readError(response));
}
