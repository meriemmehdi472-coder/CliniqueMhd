export interface AuthUser {
  id: number;
  email: string;
  role: string;
  nom?: string;
  prenom?: string;
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
