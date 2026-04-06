# OPENCLAW-BROWSER-EXTENSION — Extension Navigateur pour OpenClaw

**Statut:** 🌱 En germination  
**Créé:** 2026-04-06  
**Dernière mise à jour:** 2026-04-06  
**Tags:** openclaw, browser, extension, chrome, firefox, sidebar, agents

---

## 📋 Description

Créer une extension navigateur (Chrome, Firefox, Edge) pour intégrer OpenClaw directement dans le flux de navigation, permettant d'interagir avec les agents IA sans quitter la page en cours.

---

## 🎯 Problèmes Résolus

**Actuellement:**
- Ouvrir un nouvel onglet pour accéder à OpenClaw
- Perte du contexte de navigation
- Copier-coller manuel du contenu web vers OpenClaw
- Pas d'intégration fluide dans le workflow

**Solution:**
- Sidebar OpenClaw accessible depuis n'importe quelle page
- Capture automatique du contexte (URL, sélection, page complète)
- Interaction avec les agents sans quitter la page
- Raccourcis claviers pour accès rapide

---

## 🏗️ Architecture Proposée

### Option 1: Sidebar Extension (Recommandé)

```
┌─────────────────────────────────────────────────────────────┐
│  Browser Tab: Wikipedia Article                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │  OpenClaw Sidebar                                   │   │
│  │  ┌───────────────────────────────────────────────┐  │   │
│  │  │  🧠 Cortana                                   │  │   │
│  │  │  "Que voulez-vous savoir sur cette page ?"    │  │   │
│  │  │                                               │  │   │
│  │  │  [Capture: Page complète ▼]                   │  │   │
│  │  │  [Analyser ce texte] [Résumer] [Traduire]    │  │   │
│  │  │                                               │  │   │
│  │  │  ╔═══════════════════════════════════════╗   │  │   │
│  │  │  ║ Response de l'agent...                ║   │  │   │
│  │  │  ╚═══════════════════════════════════════╝   │  │   │
│  │  │                                               │  │   │
│  │  │  [💬 Nouvelle conversation]                   │  │   │
│  │  └───────────────────────────────────────────────┘  │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Option 2: Popup Extension

```
┌─────────────────────────────┐
│  🔵 OpenClaw                │
├─────────────────────────────┤
│  Agent: Cortana ▼           │
│                             │
│  Contexte:                  │
│  ☑ Page actuelle            │
│  ☐ Sélection                │
│  ☐ URL                      │
│                             │
│  [Ouvrir la sidebar →]      │
│                             │
│  [⚙ Settings] [❓ Help]     │
└─────────────────────────────┘
```

### Option 3: Context Menu Integration

```
Clic-droit sur sélection →
┌─────────────────────────────┐
│  OpenClaw                   │
│  ├─ 🧠 Cortana             │
│  ├─ 📝 Résumer             │
│  ├─ 🌐 Traduire            │
│  ├─ ❓ Expliquer           │
│  └─ 💬 Discuter...         │
└─────────────────────────────┘
```

---

## 🔧 Fonctionnalités

### MVP (Phase 1)

- [ ] Sidebar latérale fixe
- [ ] Sélection d'agent (Cortana, autres)
- [ ] Capture de contexte (page, sélection, URL)
- [ ] Chat en temps réel avec agents
- [ ] Historique des conversations
- [ ] Raccourci clavier (Ctrl+Shift+O)

### Phase 2

- [ ] Popup quick-access
- [ ] Menu contextuel (clic-droit)
- [ ] Capture d'écran annotée
- [ ] Partage de sélection vers agent
- [ ] Notifications de réponses
- [ ] Mode hors-ligne (cache)

### Phase 3

- [ ] Synchronisation multi-device
- [ ] Intégration Tailscale Domains
- [ ] Agents personnalisés
- [ ] Workflows automatisés
- [ ] Export vers autres apps

---

## 🎨 UI/UX

### Sidebar Design

```
┌─────────────────────────────────┐
│  OpenClaw AI              [✕]   │
├─────────────────────────────────┤
│  🧠 Cortana              [⚙]   │
├─────────────────────────────────┤
│                                 │
│  Contexte:                      │
│  ┌───────────────────────────┐ │
│  │ 📄 Page: Wikipedia        │ │
│  │ 🔗 wikipedia.org/wiki/... │ │
│  │ 📝 342 mots capturés      │ │
│  └───────────────────────────┘ │
│                                 │
│  Actions rapides:               │
│  [📝 Résumer] [🌐 Traduire]    │
│  [❓ Expliquer] [💬 Discuter]   │
│                                 │
├─────────────────────────────────┤
│  💬 Messages                    │
│  ┌───────────────────────────┐ │
│  │ User: Peux-tu résumer ?   │ │
│  │                           │ │
│  │ Agent: Voici le résumé... │ │
│  └───────────────────────────┘ │
│                                 │
│  [____________________] [➤]    │
└─────────────────────────────────┘
```

---

## 🔐 Sécurité & Confidentialité

### Permissions Requises

```json
{
  "permissions": [
    "activeTab",
    "storage",
    "contextMenus",
    "sidePanel"
  ],
  "host_permissions": [
    "<all_urls>"
  ]
}
```

### Données Capturées

| Type | Usage | Stockage |
|------|-------|----------|
| URL de la page | Contexte agent | Local (extension) |
| Sélection texte | Prompt auto | Local (session) |
| Contenu page | Capture complète | Optionnel, local |
| Conversations | Historique | Local + Gateway |

### Confidentialité

- ✅ Aucune donnée envoyée sans action utilisateur
- ✅ Stockage local par défaut
- ✅ Option de suppression automatique
- ✅ Pas de tracking analytics

---

## 📦 Stack Technique

### Extension Manifest V3

```json
{
  "manifest_version": 3,
  "name": "OpenClaw AI Assistant",
  "version": "0.1.0",
  "permissions": ["activeTab", "storage", "contextMenus", "sidePanel"],
  "host_permissions": ["<all_urls>"],
  "side_panel": {
    "default_path": "sidepanel.html"
  },
  "action": {
    "default_popup": "popup.html",
    "default_icon": "icons/icon48.png"
  },
  "background": {
    "service_worker": "background.js"
  },
  "commands": {
    "toggle-sidebar": {
      "suggested_key": {
        "default": "Ctrl+Shift+O"
      },
      "description": "Toggle OpenClaw Sidebar"
    }
  }
}
```

### Structure du Projet

```
openclaw-browser-extension/
├── manifest.json
├── popup/
│   ├── popup.html
│   ├── popup.ts
│   └── popup.css
├── sidepanel/
│   ├── sidepanel.html
│   ├── sidepanel.ts
│   └── sidepanel.css
├── background/
│   └── background.ts
├── content/
│   └── content.ts
├── lib/
│   ├── openclaw-client.ts
│   └── context-capture.ts
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── package.json
```

---

## 🔗 Connexions

| Idée | Relation |
|------|----------|
| [OPENCLAW-OS-INTEGRATION](../openclaw-os-integration/idea.md) | ICônes PWA dans Windows — complémentaire |
| [OPENCLAW-TAILSCALE-DOMAINS](../openclaw-tailscale-domains/idea.md) | Accès aux projets — backend extension |
| [IDAE-ANDROID-CAPTURE](../idae-android-capture/idea.md) | Capture mobile — version desktop |
| [VOICE-INTERFACE-HISTORIQUE](../voice-interface-historique/idea.md) | Interface vocale — feature future |

---

## 📊 Métriques de Succès

| Métrique | Cible |
|----------|-------|
| Temps d'ouverture sidebar | < 500ms |
| Utilisateurs actifs | 100+ (mois 1) |
| Rating Chrome Store | 4.5+ étoiles |
| Performance (Lighthouse) | 90+ |

---

## 📅 Roadmap

| Phase | Durée | Livrables |
|-------|-------|-----------|
| **Phase 1: MVP** | 2 semaines | Sidebar + chat + capture |
| **Phase 2: Features** | 2 semaines | Popup + context menu + notifications |
| **Phase 3: Polish** | 1 semaine | UI/UX + performance + tests |
| **Phase 4: Publish** | 1 semaine | Chrome Store + Firefox Add-ons |

---

## 🚀 Prochaines Étapes

1. ✅ Idée capturée dans maturation
2. ⏳ Définir scope MVP (sidebar vs popup)
3. ⏳ Créer structure projet BMAD
4. ⏳ Développer MVP (2 semaines)
5. ⏳ Tests utilisateurs
6. ⏳ Publication stores

---

## 📝 Notes

- **Priorité:** Commencer avec sidebar (plus utile que popup seul)
- **Compatibilité:** Chrome, Edge, Firefox (manifest v3)
- **Backend:** OpenClaw Gateway existant (pas de serveur additionnel)
- **Design:** Utiliser @medyll/css-base pour cohérence

---

**Références:**
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Firefox WebExtensions](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions)
- [Manifest V3](https://developer.chrome.com/docs/extensions/mv3/intro/)
