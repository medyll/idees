# BLUEPRINT — APP-PERSONNALITE

**Statut :** 🌳 Mature  
**Date :** 2026-04-19  
**Version :** 1.0

---

## 🎯 Vision

Application de test de personnalité basée sur un **profil vectoriel continu** qui évolue dans le temps, pas une classification binaire (type MBTI).

---

## 📦 Périmètre MVP

### Fonctionnalités Core
- [ ] Test de personnalité Big Five (5 dimensions, 50 questions)
- [ ] Format questions : swipe Tinder (gauche=non, droite=oui)
- [ ] Résultat : profil vectoriel radar chart (5 axes)
- [ ] Historique : évolution des scores dans le temps
- [ ] Re-test après 30 jours (notification push)

### Hors Scope (Post-MVP)
- [ ] Mode team-building (profils d'équipe)
- [ ] Variantes contextuelles (travail vs famille)
- [ ] Export PDF des résultats

---

## 🏗️ Architecture Technique

### Stack Recommandée
```
React Native 0.73+ (ou Expo SDK 50+)
├── React Navigation 6.x
├── Victory Native (radar chart)
├── @react-native-async-storage/async-storage
├── expo-notifications (push)
└── Zustand (état global)
```

### Structure du Projet
```
app-personnalite/
├── src/
│   ├── components/
│   │   ├── QuestionCard.tsx      # Swipe card
│   │   ├── ResultsRadar.tsx      # Radar chart résultats
│   │   ├── TimelineChart.tsx     # Évolution temporelle
│   │   └── SwipeGesture.tsx      # Gesture handler
│   ├── screens/
│   │   ├── IntroScreen.tsx
│   │   ├── TestScreen.tsx
│   │   ├── ResultsScreen.tsx
│   │   └── HistoryScreen.tsx
│   ├── lib/
│   │   ├── big-five.ts           # Algorithme scoring
│   │   └── questions.ts          # Banque de questions (50+)
│   ├── store/
│   │   └── personalityStore.ts
│   └── types/
│       └── personality.ts
├── tests/
│   └── scoring.test.ts
└── package.json
```

---

## 🔧 Spécifications Détaillées

### 1. Modèle Big Five (OCEAN)

```typescript
interface PersonalityProfile {
  openness: number;        // 0-100 (Ouverture à l'expérience)
  conscientiousness: number; // 0-100 (Conscienciosité)
  extraversion: number;    // 0-100 (Extraversion)
  agreeableness: number;   // 0-100 (Agréabilité)
  neuroticism: number;     // 0-100 (Névrosisme/Émotivité)
  
  timestamp: number;
  testVersion: string;     // 'v1.0'
  context?: string;        // 'work', 'family', 'general'
}
```

### 2. Algorithme de Scoring

```typescript
// 50 questions, 10 par dimension
// Certaines questions sont inversées (reverse-scored)

const QUESTION_MAP = [
  { dimension: 'openness', text: "J'aime explorer de nouvelles idées", reverse: false },
  { dimension: 'openness', text: "Je préfère les routines établies", reverse: true },
  // ... 48 autres questions
];

function calculateScore(answers: boolean[], dimension: string): number {
  const dimensionQuestions = QUESTION_MAP.filter(q => q.dimension === dimension);
  const rawScore = dimensionQuestions.reduce((sum, q, i) => {
    const answer = answers[i];
    return sum + (q.reverse ? (answer ? 0 : 1) : (answer ? 1 : 0));
  }, 0);
  
  // Normalisation 0-100
  return Math.round((rawScore / dimensionQuestions.length) * 100);
}
```

### 3. Questions (Exemples)

```typescript
const QUESTIONS = [
  // Openness (10 questions)
  "J'aime explorer de nouvelles idées",
  "Je suis curieux/se de beaucoup de choses",
  "J'apprécie l'art et la beauté",
  // Conscientiousness
  "Je garde mes affaires organisées",
  "Je termine ce que j'ai commencé",
  // ... 30 autres
];

// Format : swipe Tinder
// → Droite (✓) = "Plutôt d'accord"
// → Gauche (✗) = "Plutôt pas d'accord"
```

### 4. Radar Chart (Victory Native)

```typescript
import { VictoryRadar, VictoryPolarAxis } from 'victory-native';

const data = [
  { axis: 'Ouverture', value: profile.openness },
  { axis: 'Conscienciosité', value: profile.conscientiousness },
  { axis: 'Extraversion', value: profile.extraversion },
  { axis: 'Agréabilité', value: profile.agreeableness },
  { axis: 'Émotivité', value: profile.neuroticism },
];

<VictoryRadar data={data} maxDomain={100} />
```

### 5. Timeline d'Évolution

```typescript
interface HistoryEntry {
  date: string;        // '2026-03-15'
  profile: PersonalityProfile;
  daysSinceLastTest: number;
  changes: {
    dimension: keyof PersonalityProfile;
    delta: number;     // +5, -3, etc.
  }[];
}

// Visualisation : line chart avec 5 lignes (une par dimension)
```

---

## 📱 UX/UI Guidelines

### Principles
1. **Rapidité** : Test complété en <5min
2. **Engagement** : Swipe gamifié, pas QCM ennuyeux
3. **Bienveillance** : Pas de jugement, juste une cartographie
4. **Transparence** : Expliquer que la personnalité évolue

### Wireframes

#### Écran Test
```
┌─────────────────────────┐
│   Question 12/50        │
│   ●●●●○○○○○○○           │
├─────────────────────────┤
│                         │
│   "J'aime explorer      │
│    de nouvelles idées"  │
│                         │
│       🫷     🫸         │
│      ✗       ✓          │
│                         │
└─────────────────────────┘
```

#### Écran Résultats
```
┌─────────────────────────┐
│  Votre Profil           │
│  15 Mars 2026           │
├─────────────────────────┤
│      ╱‾‾‾╲              │
│     ╱     ╲   Ouverture: 78│
│    ╱   ●   ╲  Extraversion:45│
│   ╱         ╲             │
│  ╰───────────╯            │
│                           │
│  [📈 Voir évolution]      │
│  [📅 Re-tester dans 30j]  │
└─────────────────────────┘
```

---

## 🧪 Plan de Tests

### Tests Unitaires
- [ ] `calculateScore()` normalise correctement 0-100
- [ ] Questions inversées scorées correctement
- [ ] Timeline calcule delta entre tests

### Tests d'Intégration
- [ ] 50 swipes → résultat affiché
- [ ] Radar chart affiche 5 axes correctement
- [ ] Notification push après 30 jours

### Tests Utilisateur (10 personnes)
- [ ] Complète test en <5min
- [ ] Comprend que personnalité évolue
- [ ] Trouve résultats utiles/non-blessants
- [ ] Revient pour re-test (taux de rétention)

---

## 📅 Roadmap

### Phase 1 : MVP (2 semaines)
- [ ] Setup projet + deps
- [ ] Implémenter 50 questions Big Five
- [ ] Swipe gestures + scoring
- [ ] Radar chart résultats
- [ ] Stockage local (AsyncStorage)

### Phase 2 : Tracking (1 semaine)
- [ ] Historique des tests
- [ ] Timeline chart évolution
- [ ] Notifications push (30 jours)

### Phase 3 : Features Avancées (optionnel)
- [ ] Variantes contextuelles (travail/famille)
- [ ] Mode team-building (agrégat équipe)
- [ ] Export PDF
- [ ] Partage résultats (social)

---

## 🚀 Mise en Service

### Pré-requis
- Node.js 18+
- React Native CLI ou Expo
- Comptes Apple Developer / Google Play (pour publication)

### Commands
```bash
# 1. Créer projet
npx create-expo-app app-personnalite --template blank-typescript
cd app-personnalite

# 2. Installer dépendances
npm install @react-navigation/native
npm install victory-native react-native-svg
npm install @react-native-async-storage/async-storage
npm install expo-notifications

# 3. Implémenter screens + scoring
# 4. Tester avec questions réelles
# 5. Build et soumission stores

expo build:ios
expo build:android
```

---

## 📊 Métriques de Succès

| Métrique | Cible MVP | Cible V1 |
|----------|-----------|----------|
| Temps test moyen | <5min | <4min |
| Taux complétion | 80% | 90% |
| Rétention J30 | 40% | 60% |
| NPS | +40 | +60 |
| Notes store | 4.0+ | 4.5+ |

---

## ⚠️ Risques Identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Questions biaisées | Élevé | Review par psychologue (optionnel) |
| Utilisateurs blessés | Moyen | Ton bienveillant, pas de jugement |
| Abandon en cours | Moyen | Progress bar + encouragement |
| Données sensibles | Élevé | Stockage local uniquement, pas de cloud |

---

## 🔗 Dépendances

### Liens Internes
- [APP-MOBILE-GRID](../app-mobile-grid/idea.md) — Navigation grille pour variantes contextuelles
- [MOTEUR-CATEGORISATION](../moteur-categorisation/idea.md) — Taxonomie des traits de personnalité

### Références Externes
- [Big Five Inventory](https://en.wikipedia.org/wiki/Big_Five_personality_traits)
- [Victory Native](https://commerce.nearform.com/open-source/victory-native/)
- [IPIP (International Personality Item Pool)](https://ipip.ori.org/)

---

## 📝 Notes de Développement

- **Validation scientifique** : Utiliser questions validées (IPIP) même pour MVP
- **Ton** : Bienveillant, informatif, jamais prescriptif
- **Vie privée** : Toutes données en local, pas de serveur
- **Différenciation** : Insister sur "évolution" pas "classification"

---

**Prochaine action :** Créer la banque de 50 questions basées sur IPIP (International Personality Item Pool) et implémenter l'algorithme de scoring Big Five.
