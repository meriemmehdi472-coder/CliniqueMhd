import { useState } from 'react';
import type { Appointment, DocumentItem } from '../types/clinic';

export function usePatientDashboard(showToast: (message: string) => void) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [bloodGroup, setBloodGroup] = useState('');
  const [allergies, setAllergies] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isEditingRecord, setIsEditingRecord] = useState(false);

  function bookAppointment(appointment: Omit<Appointment, 'id' | 'status'>) {
    setAppointments(previous => [{ ...appointment, id: Date.now().toString(), status: 'confirmé' }, ...previous]);
    showToast('Demande simulée : elle n’est pas encore enregistrée en base.');
  }

  function toggleAppointment(id: string) {
    setAppointments(previous => previous.map(item => item.id === id
      ? { ...item, status: item.status === 'confirmé' ? 'annulé' : 'confirmé' }
      : item));
    showToast('Statut modifié localement, sans enregistrement en base.');
  }

  function addDocument(title: string, type: string) {
    setDocuments(previous => [{
      id: Date.now().toString(), title, type,
      date: new Date().toLocaleDateString('fr-FR'), size: '1,2 Mo',
    }, ...previous]);
    showToast('Document simulé : aucun fichier n’a été envoyé au serveur.');
  }

  function deleteDocument(id: string) {
    setDocuments(previous => previous.filter(document => document.id !== id));
    showToast('Document supprimé.');
  }

  function saveMedicalRecord() {
    setIsEditingRecord(false);
    showToast('Dossier modifié localement, sans enregistrement en base.');
  }

  return {
    appointments, documents, bloodGroup, setBloodGroup, allergies, setAllergies,
    emergencyContact, setEmergencyContact, isEditingRecord, setIsEditingRecord,
    bookAppointment, toggleAppointment, addDocument, deleteDocument, saveMedicalRecord,
  };
}
