# BLUEPRINT — APP-MOBILE-GRID

**Statut :** 🌳 Mature  
**Date :** 2026-04-19  
**Version :** 1.0

---

## 🎯 Vision

Navigation mobile en grille 2D : axe horizontal (variantes/clones), axe vertical (progression linéaire).

---

## 📦 Périmètre MVP

### Fonctionnalités Core
- [ ] Swipe gestures : haut/bas (progression), gauche/droite (variantes)
- [ ] État global : position `[x, y]` + snapshots des écrans
- [ ] Transitions animées fluides (60fps)
- [ ] Grille limitée 3x5 avec lazy-loading
- [ ] Clone hérite état parent + delta paramétrable

### Hors Scope (Post-MVP)
- [ ] Vue carte de la grille
- [ ] Pruning automatique (mémoire dégradante)
- [ ] Synchronisation cloud des états

---

## 🏗️ Architecture Technique

### Stack Recommandée
```
React Native 0.73+ (ou Expo SDK 50+)
├── React Navigation 6.x (stack navigator)
├── React Native Gesture Handler 2.x
├── React Native Reanimated 3.x
└── Zustand (état global grille)
```

### Structure du Projet
```
app-mobile-grid/
├── src/
│   ├── components/
│   │   ├── GridNavigator.tsx    # Container grille
│   │   ├── GridCell.tsx         # Rendu cellule [x,y]
│   │   └── SwipeGesture.tsx     # Wrapper gestures
│   ├── hooks/
│   │   ├── useGridNavigation.ts # Logique navigation
│   │   └── useGridState.ts      # État + snapshots
│   ├── store/
│   │   └── gridStore.ts         # Zustand store
│   └── types/
│       └── grid.ts              # Types TypeScript
├── tests/
│   └── grid.test.tsx
└── package.json
```

### Schéma de Navigation
```
┌─────────────────────────────────────────┐
│         Grille 2D [x, y]                │
│                                         │
│  [x-1,y] ← [x,y] → [x+1,y]  (variantes)│
│     ↑        │         ↑                │
│     │        ↓         │                │
│  [x-1,y+1] [x,y+1] [x+1,y+1] (étapes)  │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔧 Spécifications Détaillées

### 1. État Global (Zustand)

```typescript
interface GridState {
  position: { x: number; y: number };
  snapshots: Map<string, ScreenSnapshot>; // key: `${x},${y}`
  history: string[]; // pour retour arrière
  
  // Actions
  move: (dx: number, dy: number) => void;
  saveSnapshot: (snapshot: ScreenSnapshot) => void;
  getSnapshot: (x: number, y: number) => ScreenSnapshot | null;
  prune: (maxDistance: number) => void; // optionnel
}

interface ScreenSnapshot {
  data: any; // état métier de l'écran
  params: Record<string, any>; // paramètres de variante
  timestamp: number;
}
```

### 2. Gestes de Navigation

```typescript
// Swipe thresholds
const SWIPE_THRESHOLD = 120; // px
const VELOCITY_THRESHOLD = 0.5;

// Directions
enum SwipeDirection {
  UP = 'up',       // y+1 (étape suivante)
  DOWN = 'down',   // y-1 (étape précédente)
  LEFT = 'left',   // x-1 (variante précédente)
  RIGHT = 'right', // x+1 (nouvelle variante)
}
```

### 3. Transitions Animées

```typescript
// Animation config (Reanimated)
const ANIMATION_CONFIG = {
  duration: 300,
  easing: Easing.bezier(0.25, 0.1, 0.25, 1),
};

// Slide transition
const slideInFromRight = {
  from: { translateX: 300, opacity: 0 },
  to: { translateX: 0, opacity: 1 },
};
```

### 4. Paramètre de Variante (Clone)

```typescript
// Au moment du swipe droite, l'utilisateur configure le delta
interface VariantParams {
  type: 'A/B' | 'language' | 'profile' | 'custom';
  value: any;
  inheritFromParent: boolean; // true par défaut
}

// Exemple : swipe droite → modal de choix de variante
// "Que veux-tu changer dans ce clone ?"
// → Langue, Profil, Version A/B, Autre paramètre
```

---

## 📱 UX/UI Guidelines

### Principes
1. **Feedback immédiat** : La grille répond sous 100ms
2. **Animation fluide** : 60fps constant, pas de jank
3. **Orientation** : L'utilisateur sait toujours où il est (breadcrumbs discrets)
4. **Prévention perte** : Confirmation avant pruning (si implémenté)

### Wireframe Minimal
```
┌─────────────────────────┐
│  ← [2,3] →              │  ← Position actuelle
├─────────────────────────┤
│                         │
│   ┌─────────────────┐   │
│   │                 │   │
│   │   Contenu de    │   │
│   │   l'écran [x,y] │   │
│   │                 │   │
│   └─────────────────┘   │
│                         │
├─────────────────────────┤
│  Swipe ↓: étape préc.   │
│  Swipe ↑: étape suiv.   │
│  Swipe ←/→: variantes   │
└─────────────────────────┘
```

---

## 🧪 Plan de Tests

### Tests Unitaires
- [ ] `useGridNavigation.move()` met à jour position correctement
- [ ] `gridStore.saveSnapshot()` persiste état
- [ ] Pruning supprime snapshots > maxDistance

### Tests d'Intégration
- [ ] Swipe droite → nouvelle cellule avec params
- [ ] Swipe haut → étape suivante conserve contexte
- [ ] Retour arrière (gauche/bas) restore état

### Tests Utilisateur (5 personnes)
- [ ] Comprend la métaphore grille 2D en <2min
- [ ] Ne se perd pas après 5 swipes
- [ ] Sait revenir au point de départ

---

## 📅 Roadmap

### Phase 1 : MVP (2 semaines)
- [ ] Setup projet React Native + deps
- [ ] Implémenter gridStore (Zustand)
- [ ] Gestes swipe basiques
- [ ] Transitions animées
- [ ] 2 écrans de démo (wizard configuration)

### Phase 2 : Polish (1 semaine)
- [ ] Breadcrumbs de position
- [ ] Gestion erreurs (swipe hors limites)
- [ ] Performance optimization (memoization)
- [ ] Tests utilisateurs

### Phase 3 : Features Avancées (optionnel)
- [ ] Vue carte (mini-map de la grille)
- [ ] Pruning automatique mémoire dégradante
- [ ] Sync cloud (optionnel)
- [ ] Haptic feedback

---

## 🚀 Mise en Service

### Pré-requis
- Node.js 18+
- React Native CLI ou Expo
- iOS Simulator / Android Emulator

### Commands
```bash
# 1. Créer projet
npx create-expo-app app-mobile-grid --template blank-typescript
cd app-mobile-grid

# 2. Installer dépendances
npm install @react-navigation/native react-native-screens react-native-safe-area-context
npm install react-native-gesture-handler react-native-reanimated
npm install zustand

# 3. Setup structure (voir Architecture)
# 4. Implémenter components
# 5. Tester sur simulateur

# Build production
expo build:ios  # ou
expo build:android
```

---

## 📊 Métriques de Succès

| Métrique | Cible MVP | Cible V1 |
|----------|-----------|----------|
| FPS moyen | 60 | 60 |
| Temps réponse swipe | <100ms | <50ms |
| Utilisateurs test | 5 | 50 |
| NPS (Net Promoter Score) | +30 | +50 |
| Compréhension grille | 80% | 95% |

---

## ⚠️ Risques Identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Performance animations | Élevé | Utiliser Reanimated 3 (UI thread) |
| Perte état après crash | Moyen | Persistance snapshots (AsyncStorage) |
| Utilisateurs perdus | Élevé | Breadcrumbs + vue carte obligatoire |
| Complexité métier | Moyen | Limiter grille 3x5 au début |

---

## 🔗 Dépendances

### Liens Internes
- [APP-PERSONNALITE](../app-personnalite/idea.md) — Cas d'usage : variantes de profil
- [SKILL-MEMOIRE](../skill-memoire/idea.md) — Inspiration : mémoire dégradante pour pruning

### Références Externes
- [React Navigation](https://reactnavigation.org/)
- [Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)
- [Reanimated 3](https://docs.swmansion.com/react-native-reanimated/)
- [Zustand](https://zustand-demo.pmnd.rs/)

---

## 📝 Notes de Développement

- **Priorité absolue** : Fluidité des animations avant toutes features
- **Ne pas over-engineer** : Commencer avec grille fixe 3x5, pas infinie
- **Tests utilisateurs tôt** : Dès que MVP navigable (fin semaine 1)
- **Connexion SKILL-MEMOIRE** : À explorer en Phase 3 (pruning intelligent)

---

**Prochaine action :** Créer le projet React Native et implémenter le gridStore (Zustand) avec les 4 directions de swipe.
