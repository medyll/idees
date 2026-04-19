# BLUEPRINT — SKILL-EXPLORER

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Explorateur de skills avec graphe de dépendances interactif (force-directed), navigation dans les connexions entre skills.

---

## 📦 MVP
- [ ] Graphe force-directed (D3.js ou Cytoscape)
- [ ] Nœuds = skills, arêtes = dépendances
- [ ] Click nœud → détail skill
- [ ] Filtrage par tags
- [ ] Recherche textuelle
- [ ] Données depuis fichiers SKILL.md

**Stack :** Svelte 5 | D3.js | @medyll/css-base

---

## 🔧 Core

### Graphe Données
```typescript
interface SkillNode {
  id: string;         // 'skill-memoire'
  name: string;       // 'Skill Mémoire'
  tags: string[];
  dependencies: string[]; // IDs des skills dépendants
  conflicts?: string[];   // IDs des skills incompatibles
}

interface GraphData {
  nodes: SkillNode[];
  links: Array<{ source: string; target: string; type: string }>;
}
```

### Visualisation
```svelte
<script>
  import { forceSimulation, forceManyBody, forceLink } from 'd3-force';
  
  const simulation = forceSimulation(nodes)
    .force('charge', forceManyBody(-300))
    .force('link', forceLink(links).distance(100));
</script>

<svg>
  {#each nodes as node}
    <circle cx={node.x} cy={node.y} r={20} on:click={() => select(node)} />
  {/each}
</svg>
```

---

## 📅 Roadmap
1. **Semaine 1** : Parser SKILL.md → graphe données
2. **Semaine 2** : Visualisation D3 force-directed
3. **Semaine 3** : Navigation + filtrage

---

## 🚀 Setup
```bash
npx create-vite@latest skill-explorer --template svelte-ts
npm install d3-force @medyll/css-base
```

**Prochaine action :** Parser tous les SKILL.md et extraire dépendances.
