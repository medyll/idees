# idea-IDAE-DASHBOARD-MULTI-SCOPES

**Date initiale :** 2026-04-06  
**Dernière évolution :** 2026-04-06  
**Statut :** germination  
**Tags :** idae-dashboard, architecture, scopes, sticky, navigation, UX

## Description

**Architecture multi-scopes pour IDAE-dashboard** — L'application doit pouvoir charger plusieurs "scopes" (contextes) : BMAD, Maturation, etc.

**Problème actuel :**
- Sidebar actuelle est fixe, hors système de colonnes
- Un seul scope à la fois (BMAD uniquement)
- Pas de navigation entre scopes (BMAD → Maturation → autres)

**Nouveau concept — Navigation Verticale en Grille :**

```
┌──────────────────────────────────────────────────────────┐
│  Origin Column (sticky) — Liste des contextes           │
│  ┌─────────────────────────────────────────────────┐    │
│  │  ● BMAD          (indicateur de contexte)       │    │
│  │  ○ Maturation                                   │    │
│  │  ○ ...                                          │    │
│  └─────────────────────────────────────────────────┘    │
├──────────────────────────────────────────────────────────┤
│  Context Column Area (scroll VERTICAL)                  │
│  ┌─────────────────────────────────────────────────┐    │
│  │  CONTEXTE BMAD (visible)                        │    │
│  │  ┌─────┐ ┌─────┐ ┌─────┐ (enfants scroll X)    │    │
│  │  │ Col │ │ Col │ │ Col │                        │    │
│  │  └─────┘ └─────┘ └─────┘                        │    │
│  └─────────────────────────────────────────────────┘    │
│  ┌─────────────────────────────────────────────────┐    │
│  │  CONTEXTE MATURATION (scroll en bas/haut)       │    │
│  │  ┌─────┐ ┌─────┐ ┌─────┐                        │    │
│  │  │ Col │ │ Col │ │ Col │                        │    │
│  │  └─────┘ └─────┘ └─────┘                        │    │
│  └─────────────────────────────────────────────────┘    │
└──────────────────────────────────────────────────────────┘
```

**Concept clé :**
- **Navigation verticale** entre contextes (BMAD ↑↓ Maturation)
- **Navigation horizontale** dans chaque contexte (colonnes enfants →)
- **Grille invisible** — on ne voit qu'un contexte + ses enfants à la fois
- **Origin Column** — toujours visible, liste des contextes + indicateur (comme dots de boarding, mais vertical)

## Potentiel

- Navigation fluide entre scopes (BMAD ↔ Maturation ↔ autres)
- Chaque scope a son propre contenu de sidebar
- Contexte préservé quand on change de scope
- Architecture extensible (nouveaux scopes faciles à ajouter)

## Questions ouvertes (en discussion)

### Navigation Verticale (Grille)
- **Scroll vertical** entre contextes (BMAD ↑↓ Maturation)
- **Scroll horizontal** dans chaque contexte (colonnes enfants →)
- **Une seule vue** — un contexte + ses enfants visible à la fois
- **Origin Column** — comment l'implémenter ?
  - Sticky en haut ?
  - Sticky à gauche (réduit, juste les dots/noms) ?
  - Overlay au survol ?

### Origine Column — Spécifications
- **Contenu :** Liste des contextes (BMAD, Maturation, ...)
- **Indicateur :** Point/bulle verticale (comme boarding dots) pour contexte actif
- **Behavior :** Toujours visible (sticky), ne disparaît jamais
- **Navigation :** Clic sur contexte → scroll vertical vers ce contexte
- **Width :** Réduit (60-80px ?) ou full sidebar (280px) ?

### Technical Questions
- **Sticky behavior :** CSS `position: sticky` ou scroll personnalisé ?
- **Context switching :** Reset columns ou contexte préservé par contexte ?
- **Responsive mobile :** Origin Column = drawer hamburger ?
- **ColumnManager :** Gérer les colonnes sticky différemment ?
- **Performance :** Scroll vertical fluide avec beaucoup de contextes ?

## Connexions

[IDAE-DASHBOARD](idae-dashboard/idea.md) — Projet dashboard actuel  
[APP-MOBILE-GRID](app-mobile-grid/idea.md) — Navigation mobile en grille  
[MOTEUR-DASHBOARD](moteur-dashboard/idea.md) — Moteur dashboard générique

---

## État de la discussion

**2026-04-06 12:13** — Utilisateur a lu la proposition architecturale.

**Feedback :**
- ✅ "C'est intéressant, très très intéressant"
- ⚠️ "Ne lance pas le développement tout de suite"
- ⚠️ "Il faut que je fasse encore des précisions"
- ✅ "Fais en sorte que je puisse recommencer la discussion à n'importe quel moment"

**Points à clarifier (prochaine session) :**
1. Comportement sticky exact (CSS vs personnalisé)
2. Navigation entre scopes (reset columns ou contexte préservé ?)
3. Responsive mobile (drawers ou overlay ?)
4. Props de colonne (sticky: true ou StickyColumn spécialisé ?)
5. ColumnManager (gestion spéciale sticky columns ?)

**Statut :** 🔄 En attente de précisions utilisateur — Discussion technique à reprendre
