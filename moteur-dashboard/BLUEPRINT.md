# BLUEPRINT — MOTEUR-DASHBOARD

**Statut :** 🌱 Germination | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Moteur de dashboard générique piloté markdown/yaml, évolution d'idae-dashboard vers plateforme universelle de visualisation.

---

## 📦 MVP
- [ ] Explorateur fichiers markdown/yaml
- [ ] Sections dynamiques par type de projet
- [ ] Système de plugins (affichages custom)
- [ ] Affichage générique (composants réutilisables)
- [ ] Support BMAD + Maturation

**Stack :** Tauri (ou Electron) | Svelte 5 | @medyll/css-base

---

## 🔧 Core

### Architecture
```typescript
interface DashboardPlugin {
  name: string;
  detect: (files: File[]) => boolean;  // Détecte type projet
  render: (data: any) => Component;    // Rend UI
}

interface Section {
  title: string;
  plugin: string;
  files: string[];
  content: any;
}
```

### Types Supportés
- **BMAD** : status.yaml, stories/, sprints/
- **Maturation** : idea.md, history.md
- **Autres** : markdown + yaml frontmatter

---

## 📅 Roadmap
1. **Semaine 1** : Explorateur fichiers + détection type
2. **Semaine 2** : Système plugins + sections
3. **Semaine 3** : Support BMAD + Maturation

---

## 🚀 Setup
```bash
cd idae-dashboard  # ou créer moteur-dashboard
npm install @medyll/css-base js-yaml front-matter
```

**Prochaine action :** Diagnostiquer menu latéral (story S1-01) puis intégrer affichage maturation.
