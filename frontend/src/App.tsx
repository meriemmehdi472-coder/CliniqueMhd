import { useState } from 'react';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState<'accueil' | 'rdv' | 'document' | 'dossier'>('accueil');
  const [appointmentCancelled, setAppointmentCancelled] = useState(false);
  const [rdvSubmitted, setRdvSubmitted] = useState(false);
  const [docUploaded, setDocUploaded] = useState(false);

  return (
    <div className="dashboard-layout">
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeMenu === 'accueil' && (
          <>
            {/* Header Greeting */}
            <div className="content-header">
              <h1>Bonjour Firstname 👋</h1>
              <p>Bienvenue sur votre espace patient</p>
            </div>

            {/* Upcoming Appointment Banner */}
            {!appointmentCancelled ? (
              <div className="appointment-banner">
                <div className="banner-info">
                  <span className="banner-icon">📅</span>
                  <div className="banner-text">
                    <span className="banner-label">Votre prochain rendez-vous</span>
                    <span className="banner-date">Lundi 9 juillet — 10:30</span>
                  </div>
                </div>
                <button className="btn-cancel" onClick={() => setAppointmentCancelled(true)}>
                  Annuler
                </button>
              </div>
            ) : (
              <div className="appointment-banner cancelled">
                <div className="banner-info">
                  <span className="banner-text">Votre rendez-vous a été annulé.</span>
                </div>
                <button className="btn-cancel" onClick={() => setAppointmentCancelled(false)}>
                  Restaurer
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
                <h3>Mes documents récents</h3>
                <div className="doc-table-header">
                  <span>Document</span>
                  <span>Date</span>
                  <span>Action</span>
                </div>
                <div className="doc-row">
                  <span className="doc-title">Ordonnance</span>
                  <span className="doc-date">02/07/2026</span>
                  <button className="btn-download" onClick={() => alert('Téléchargement du document...')}>Télécharger</button>
                </div>
                <div className="empty-doc-box">
                  Aucun autre document
                </div>
              </div>

              {/* Welcome Info Purple Card */}
              <div className="info-purple-card">
                <p className="info-title">Bienvenue sur votre espace.</p>
                <p className="info-desc">
                  Gérez vos <strong>rendez-vous</strong> et <strong>documents médicaux</strong> en toute sécurité, directement depuis votre ordinateur.
                </p>
              </div>
            </div>
          </>
        )}

        {activeMenu === 'rdv' && (
          <div className="temporary-view">
            <div className="content-header">
              <h1>📅 Prendre un rendez-vous</h1>
              <p>Affichage temporaire - Module de prise de rendez-vous</p>
            </div>
            <div className="temp-card">
              <h3>Planification d'une consultation</h3>
              <p className="temp-desc">Ce module interactif de prise de rendez-vous est actuellement en cours de développement.</p>
              {rdvSubmitted ? (
                <div className="success-alert">
                  ✅ Votre demande de rendez-vous temporaire a bien été enregistrée !
                </div>
              ) : (
                <div className="temp-form">
                  <div className="form-group">
                    <label>Spécialité médicale</label>
                    <select className="temp-input">
                      <option>Médecine générale</option>
                      <option>Cardiologie</option>
                      <option>Dermatologie</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Date souhaitée</label>
                    <input type="date" className="temp-input" defaultValue="2026-07-15" />
                  </div>
                  <button className="btn-primary" onClick={() => setRdvSubmitted(true)}>
                    Confirmer le rendez-vous (Simulation)
                  </button>
                </div>
              )}
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
              <p>Affichage temporaire - Module de téléversement de documents</p>
            </div>
            <div className="temp-card">
              <h3>Partage de pièces justificatives</h3>
              <p className="temp-desc">Ce module temporaire permet de simuler l'envoi de documents médicaux ou administratifs.</p>
              {docUploaded ? (
                <div className="success-alert">
                  ✅ Votre document a été transmis avec succès (simulation) !
                </div>
              ) : (
                <div className="temp-form">
                  <div className="form-group">
                    <label>Type de document</label>
                    <select className="temp-input">
                      <option>Ordonnance</option>
                      <option>Compte-rendu d'examen</option>
                      <option>Carte Vitale / Mutuelle</option>
                    </select>
                  </div>
                  <div className="dropzone-sim">
                    <span>📁 Glissez-déposez votre fichier ici ou cliquez pour parcourir</span>
                  </div>
                  <button className="btn-primary" onClick={() => setDocUploaded(true)}>
                    Envoyer le document (Simulation)
                  </button>
                </div>
              )}
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
              <p>Affichage temporaire - Consultation de l'historique de santé</p>
            </div>
            <div className="temp-card">
              <h3>Synthèse médicale (Affichage temporaire)</h3>
              <p className="temp-desc">Retrouvez ci-dessous un aperçu simulé de vos données de santé.</p>
              
              <div className="medical-summary-list">
                <div className="med-item">
                  <strong>Médecin traitant :</strong> Dr. Jean Martin
                </div>
                <div className="med-item">
                  <strong>Groupe sanguin :</strong> A+
                </div>
                <div className="med-item">
                  <strong>Allergies connues :</strong> Aucune signalée
                </div>
                <div className="med-item">
                  <strong>Dernière consultation :</strong> 02/07/2026 - Consultation de contrôle
                </div>
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
