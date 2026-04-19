# BLUEPRINT — MATURATION-SLIDER

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Interface slider horizontal multiligne montrant la progression des idées dans le temps, avec réécriture du passé créant des branches alternatives.

---

## 📦 MVP
- [ ] Slider horizontal par idée (une ligne = une idée)
- [ ] Navigation clavier (flèches gauche/droite)
- [ ] Click sur état → détail + édition
- [ ] Réédition passé → création branche alternative
- [ ] Vue DAG (graphe) vs vue linéaire (slider)
- [ ] Stockage JSON structure DAG

**Stack :** React + D3.js (graphe) + Zustand (état)

---

## 🔧 Core

### Structure DAG
```typescript
interface IdeaState {
  id: string;
  ideaCode: string;
  timestamp: string;
  content: string;
  parentId?: string;  // null = racine
  children: string[]; // IDs des états suivants
  isCanonical: boolean; // true = chemin principal
}
```

### Slider Component
```tsx
<Slider
  ideaCode="APP-MOBILE-GRID"
  states={states} // Array<IdeaState>
  onStateClick={(id) => showDetail(id)}
  onEdit={(stateId, newContent) => createBranch(stateId, newContent)}
/>
```

---

## 📅 Roadmap
1. **Semaine 1** : Slider linéaire simple (sans branches)
2. **Semaine 2** : Support DAG + branches
3. **Semaine 3** : Vue graphe D3.js + navigation

---

## 🚀 Setup
```bash
npx create-vite@latest maturation-slider --template react-ts
npm install d3 @types/d3 zustand
```

**Prochaine action :** Implémenter slider linéaire avec données factices.
