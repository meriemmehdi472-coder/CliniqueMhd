# 📋 Présentation de la Démo 2 : CliniqueMhd

Ce document sert de support de présentation et de script pour la **Démo 2** du projet **CliniqueMhd** (Plateforme de gestion de rendez-vous médicaux).

---

## 🧭 Sommaire de la Présentation

1. **Introduction & Objectif du Projet**
2. **Environnement et Architecture**
   - Organisation du Repository & Workflow Git
   - Guide d'installation et environnements
3. **Containerisation (Docker)**
   - Architecture multi-stage (Frontend + Backend + Nginx)
4. **Architecture Logicielle (MVC & API)**
5. **Intégration Continue (CI)**
   - Pipeline GitHub Actions (Tests front, back, base de données)
6. **Déploiement Continu & Cloud (CD)**
   - Fly.io (Préproduction & Production)
7. **Conclusion & Démonstration**

---

## 📽️ Détail des Slides & Discours

### Slide 1 : Introduction & Objectif
- **Titre :** CliniqueMhd - Plateforme de Gestion Médicale
- **Points clés :**
  - Permettre aux patients de réserver des rendez-vous en ligne.
  - Faciliter la gestion des plannings pour le personnel médical.
- **Discours / Pitch :** 
  > "Bonjour à tous. Pour cette Démo 2, nous vous présentons l'état d'avancement de **CliniqueMhd**, une solution web moderne de gestion de rendez-vous médicaux. Notre objectif aujourd'hui est de vous démontrer la robustesse de notre socle technique, de notre architecture conteneurisée et de notre pipeline CI/CD entièrement automatisé."

---

### Slide 2 : Environnement & Workflow Git
- **Titre :** Structuration & Organisation du Projet
- **Points clés :**
  - Architecture monorepo claire (`frontend/` en React/TypeScript, `backend/` en Ruby on Rails).
  - Workflow Git basé sur des branches de fonctionnalités et deux environnements cibles (`develop` pour la préprod, `main` pour la prod).
  - `README.md` détaillé pas à pas pour la prise en main par tout nouveau développeur.
- **Discours :**
  > "Nous avons structuré notre dépôt sous forme de monorepo clairement séparé entre le frontend et le backend. Nous appliquons un workflow Git rigoureux : les modifications transitent par des branches de développement avant d'être fusionnées sur `develop` (préproduction) puis `main` (production). Le README fournit toutes les instructions nécessaires pour cloner et lancer le projet en quelques commandes."

---

### Slide 3 : Containerisation (Docker)
- **Titre :** Une Containerisation Unifiée (Docker)
- **Points clés :**
  - `Dockerfile` multi-stage haute performance :
    1. Compilation du Frontend (Node 22).
    2. Compilation des gems Ruby (Ruby 3.2.9).
    3. Image finale combinant **Nginx** (serveur web & reverse proxy) et **Ruby on Rails** (API backend sur le port 3000).
  - `docker-compose.yml` pour le développement local avec PostgreSQL 16.
- **Discours :**
  > "Pour garantir que l'application s'exécute de la même manière en local, en test et en production, nous avons conçu un `Dockerfile` multi-stage optimisé. Il compile le frontend React, prépare le backend Rails, et assemble le tout dans une image unique propulsée par Nginx et un script d'initialisation, garantissant un déploiement ultra-fiable."

---

### Slide 4 : Architecture Logicielle
- **Titre :** Choix Architecturaux
- **Points clés :**
  - **Backend :** Ruby on Rails 7 (Pattern **MVC**, Active Record, migrations PostgreSQL).
  - **Frontend :** React 18 + TypeScript + Vite (Architecture par composants, typage strict).
  - **Communication :** API REST sécurisée (JSON), routage SPA géré par Nginx avec fallback sur `index.html`.
- **Discours :**
  > "Côté architecture, nous utilisons Ruby on Rails pour sa productivité et sa robustesse avec le pattern MVC, couplé à une base de données PostgreSQL. Le frontend est une Single Page Application en React et TypeScript. Le tout communique via une API REST propre, avec un routage géré efficacement par Nginx."

---

### Slide 5 : Intégration Continue (CI)
- **Titre :** Pipeline CI (GitHub Actions)
- **Points clés :**
  - **Job Frontend :** Installation des dépendances (`npm ci`), vérification du lintage (`npm run lint`) et build de production (`npm run build`).
  - **Job Backend :** Exécution des tests unitaires et d'intégration (`bin/rails test`) avec un service PostgreSQL 16 éphémère.
  - **Job Docker :** Test de construction de l'image Docker globale pour valider l'intégrité avant tout déploiement.
- **Discours :**
  > "Notre intégration continue sur GitHub Actions veille à la qualité du code à chaque commit. Elle lance en parallèle les vérifications frontend, les tests unitaires backend avec une vraie base PostgreSQL, et valide la construction de l'image Docker pour éliminer toute régression avant la mise en production."

---

### Slide 6 : Déploiement Continu (CD) & Cloud
- **Titre :** Stratégie de Déploiement (Fly.io)
- **Points clés :**
  - **Environnement de Préproduction (`develop`) :** Application `cliniquemhd-preprod` (`fly.rehearsal.toml`).
  - **Environnement de Production (`main`) :** Application `cliniquemhd-prod` (`fly.toml`).
  - Déploiement entièrement automatisé via le pipeline dès qu'un merge est validé.
- **Discours :**
  > "Enfin, notre pipeline gère le déploiement continu sur Fly.io. Les modifications sur la branche `develop` sont automatiquement déployées sur notre environnement de préproduction, tandis que la branche `main` met à jour la production. Tout est sécurisé via des tokens d'API chiffrés sur GitHub."

---

## ✅ Checklist de Validation pour la Démo

- [x] Dépôt GitHub propre et structuré (`frontend`, `backend`, `docs`)
- [x] `README.md` complet avec guide d'installation et liens vers les environnements
- [x] Application fonctionnelle en local (via Docker Compose)
- [x] Pipeline CI/CD fonctionnel (GitHub Actions : Lint + Tests + Docker + Deploy Fly.io)
- [x] Environnements de préproduction et production opérationnels

---
*Fin du document de présentation - Bon courage pour votre Démo 2 !*
