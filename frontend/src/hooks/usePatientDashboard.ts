import { useState } from 'react';
import type { Appointment, DocumentItem } from '../types/clinic';

export function usePatientDashboard(showToast: (message: string) => void) {
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', specialty: 'Médecine générale', doctor: 'Dr. Jean Martin', date: '2026-07-09', time: '10:30', status: 'confirmé' },
  ]);
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: '1', title: 'Ordonnance - Consultation générale', type: 'Ordonnance', date: '02/07/2026', size: '245 Ko' },
  ]);
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [allergies, setAllergies] = useState('Aucune signalée');
  const [emergencyContact, setEmergencyContact] = useState('Marie Martin (06 12 34 56 78)');
  const [isEditingRecord, setIsEditingRecord] = useState(false);

  function bookAppointment(appointment: Omit<Appointment, 'id' | 'status'>) {
    setAppointments(previous => [{ ...appointment, id: Date.now().toString(), status: 'confirmé' }, ...previous]);
    showToast('Rendez-vous réservé avec succès !');
  }

  function toggleAppointment(id: string) {
    setAppointments(previous => previous.map(item => item.id === id
      ? { ...item, status: item.status === 'confirmé' ? 'annulé' : 'confirmé' }
      : item));
    showToast('Statut du rendez-vous mis à jour.');
  }

  function addDocument(title: string, type: string) {
    setDocuments(previous => [{
      id: Date.now().toString(), title, type,
      date: new Date().toLocaleDateString('fr-FR'), size: '1,2 Mo',
    }, ...previous]);
    showToast('Document transmis.');
  }

  function deleteDocument(id: string) {
    setDocuments(previous => previous.filter(document => document.id !== id));
    showToast('Document supprimé.');
  }

  function saveMedicalRecord() {
    setIsEditingRecord(false);
    showToast('Dossier médical mis à jour.');
  }

  return {
    appointments, documents, bloodGroup, setBloodGroup, allergies, setAllergies,
    emergencyContact, setEmergencyContact, isEditingRecord, setIsEditingRecord,
    bookAppointment, toggleAppointment, addDocument, deleteDocument, saveMedicalRecord,
  };
}
