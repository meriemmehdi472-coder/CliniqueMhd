export interface AuthUser {
  id: number;
  email: string;
  role: string;
  nom?: string;
  prenom?: string;
}

export type DashboardSection = 'accueil' | 'rdv' | 'document' | 'dossier' | 'parametres';

export interface Doctor {
  id: number;
  name: string;
  specialty: string| null;
}

export interface Appointment {
  id: string;
  doctorId: number;
  specialty: string | null;
  doctor: string;
  date: string;
  time: string;
  reason?: string;
  status: string;
}

export interface DocumentItem {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
}
