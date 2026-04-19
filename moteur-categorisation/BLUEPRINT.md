# BLUEPRINT — MOTEUR-CATEGORISATION

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Moteur d'ontologie universelle navigable : tout ce qui a un nom appartient à une catégorie dans un graphe hiérarchique (DAG).

---

## 📦 MVP
- [ ] Graphe DAG (racines multiples, pas arborescence stricte)
- [ ] Héritage champs (modèle prototypal)
- [ ] 3 vues : Arborescence, Datagramme (force-directed), Slider
- [ ] Bootstrap depuis Wikidata (optionnel)
- [ ] Navigation fluide (clavier + souris)

**Stack :** TypeScript | D3.js (graphe) | SQLite (stockage)

---

## 🔧 Core

### Structure Graphe
```typescript
interface CategoryNode {
  id: string;
  name: string;
  parents: string[];      // Multiple parents (DAG)
  children: string[];
  fields: Record<string, any>;  // Héritage prototypal
  views: ViewConfig[];
}

interface ViewConfig {
  type: 'tree' | 'graph' | 'slider';
  config: any;
}
```

### Vues
1. **Arborescence** : collapsible tree (d3-hierarchy)
2. **Datagramme** : force-directed graph (d3-force)
3. **Slider** : navigation spatiale (grille 2D)

---

## 📅 Roadmap
1. **Semaine 1** : Structure DAG + héritage
2. **Semaine 2** : Vues D3 (tree + graph)
3. **Semaine 3** : Slider + navigation

---

## 🚀 Setup
```bash
mkdir moteur-categorisation && cd moteur-categorisation
npm install d3-force d3-hierarchy better-sqlite3
```

**Prochaine action :** Créer structure DAG avec 100 noeuds test et afficher en tree view.
