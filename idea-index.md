# Index des idées — Logiciel de Maturation

> Dernière mise à jour : 2026-04-06 17:00
> Format : `[code-lowercase]/idea.md` (état courant) + `[code-lowercase]/history.md` (table des matières) + `[code-lowercase]/history/` (fichiers par step)

---

## 🌳 Matures

| Code | Titre court | Tags | Connexions |
|------|-------------|------|------------|
| [APP-MOBILE-GRID](app-mobile-grid/idea.md) | Navigation en grille mobile (droite=clone, bas=étape) | mobile, UX, grille | SKILL-MEMOIRE, APP-PERSONNALITE |
| [APP-PERSONNALITE](app-personnalite/idea.md) | App de test de personnalité — profil vectoriel évolutif | app, psychologie, mobile | APP-MOBILE-GRID, MOTEUR-CATEGORISATION |
| [AGENTS-REGISTRY](agents-registry/idea.md) | Registre centralisé auto-enregistrement & reporting d'agents | agent, registry, distributed | MATURATION, TIMELINE-CATALOG |
| [CSS-3D-LANGUAGE](css-3d-language/idea.md) | Langage CSS 3D réel avec héritage DOM | CSS, 3D, moteur, langage | MOTEUR-ANIMATION-CLIP |
| [CSS-OVERFLOW-COMPONENT](css-overflow-component/idea.md) | Pseudo-composant overflow 100% hauteur conteneur | CSS, layout, overflow | CSS-3D-LANGUAGE, WEBCOMPONENT-NAMING |
| [IA-BOX](ia-box/idea.md) | Boîtier IA local type SteamBox | hardware, IA, embarqué | SKILL-MEMOIRE, AGENTS-REGISTRY |
| [INTERFACE-BRIDGE](interface-bridge/idea.md) | Programme LLM de compatibilité entre interfaces | LLM, interop, prompt | MONGO-GROUPBY, SKILL-MEMOIRE |
| [MATURATION-SLIDER](maturation-slider/idea.md) | Interface slider timeline (DAG) pour idea-MATURATION | UI, slider, historique | MATURATION, TIMELINE-CATALOG |
| [MONGO-GROUPBY](mongo-groupby/idea.md) | Remplacer MongoDB.aggregate par groupBy/join | MongoDB, SQL, DX | INTERFACE-BRIDGE, MOTEUR-CATEGORISATION |
| [MOTEUR-ANIMATION-CLIP](moteur-animation-clip/idea.md) | Moteur 2D basé sur clip-path | CSS, clip-path, animation | CSS-3D-LANGUAGE |
| [MOTEUR-CATEGORISATION](moteur-categorisation/idea.md) | Moteur ontologique de catégorisation du monde | ontologie, DAG, graph | MATURATION, SKILL-MEMOIRE, APP-PERSONNALITE |
| [SKILL-COMMITS-ROMANESQUE](skill-commits-romanesque/idea.md) | Skill qui transforme l'historique git en roman | git, narration, LLM | MATURATION, SKILL-MEMOIRE |
| [SKILL-EXPLORER](skill-explorer/idea.md) | Explorateur de skills avec navigation liens | skill, graph, navigation | AGENTS-REGISTRY, MATURATION |
| [SKILL-MEMOIRE](skill-memoire/idea.md) | Skill mémoire dégradante à la cerveau, en français | mémoire, LLM, dégradation | TIMELINE-CATALOG, SKILL-STACKOVERFLOW, MOTEUR-CATEGORISATION |
| [SKILL-STACKOVERFLOW](skill-stackoverflow/idea.md) | Skill StackOverflow avec user bots | skill, LLM, bots | SKILL-MEMOIRE, AGENTS-REGISTRY |
| [THEME-LUMINOSITE](theme-luminosite/idea.md) | Thème dark→light adaptatif à la luminosité par paliers | CSS, thème, accessibilité | CSS-OVERFLOW-COMPONENT, APP-MOBILE-GRID |
| [TIMELINE-CATALOG](timeline-catalog/idea.md) | Index temporel du vocabulaire/tags avec score redondance | timeline, index, vocabulary | SKILL-MEMOIRE, AGENTS-REGISTRY, MATURATION-SLIDER |
| [WEBCOMPONENT-NAMING](webcomponent-naming/idea.md) | Nommage inversé et Shadow DOM communicant | Web Components, convention | CSS-OVERFLOW-COMPONENT |

---

## 🌱 En germination

| Code | Titre court | Tags | Connexions |
|------|-------------|------|------------|
| [OPENCLAW-BROWSER-EXTENSION](openclaw-browser-extension/idea.md) | Extension navigateur OpenClaw (sidebar) | openclaw, browser, extension, chrome, sidebar | OPENCLAW-OS-INTEGRATION, OPENCLAW-TAILSCALE-DOMAINS |
| [OPENCLAW-TAILSCALE-DOMAINS](openclaw-tailscale-domains/idea.md) | Sous-domaines Tailscale pour projets OpenClaw | openclaw, tailscale, domaines, HTTPS, deployment | OPENCLAW-OS-INTEGRATION, IDAE-DASHBOARD-MULTI-SCOPES |
| [MES-AMIS-APP](mes-amis-app/idea.md) | App de chat social avec amis IA uniques | social, IA, chat, démo, simulacre | VOICE-MOBILE, EXTENSION-IA-GRATUITE, PERSONAL-AGENT |
| [EXTENSION-IA-GRATUITE](extension-ia-gratuite/idea.md) | Extension agrégateur de quotas IA gratuits | extension, navigateur, IA, gratuit, quota | VOICE-MOBILE, TUI-ALTERNATIVES, PERSONAL-AGENT |
| [AGENT-BMAD-ORCHESTRATION](agent-bmad-orchestration/idea.md) | Agent autonome orchestration projets BMAD | agent, bmad, orchestration, autonome | BMAD-MASTER, AGENT-INBOX-MATURATION |
| [AGENT-INBOX-MATURATION](agent-inbox-maturation/idea.md) | Capture + projets BMAD + rotation 30 | agent, capture, rotation, BMAD | MATURATION, AGENTS-REGISTRY |
| [IDAE-MACHINE-COEUR](idae-machine-coeur/idea.md) | Librairie schema-driven UI (v0.136.0, 186 tests) | core, data, UI, Svelte 5, IndexedDB, validation | QOOLIE, DELTA-SIMCA, MOTEUR-DASHBOARD, IDAE-IDBQL |
| [EMAIL-CONNECTORS](email-connectors/idea.md) | Connecteurs Gmail, Outlook, Proton | email, IMAP, OAuth, Gmail, Outlook, Proton | AGENT-INBOX-MATURATION, VOICE-MOBILE |
| [IDAE-ANDROID-CAPTURE](idae-android-capture/idea.md) | App Android bouton flottant capture maturation | android, app, capture, bouton, mobile, IDAE | AGENT-INBOX-MATURATION, IDAE-MACHINE-COEUR |
| [LATENT-LINE-VS-CAPCUT](latent-line-vs-capcut/idea.md) | Comparatif Latent Line vs CapCut Desktop | comparatif, vidéo, IA, édition, positionnement | LATENT-LINE, MOTEUR-ANIMATION-CLIP |
| [MATURATION-5-ITERATIONS](maturation-5-iterations/idea.md) | Workflow 5 itérations avant BMAD final | maturation, itérations, cron, workflow, notif | MATURATION-BMAD-AUTO, AGENT-INBOX-MATURATION |
| [MATURATION-BMAD-AUTO](maturation-bmad-auto/idea.md) | Génération auto dossier BMAD par maturation | bmad, maturation, auto-génération, dashboard | MATURATION-5-ITERATIONS, MOTEUR-DASHBOARD |
| [MOTEUR-DASHBOARD](moteur-dashboard/idea.md) | Moteur de dashboard générique piloté markdown | dashboard, moteur, plugin, générique | IDAE-DASHBOARD, INTERFACE-BRIDGE, **MATURATION** |
| [TEST-PROTO-INBOX](test-proto-inbox/idea.md) | Test du prototype inbox | prototype, agent, inbox, test | AGENT-INBOX-MATURATION |
| [VOICE-INTERFACE-HISTORIQUE](voice-interface-historique/idea.md) | Interface vocale maturation + historique inbox | voice, TTS, STT, historique | IDAE-ANDROID-CAPTURE, MATURATION, MOTEUR-DASHBOARD |
| [PSEUDO-HTML-AUTO-LEARNING](pseudo-html-auto-learning/idea.md) | Skill pseudo-html auto-apprenante | skill, auto-learning, skiller, test | SKILLER, SKILL-MASTER |
| [BMAD-TEST-ENFORCEMENT](bmad-test-enforcement/idea.md) | Enforcement tests réels avant story complete | bmad, tests, enforcement, quality | BMAD-MASTER, AGENT-BMAD-ORCHESTRATION | **✅ IMPLÉMENTÉ** |
| [CSS-BASE-DEMO-REFONT](css-base-demo-refont/idea.md) | Refonte 10 démos css-base avec nouvelles capacités | css-base, demos, skinning, refonte | CSS-BASE, SKILLER |
| [IDAE-DASHBOARD-MULTI-SCOPES](idae-dashboard-multi-scopes/idea.md) | Architecture multi-scopes (BMAD, Matur, etc.) + colonnes sticky | idae-dashboard, architecture, scopes, sticky | IDAE-DASHBOARD, APP-MOBILE-GRID |
| [OPENCLAW-OS-INTEGRATION](openclaw-os-integration/idea.md) | Icônes agents OpenClaw dans Windows (PWA) | openclaw, Windows, PWA, OS integration | IDAE-ANDROID-CAPTURE (plus tard), VOICE-INTERFACE-HISTORIQUE |
| [PLACE-DE-GREVE](place-de-greve/idea.md) | File d'attente missions pour agents (kanban textuel → skill) | agent, file-attente, mission, kanban, workflow | AGENT-INBOX-MATURATION, AGENT-BMAD-ORCHESTRATION, BMAD-TEST-ENFORCEMENT |
| [VIDEO-FLOTTANTE-PIP](video-floattante-pip/idea.md) | Lecteur vidéo persistant flottant (PIP) | vidéo, PIP, flottant, UX | LATENT-LINE-VS-CAPCUT, MOTEUR-DASHBOARD |

---

## 🗄️ Archivées

| Code | Titre court | Note |
|------|-------------|------|
| [MATURATION](maturation/idea.md) | Logiciel de maturation d'idées (CLI→React→Electron→Mobile) | Phase 1 opérationnelle — en attente d'implémentation Phase 2 (CLI) |

---

## 📝 Notes transversales

- **MATURATION** Phase 1 est **opérationnelle** (ce système de fichiers en est la preuve) — la Phase 2 (CLI Node.js) est le prochain horizon
- **AGENTS-REGISTRY** + **TIMELINE-CATALOG** forment un "système nerveux" naturel pour une flotte d'agents
- **CSS-3D-LANGUAGE** → **MOTEUR-ANIMATION-CLIP** : relation compilateur/backend de rendu (3D projeté en clip-path)
- **SKILL-MEMOIRE** + **TIMELINE-CATALOG** : mémoire avec conscience de son propre état sémantique
- **MOTEUR-CATEGORISATION** est transversal : backend d'indexation pour SKILL-MEMOIRE, taxonomie pour APP-PERSONNALITE
- **SKILL-COMMITS-ROMANESQUE** : candidat MVP rapide, implémentable en quelques heures
- **WEBCOMPONENT-NAMING** → **CSS-OVERFLOW-COMPONENT** : manifeste + cas d'école concret
- Référence vidéo CSS clip-path : https://www.youtube.com/watch?v=oWXm5n-Zi38
- Chaque idée : `[code-lowercase]/idea.md` + `[code-lowercase]/history.md` (table) + `[code-lowercase]/history/` (steps individuels)
- **Aucun script externe** (pas de `validate.mjs` ni autre exécutable) — tout en markdown
