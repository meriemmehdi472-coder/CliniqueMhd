import { useState } from 'react';
import { usePatientDashboard } from '../../hooks/usePatientDashboard';
import { useToast } from '../../hooks/useToast';
import type { AuthUser, DashboardSection } from '../../types/clinic';
import { AppointmentSection } from './AppointmentSection';
import { DocumentSection } from './DocumentSection';
import { HomeSection } from './HomeSection';
import { MedicalRecordSection } from './MedicalRecordSection';
import { ProfileSection } from './ProfileSection';
import { Sidebar } from './Sidebar';

export function PatientDashboard({ user, onLogout }: { user: AuthUser; onLogout: () => Promise<void> }) {
  const [activeSection, setActiveSection] = useState<DashboardSection>('accueil');
  const { message, showToast } = useToast();
  const dashboard = usePatientDashboard(showToast);

  function goHome() { setActiveSection('accueil'); }

  return <div className="min-h-screen bg-slate-50 md:flex">
    {message && <div role="status" aria-live="polite" className="fixed right-5 top-5 z-50 max-w-sm rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-xl">{message}</div>}
    <Sidebar active={activeSection} onNavigate={setActiveSection} onLogout={() => {
      void onLogout().catch(() => showToast('La déconnexion a échoué. Réessayez.'));
    }} />
    <main className="min-w-0 flex-1 p-5 sm:p-8 lg:p-10">
      {activeSection === 'accueil' && <HomeSection
        name={user.prenom || 'patient'} appointments={dashboard.appointments} documents={dashboard.documents}
        onNavigate={setActiveSection} onToggleAppointment={dashboard.toggleAppointment}
        onDeleteDocument={dashboard.deleteDocument} showToast={showToast}
      />}
      {activeSection === 'rdv' && <AppointmentSection onBook={dashboard.bookAppointment} onBack={goHome} />}
      {activeSection === 'document' && <DocumentSection onUpload={dashboard.addDocument} onBack={goHome} />}
      {activeSection === 'dossier' && <MedicalRecordSection
        bloodGroup={dashboard.bloodGroup} setBloodGroup={dashboard.setBloodGroup}
        allergies={dashboard.allergies} setAllergies={dashboard.setAllergies}
        emergencyContact={dashboard.emergencyContact} setEmergencyContact={dashboard.setEmergencyContact}
        editing={dashboard.isEditingRecord} setEditing={dashboard.setIsEditingRecord}
        onSave={dashboard.saveMedicalRecord} onBack={goHome}
      />}
      {activeSection === 'parametres' && <ProfileSection user={user} onBack={goHome} showToast={showToast} />}
    </main>
  </div>;
}
