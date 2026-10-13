import { useState } from 'react';
import './App.css';

function App() {
  const [activeMenu, setActiveMenu] = useState<'accueil' | 'rdv' | 'document' | 'dossier'>('accueil');
  const [appointmentCancelled, setAppointmentCancelled] = useState(false);

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
      </main>
    </div>
  );
}

export default App;
