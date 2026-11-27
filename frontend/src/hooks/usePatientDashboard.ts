
import { useEffect, useState } from 'react';
import type { Appointment, DocumentItem, Doctor } from '../types/clinic';
import {
  cancelAppointment,
  createAppointment,
  fetchAppointments,
  fetchDoctors,
  updateAppointment,
  type AppointmentInput,
} from '../lib/appointmentsApi';

export function usePatientDashboard(showToast: (message: string) => void) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [allergies, setAllergies] = useState('Aucune signalée');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isEditingRecord, setIsEditingRecord] = useState(false);
  const [loadingAppointments, setLoadingAppointments] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [loadedAppointments, loadedDoctors] = await Promise.all([
          fetchAppointments(),
          fetchDoctors(),
        ]);

        setAppointments(loadedAppointments);
        setDoctors(loadedDoctors);
      } catch (error) {
        showToast(error instanceof Error ? error.message : 'Chargement impossible.');
      } finally {
        setLoadingAppointments(false);
      }
    }

    void load();
  }, [showToast]);

  async function bookAppointment(input: AppointmentInput) {
    try {
      const result = await createAppointment(input);
      setAppointments(previous => [result.appointment, ...previous]);
      showToast('Demande de rendez-vous envoyée.');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Réservation impossible.');
      throw error;
    }
  }

  async function cancelPatientAppointment(id: string) {
    try {
      await cancelAppointment(id);
      setAppointments(previous => previous.map(item =>
        item.id === id ? { ...item, status: 'Annulé' } : item
      ));
      showToast('Rendez-vous annulé.');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Annulation impossible.');
      throw error;
    }
  }

  async function rescheduleAppointment(id: string, input: AppointmentInput) {
    try {
      const result = await updateAppointment(id, input);
      setAppointments(previous => previous.map(item => item.id === id ? result.appointment : item));
      showToast('Rendez-vous modifié.');
    } catch (error) {
      showToast(error instanceof Error ? error.message : 'Modification impossible.');
      throw error;
    }
  }

  function addDocument(title: string, type: string) {
    setDocuments(previous => [{
      id: Date.now().toString(),
      title,
      type,
      date: new Date().toLocaleDateString('fr-FR'),
      size: '1,2 Mo',
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
    appointments,
    doctors,
    loadingAppointments,
    documents,
    bloodGroup,
    setBloodGroup,
    allergies,
    setAllergies,
    emergencyContact,
    setEmergencyContact,
    isEditingRecord,
    setIsEditingRecord,
    bookAppointment,
    rescheduleAppointment,
    cancelPatientAppointment,
    addDocument,
    deleteDocument,
    saveMedicalRecord,
  };
}
