# BLUEPRINT — SKILL-MEMOIRE

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Skill qui stocke des souvenirs en "petit français" et les dégrade progressivement (5 niveaux), avec recherche inversée (dégradé → détail).

---

## 📦 MVP
- [ ] 5 niveaux de dégradation (0=détail → 4=perdu)
- [ ] Stockage SQLite + embeddings (optionnel)
- [ ] Recherche BM25 sur Niveau 3 (mots-clés)
- [ ] Remontée vers Niveau 0 si match
- [ ] Renforcement (rappel = ralentit dégradation)
- [ ] Cycle dégradation : toutes les 24h

**Stack :** TypeScript | SQLite | BM25 (flexsearch) | LLM API

---

## 🔧 Core

### Niveaux Dégradation
```typescript
interface Memory {
  id: string;
  content: string;        // Niveau 0 (détail)
  summaries: {            // Niveaux 1-3
    level1: string;       // Résumé
    level2: string;       // Essentiel
    level3: string;       // Mots-clés
  };
  createdAt: Date;
  lastRecalled?: Date;
  decayRate: number;      // 0.0-1.0
  saillance: number;      // Score 0-100
}
```

### Recherche Inversée
```typescript
async function search(query: string): Promise<Memory[]> {
  // 1. Chercher sur Niveau 3 (mots-clés) avec BM25
  const matches = await bm25.search(query);
  
  // 2. Remonter vers détails si match
  return matches.map(m => loadFullMemory(m.id));
}
```

---

## 📅 Roadmap
1. **Semaine 1** : Stockage SQLite + CRUD
2. **Semaine 2** : Dégradation auto + LLM réécriture
3. **Semaine 3** : Recherche BM25 inversée

---

## 🚀 Setup
```bash
mkdir skill-memoire && cd skill-memoire
npm install better-sqlite3 flexsearch openai
```

**Prochaine action :** Créer schema SQLite et fonction de dégradation LLM.
