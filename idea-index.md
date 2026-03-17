# Index des idées — Logiciel de Maturation

> Dernière mise à jour : 2026-03-17
> Format : `[code-lowercase]/idea.md` + `[code-lowercase]/history.md` (horodaté)

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
- Chaque idée : `[code-lowercase]/idea.md` + `[code-lowercase]/history.md`
