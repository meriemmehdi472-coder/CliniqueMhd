# CliniqueMhd

CliniqueMhd est une plateforme web de gestion de rendez-vous médicaux.

> **Accès rapides :**
> - 🚀 **Production :** [cliniquemhd-prod.fly.dev](https://cliniquemhd-prod.fly.dev)
> - 🧪 **Préproduction :** [cliniquemhd-preprod.fly.dev](https://cliniquemhd-preprod.fly.dev)

## Objectif

Permettre aux patients de prendre rendez-vous avec un médecin et faciliter la gestion des rendez-vous par le personnel de la clinique.

## Technologies

- React / Vite (TypeScript)
- Ruby on Rails (API / Backend)
- PostgreSQL

## Structure

```text
CliniqueMhd/
├── frontend/
├── backend/
├── bin/
│   └── dev-local
├── docs/
└── README.md
```

## 🚀 Démarrage en développement local

Pour lancer simultanément le serveur backend (Rails sur le port `3000`) et le serveur frontend (Vite sur le port `5173`), utilisez la commande unique :

```bash
bin/dev-local
```

Cette commande gère également l'arrêt propre des deux serveurs lors d'un `Ctrl+C`.

## 📌 Fonctionnalités (Branche v1.0.1)

Le tableau de bord patient intègre des affichages temporaires interactifs pour :
- **Prendre un rendez-vous** : Sélection de spécialité et de date avec simulation de confirmation.
- **Envoyer un document** : Espace de téléversement simulé de pièces justificatives (ordonnances, examens).
- **Mon dossier médical** : Consultation de la synthèse médicale et des informations patient.
