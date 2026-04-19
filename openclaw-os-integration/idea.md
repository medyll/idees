# idea-OPENCLAW-OS-INTEGRATION

**Date initiale :** 2026-04-06  
**Dernière évolution :** 2026-04-06  
**Statut :** en croissance (4 cycles)  
**Tags :** openclaw, mobile, OS integration, web app, icônes, visibilité

## Description

**Problème :** L'application mobile OpenClaw est géniale mais pas assez visible dans le **système d'exploitation Windows**.

**Priorité :** 🪟 **WINDOWS D'ABORD** — Android c'est pour plus tard.

**Idée :** Avoir des icônes qui représentent des agents OpenClaw dans Windows — parmi les applications du menu Démarrer, dans la barre des tâches, ou comme des web apps natives.

**Concept :**
- Un agent OpenClaw apparaît comme une "application Windows"
- Web App / PWA installée via Edge/Chrome
- Chaque agent peut avoir sa propre icône
- S'intègre dans le menu Démarrer, barre des tâches, Alt+Tab
- Plus visible, plus accessible, plus "réel"

**Pourquoi Windows en premier :**
- C'est là que l'utilisateur passe le plus de temps (travail, dev)
- Intégration Windows = accès rapide (Win+numéro, barre des tâches)
- Multi-fenêtres naturel (un agent par fenêtre)
- Notifications Windows natives
- Meilleur contexte pour les agents (code, docs, recherche)

## Potentiel

- OpenClaw devient partie intégrante du workflow Windows
- Accès rapide aux agents depuis la barre des tâches (Win+1, Win+2...)
- Notifications Windows natives (Action Center)
- Multi-fenêtres naturel (un agent par fenêtre)
- Alt+Tab entre les agents comme des apps normales
- Sentiment d'une "vraie" application Windows
- Adoption accrue (plus visible = plus utilisé)

## Questions ouvertes

- Quelle icône pour quel agent ?
- Faut-il une icône générique OpenClaw ou une par agent ?
- Web App 3 : quelles capabilities exploiter ?
- Comment gérer le routing vers le bon agent ?
- Faut-il un manifest PWA par agent ?
- **Comment installer ces PWA sur Windows ?** (Edge/Chrome)
- Faut-il une app hub Windows ou juste des PWA ?

**Connexions**

[IDAEO-ANDROID-CAPTURE](idae-android-capture/idea.md) — App Android (pour plus tard)  
[VOICE-INTERFACE-HISTORIQUE](voice-interface-historique/idea.md) — Interface vocale  
[APP-MOBILE-GRID](app-mobile-grid/idea.md) — Navigation mobile (pour plus tard)

---

## Cycles de Maturation

### Cycle 1/4 — Exploration du problème

**Trigger :** Frustration utilisateur — "c'est génial mais pas assez visible dans le système"

**Insights :**
1. **Visibilité ≠ Fonctionnalité** — OpenClaw est puissant mais "caché" dans une app
2. **Intégration OS = Adoption** — Plus c'est intégré, plus c'est utilisé
3. **Web App 3** — PWA moderne avec capabilities natives (2026)
4. **Icônes = Rappels visuels** — Présence constante dans le launcher

**Questions soulevées :**
- Comment faire coexister app principale + agents individuels ?
- Faut-il synchroniser l'état entre les icônes ?
- Quel est le meilleur point d'entrée ?

---

### Cycle 2/4 — Architecture technique

**Décisions :**
1. **PWA par agent** — Chaque agent a son propre manifest PWA
2. **Routing intelligent** — L'URL encode l'agent cible (`?agent=cortana`)
3. **Icônes personnalisables** — Utilisateur choisit l'icône par agent
4. **Shared state** — IndexedDB sync entre les PWA (même origine)

**Stack technique :**
- **Manifest PWA** — Un par agent (`/manifest.json?agent=cortana`)
- **Service Worker** — Partagé, gère routing + cache
- **IndexedDB** — State partagé entre les PWA
- **Web App 3 APIs** — File handling, notifications, shortcuts

**Schéma :**
```
Windows Desktop
├── Barre des tâches
│   ├── [Cortana] ← PWA agent épinglé
│   ├── [Main] ← PWA agent épinglé
│   └── [Autres agents...]
├── Menu Démarrer
│   └── Dossier "OpenClaw Agents"
└── Alt+Tab
    └── Chaque agent = fenêtre distincte

Toutes pointent vers → https://gateway.openclaw.ai/?agent=<id>
```

**Avantages Windows vs Android :**
- ✅ Multi-fenêtres naturel (pas de limite)
- ✅ PWA illimitées (pas de restriction comme iOS)
- ✅ Edge/Chrome support complet PWA
- ✅ Notifications Windows natives (Action Center)
- ✅ Raccourcis clavier (Win+1, Win+2...)
- ✅ Alt+Tab entre les agents

**Problèmes identifiés :**
- Faut-il une app "hub" Windows aussi ?
- Comment gérer la synchronisation entre les fenêtres ?

---

### Cycle 3/4 — UX & Installation (Windows)

**Flux d'installation :**
1. Utilisateur ouvre OpenClaw dans Edge ou Chrome
2. Menu "Apps" → "Installer OpenClaw - [Agent]"
3. PWA s'installe comme une app Windows
4. Icône dans le Menu Démarrer
5. Utilisateur épingle à la barre des tâches (clic droit)
6. Au clic → ouvre directement l'agent dans sa fenêtre

**Personnalisation :**
- **Icônes** — Bibliothèque d'icônes ou upload personnalisé
- **Nom** — Utilisateur nomme son agent ("Cortana", "Main", etc.)
- **Couleur** — Badge de couleur par agent

**Capabilities Web App 3 (Windows) :**
- ✅ Notifications push (Windows Action Center)
- ✅ Shortcuts d'actions (clic droit sur l'icône)
- ✅ File handling (ouvrir des fichiers dans l'agent)
- ✅ Badges (nombre de messages non lus)
- ✅ Background sync (messages en attente)
- ✅ Multi-fenêtres (une fenêtre par agent)
- ✅ Alt+Tab natif entre les agents

**Avantages Edge/Chrome sur Windows :**
- Edge : "Apps" feature intégrée, très fluide
- Chrome : PWA support complet
- Les deux permettent multi-PWA par origine
- Pas de limite comme iOS

---

### Cycle 4/4 — Roadmap & MVP

**MVP (Phase 1 — 2 semaines) :**
1. **Manifest PWA dynamique** — Généré par agent (`/manifest.json?agent=<id>`)
2. **Service Worker** — Routing + cache stratégique
3. **Guide d'installation** — Page "/install" avec instructions Android/iOS
4. **Icônes par défaut** — 10 icônes prédéfinies (une par agent type)

**Phase 2 (1 mois) :**
1. **Personnalisation icônes** — Upload ou bibliothèque
2. **Notifications push** — Par agent (configurables)
3. **Shortcuts** — Actions rapides (appui long)
4. **Badge unread** — Compteur de messages

**Phase 3 (2 mois) :**
1. **App hub native Android** — Liste tous les agents installés
2. **Sync state** — IndexedDB sync entre PWA
3. **File handling** — Ouvrir fichiers dans l'agent
4. **Background sync** — Messages en attente

**Critères de succès :**
- ✅ Utilisateur peut installer 5+ agents comme PWA
- ✅ Notifications fonctionnent par agent
- ✅ Icônes personnalisables
- ✅ State sync entre les PWA
- ✅ iOS + Android supportés (avec limitations iOS documentées)

**Risques :**
- ⚠️ iOS limite les PWA → documenter clairement
- ⚠️ Multi-PWA = complexité de sync → IndexedDB + broadcast channel
- ⚠️ Icônes personnalisées = stockage → CDN ou local only

---

## Synthèse Finale

**Décision :** **GO** — Cette idée mérite d'être développée.

**Pourquoi :**
1. **Problème réel** — Visibilité insuffisante dans Windows
2. **Solution viable** — PWA + Web App 3 capabilities
3. **Impact fort** — Adoption accrue, usage quotidien
4. **Faisable** — Tech existante, MVP en 2 semaines

**Prochaine action :** ✅ FAIT — Projet BMAD créé `openclaw-windows-pwa`

**Statut actuel :**
- PRD : ✅ Complet (7.2 KB)
- Architecture : ✅ Complète (13.3 KB)
- Sprint 1 stories : ✅ Créées (3 stories)
- En attente : Implémentation S1-01 (Manifest PWA)

**Connexions finales :**
- [IDAEO-ANDROID-CAPTURE](idae-android-capture/idea.md) — App Android à utiliser comme hub
- [VOICE-INTERFACE-HISTORIQUE](voice-interface-historique/idea.md) — Agents vocaux accessibles via icônes
- [APP-MOBILE-GRID](app-mobile-grid/idea.md) — Navigation à adapter pour multi-agents
