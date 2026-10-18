import { useState } from 'react';
import './App.css';

interface Appointment {
  id: string;
  specialty: string;
  doctor: string;
  date: string;
  time: string;
  status: 'confirmé' | 'annulé';
}

interface DocumentItem {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
}

function App() {
  const [activeMenu, setActiveMenu] = useState<'accueil' | 'rdv' | 'document' | 'dossier' | 'parametres'>('accueil');
  const [patientName, setPatientName] = useState('Firstname');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Appointments state
  const [appointments, setAppointments] = useState<Appointment[]>([
    { id: '1', specialty: 'Médecine générale', doctor: 'Dr. Jean Martin', date: '2026-07-09', time: '10:30', status: 'confirmé' }
  ]);

  // New appointment form state
  const [specialty, setSpecialty] = useState('Médecine générale');
  const [doctor, setDoctor] = useState('Dr. Jean Martin');
  const [rdvDate, setRdvDate] = useState('2026-07-15');
  const [rdvTime, setRdvTime] = useState('14:00');

  // Documents state
  const [documents, setDocuments] = useState<DocumentItem[]>([
    { id: '1', title: 'Ordonnance - Consultation générale', type: 'Ordonnance', date: '02/07/2026', size: '245 Ko' }
  ]);
  const [docTitle, setDocTitle] = useState('');
  const [docType, setDocType] = useState('Ordonnance');

  // Medical record state
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [allergies, setAllergies] = useState('Aucune signalée');
  const [emergencyContact, setEmergencyContact] = useState('Marie Martin (06 12 34 56 78)');
  const [isEditingRecord, setIsEditingRecord] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleBookAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    const newApt: Appointment = {
      id: Date.now().toString(),
      specialty,
      doctor,
      date: rdvDate,
      time: rdvTime,
      status: 'confirmé'
    };
    setAppointments([newApt, ...appointments]);
    showToast('✅ Rendez-vous réservé avec succès !');
    setActiveMenu('accueil');
  };

  const handleCancelAppointment = (id: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status: a.status === 'confirmé' ? 'annulé' : 'confirmé' } : a));
    showToast('🔄 Statut du rendez-vous mis à jour.');
  };

  const handleUploadDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      showToast('⚠️ Veuillez entrer un titre pour le document.');
      return;
    }
    const newDoc: DocumentItem = {
      id: Date.now().toString(),
      title: docTitle,
      type: docType,
      date: new Date().toLocaleDateString('fr-FR'),
      size: '1.2 Mo'
    };
    setDocuments([newDoc, ...documents]);
    setDocTitle('');
    showToast('📄 Document envoyé et sécurisé avec succès !');
    setActiveMenu('accueil');
  };

  const handleDeleteDocument = (id: string) => {
    setDocuments(documents.filter(d => d.id !== id));
    showToast('🗑️ Document supprimé.');
  };

  const handleSaveMedicalRecord = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingRecord(false);
    showToast('💾 Dossier médical mis à jour avec succès.');
  };

  const activeAppointment = appointments.find(a => a.status === 'confirmé');

  return (
    <div className="dashboard-layout">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification">
          {toastMessage}
        </div>
      )}

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-brand">
          <span className="brand-icon">🩺</span>
          <span className="brand-name">Clinique<span className="accent">Mhd</span></span>
        </div>

        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeMenu === 'accueil' ? 'active' : ''}`}
            onClick={() => setActiveMenu('accueil')}
          >
            <span className="nav-icon">🏠</span> Accueil
          </button>
          <button 
            className={`nav-item ${activeMenu === 'rdv' ? 'active' : ''}`}
            onClick={() => setActiveMenu('rdv')}
          >
            <span className="nav-icon">📅</span> Prendre un rendez-vous
          </button>
          <button 
            className={`nav-item ${activeMenu === 'document' ? 'active' : ''}`}
            onClick={() => setActiveMenu('document')}
          >
            <span className="nav-icon">📄</span> Envoyer un document
          </button>
          <button 
            className={`nav-item ${activeMenu === 'dossier' ? 'active' : ''}`}
            onClick={() => setActiveMenu('dossier')}
          >
            <span className="nav-icon">📁</span> Mon dossier médical
          </button>
          <button 
            className={`nav-item ${activeMenu === 'parametres' ? 'active' : ''}`}
            onClick={() => setActiveMenu('parametres')}
          >
            <span className="nav-icon">⚙️</span> Paramètres & Profil
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeMenu === 'accueil' && (
          <>
            {/* Header Greeting */}
            <div className="content-header">
              <h1>Bonjour {patientName} 👋</h1>
              <p>Bienvenue sur votre espace patient sécurisé</p>
            </div>

            {/* Upcoming Appointment Banner */}
            {activeAppointment ? (
              <div className="appointment-banner">
                <div className="banner-info">
                  <span className="banner-icon">📅</span>
                  <div className="banner-text">
                    <span className="banner-label">Prochain rendez-vous ({activeAppointment.specialty})</span>
                    <span className="banner-date">{activeAppointment.doctor} — {activeAppointment.date} à {activeAppointment.time}</span>
                  </div>
                </div>
                <button className="btn-cancel" onClick={() => handleCancelAppointment(activeAppointment.id)}>
                  Annuler
                </button>
              </div>
            ) : (
              <div className="appointment-banner cancelled">
                <div className="banner-info">
                  <span className="banner-text">Aucun rendez-vous actif pour le moment.</span>
                </div>
                <button className="btn-primary" onClick={() => setActiveMenu('rdv')}>
                  Prendre un rendez-vous
                </button>
              </div>
            )}

            {/* Action Cards Grid */}
            <div className="action-cards-grid">
              <div className="action-card" onClick={() => setActiveMenu('rdv')}>
                <div className="card-top-icon">📅</div>
                <h3>Prendre un rendez-vous</h3>
                <p>Choisissez un créneau avec votre médecin</p>
              </div>

              <div className="action-card" onClick={() => setActiveMenu('document')}>
                <div className="card-top-icon">📄</div>
                <h3>Envoyer un document</h3>
                <p>Partagez une pièce jointe à votre clinique</p>
              </div>

              <div className="action-card" onClick={() => setActiveMenu('dossier')}>
                <div className="card-top-icon">📁</div>
                <h3>Mon dossier médical</h3>
                <p>Consultez vos informations de santé</p>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="bottom-section-grid">
              {/* Recent Documents */}
              <div className="documents-card">
                <h3>Mes documents ({documents.length})</h3>
                <div className="doc-table-header">
                  <span>Document</span>
                  <span>Date</span>
                  <span>Action</span>
                </div>
                {documents.length > 0 ? (
                  documents.map(doc => (
                    <div className="doc-row" key={doc.id}>
                      <span className="doc-title">{doc.title} <small>({doc.size})</small></span>
                      <span className="doc-date">{doc.date}</span>
                      <div className="doc-actions">
                        <button className="btn-download" onClick={() => showToast(`📥 Téléchargement de "${doc.title}"...`)}>Télécharger</button>
                        <button className="btn-delete" onClick={() => handleDeleteDocument(doc.id)}>Supprimer</button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="empty-doc-box">
                    Aucun document enregistré
                  </div>
                )}
              </div>

              {/* Welcome Info Purple Card */}
              <div className="info-purple-card">
                <p className="info-title">Espace Patient Interactif</p>
                <p className="info-desc">
                  Tous les boutons de votre tableau de bord sont désormais fonctionnels. Gérez vos <strong>rendez-vous</strong>, <strong>documents</strong> et <strong>dossier médical</strong> en temps réel.
                </p>
              </div>
            </div>
          </>
        )}

        {activeMenu === 'rdv' && (
          <div className="temporary-view">
            <div className="content-header">
              <h1>📅 Prendre un rendez-vous</h1>
              <p>Sélectionnez votre spécialité, votre médecin et votre créneau</p>
            </div>
            <div className="temp-card">
              <h3>Planification d'une consultation</h3>
              <form onSubmit={handleBookAppointment} className="temp-form">
                <div className="form-group">
                  <label>Spécialité médicale</label>
                  <select 
                    className="temp-input"
                    value={specialty}
                    onChange={(e) => {
                      setSpecialty(e.target.value);
                      if (e.target.value === 'Cardiologie') setDoctor('Dr. Sophie Bernard');
                      else if (e.target.value === 'Dermatologie') setDoctor('Dr. Marc Leroy');
                      else setDoctor('Dr. Jean Martin');
                    }}
                  >
                    <option value="Médecine générale">Médecine générale</option>
                    <option value="Cardiologie">Cardiologie</option>
                    <option value="Dermatologie">Dermatologie</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Médecin traitant / praticien</label>
                  <input 
                    type="text" 
                    className="temp-input" 
                    value={doctor} 
                    onChange={(e) => setDoctor(e.target.value)}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Date souhaitée</label>
                    <input 
                      type="date" 
                      className="temp-input" 
                      value={rdvDate} 
                      onChange={(e) => setRdvDate(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Heure</label>
                    <select 
                      className="temp-input" 
                      value={rdvTime} 
                      onChange={(e) => setRdvTime(e.target.value)}
                    >
                      <option value="09:00">09:00</option>
                      <option value="10:30">10:30</option>
                      <option value="14:00">14:00</option>
                      <option value="16:30">16:30</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn-primary">
                  Confirmer la réservation
                </button>
              </form>

              <button className="btn-secondary" onClick={() => setActiveMenu('accueil')}>
                ← Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {activeMenu === 'document' && (
          <div className="temporary-view">
            <div className="content-header">
              <h1>📄 Envoyer un document</h1>
              <p>Téléversez vos pièces justificatives et ordonnances en toute sécurité</p>
            </div>
            <div className="temp-card">
              <h3>Partage de pièces justificatives</h3>
              <form onSubmit={handleUploadDocument} className="temp-form">
                <div className="form-group">
                  <label>Titre / Description du document</label>
                  <input 
                    type="text" 
                    className="temp-input" 
                    placeholder="Ex: Analyse de sang laboratoire" 
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Type de document</label>
                  <select 
                    className="temp-input"
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                  >
                    <option value="Ordonnance">Ordonnance</option>
                    <option value="Compte-rendu">Compte-rendu d'examen</option>
                    <option value="Carte Vitale">Carte Vitale / Mutuelle</option>
                    <option value="Autre">Autre</option>
                  </select>
                </div>

                <div className="dropzone-sim">
                  <span>📁 Fichier sélectionné (simulation PDF / Image sécurisée)</span>
                </div>

                <button type="submit" className="btn-primary">
                  Transmettre le document
                </button>
              </form>

              <button className="btn-secondary" onClick={() => setActiveMenu('accueil')}>
                ← Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {activeMenu === 'dossier' && (
          <div className="temporary-view">
            <div className="content-header">
              <h1>📁 Mon dossier médical</h1>
              <p>Consultez et mettez à jour vos informations de santé</p>
            </div>
            <div className="temp-card">
              <h3>Synthèse médicale sécurisée</h3>
              
              {!isEditingRecord ? (
                <>
                  <div className="medical-summary-list">
                    <div className="med-item">
                      <strong>Médecin référent :</strong> Dr. Jean Martin
                    </div>
                    <div className="med-item">
                      <strong>Groupe sanguin :</strong> {bloodGroup}
                    </div>
                    <div className="med-item">
                      <strong>Allergies connues :</strong> {allergies}
                    </div>
                    <div className="med-item">
                      <strong>Contact d'urgence :</strong> {emergencyContact}
                    </div>
                  </div>
                  <button className="btn-primary" onClick={() => setIsEditingRecord(true)}>
                    Modifier mes informations médicales
                  </button>
                </>
              ) : (
                <form onSubmit={handleSaveMedicalRecord} className="temp-form">
                  <div className="form-group">
                    <label>Groupe sanguin</label>
                    <input 
                      type="text" 
                      className="temp-input" 
                      value={bloodGroup} 
                      onChange={(e) => setBloodGroup(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Allergies connues</label>
                    <input 
                      type="text" 
                      className="temp-input" 
                      value={allergies} 
                      onChange={(e) => setAllergies(e.target.value)} 
                    />
                  </div>
                  <div className="form-group">
                    <label>Contact d'urgence</label>
                    <input 
                      type="text" 
                      className="temp-input" 
                      value={emergencyContact} 
                      onChange={(e) => setEmergencyContact(e.target.value)} 
                    />
                  </div>
                  <button type="submit" className="btn-primary">
                    Enregistrer les modifications
                  </button>
                </form>
              )}

              <button className="btn-secondary" onClick={() => setActiveMenu('accueil')}>
                ← Retour à l'accueil
              </button>
            </div>
          </div>
        )}

        {activeMenu === 'parametres' && (
          <div className="temporary-view">
            <div className="content-header">
              <h1>⚙️ Paramètres & Profil</h1>
              <p>Gérez vos préférences de compte</p>
            </div>
            <div className="temp-card">
              <h3>Informations personnelles</h3>
              <div className="temp-form">
                <div className="form-group">
                  <label>Prénom du patient</label>
                  <input 
                    type="text" 
                    className="temp-input" 
                    value={patientName} 
                    onChange={(e) => setPatientName(e.target.value)} 
                  />
                </div>
                <div className="form-group">
                  <label>Email de contact</label>
                  <input 
                    type="email" 
                    className="temp-input" 
                    defaultValue="patient@cliniquemhd.fr" 
                  />
                </div>
                <button className="btn-primary" onClick={() => showToast('✨ Profil mis à jour avec succès !')}>
                  Mettre à jour le profil
                </button>
              </div>

              <button className="btn-secondary" onClick={() => setActiveMenu('accueil')}>
                ← Retour à l'accueil
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
