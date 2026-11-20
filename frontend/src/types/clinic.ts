export interface AuthUser {
  id: number;
  email: string;
  role: 'patient' | 'medecin' | 'assistant';
  nom?: string;
  prenom?: string;
}

export interface DashboardAppointment {
  id: number;
  date: string;
  time: string | null;
  status: string;
  reason: string | null;
  patient: string | null;
  doctor: string | null;
  specialty: string | null;
}

export interface DashboardDocument {
  id: number;
  name: string;
  type: string | null;
  date: string;
}

export interface DashboardAvailability {
  date: string;
  time: string | null;
  status: string | null;
}

export interface RoleDashboardData {
  role: AuthUser['role'];
  stats: Record<string, number>;
  appointments: DashboardAppointment[];
  documents?: DashboardDocument[];
  availability?: DashboardAvailability[];
}

export type DashboardSection = 'accueil' | 'rdv' | 'document' | 'dossier' | 'parametres';

export interface Appointment {
  id: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  status: 'confirmé' | 'annulé';
}

export interface DocumentItem {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
}
