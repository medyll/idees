# BLUEPRINT — IDAE-DASHBOARD-MULTI-SCOPES

**Statut :** 🌱 Germination | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Architecture multi-scopes (BMAD, Maturation, etc.) avec navigation verticale en grille et Origin Column sticky.

---

## 📦 MVP
- [ ] Origin Column sticky (liste contextes + indicateur)
- [ ] Navigation verticale entre scopes (scroll)
- [ ] Navigation horizontale par scope (colonnes enfants)
- [ ] Contexte préservé par scope
- [ ] 2 scopes : BMAD + Maturation

**Stack :** Svelte 5 | @medyll/css-base | Vite

---

## 🔧 Core

### Architecture Grille
```
┌────────────────────────────────┐
│ Origin Column (sticky)         │
│ ● BMAD      ← indicateur       │
│ ○ Maturation                   │
├────────────────────────────────┤
│ CONTEXTE BMAD (visible)        │
│ [Col][Col][Col] → scroll H     │
├────────────────────────────────┤
│ CONTEXTE MATURATION (scroll V) │
│ [Col][Col][Col] → scroll H     │
└────────────────────────────────┘
```

### Types
```typescript
interface Scope {
  id: string;        // 'bmad', 'maturation'
  name: string;
  columns: Column[];
  isActive: boolean;
}

interface Column {
  id: string;
  type: string;
  content: any;
  sticky?: boolean;
}
```

---

## 📅 Roadmap
1. **Semaine 1** : Origin Column + navigation verticale
2. **Semaine 2** : Scroll horizontal par contexte
3. **Semaine 3** : Préservation contexte + tests

---

## 🚀 Setup
```bash
cd idae-dashboard
npm install @medyll/css-base
```

**Prochaine action :** Implémenter Origin Column sticky avec navigation clavier (↑↓).
