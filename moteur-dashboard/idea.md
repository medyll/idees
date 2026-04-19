# idea-MOTEUR-DASHBOARD

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-05  
**Statut :** germination  
**Tags :** dashboard, moteur, markdown, yaml, plugin, générique, explorateur

## Description

Moteur de dashboard générique piloté par un explorateur de fichiers markdown/yaml. Évolution d'idae-dashboard pour en faire une plateforme universelle de visualisation de données structurées.

**Concept :**
- **Explorateur de fichiers** : scanne des répertoires et lit des fichiers markdown/yaml
- **Sections dynamiques** : chaque type de projet (BMAD, autre) active des sections d'affichage spécifiques
- **Système de plugins** : architecture plug-in pour ajouter de nouveaux types d'affichage
- **Affichage générique** : composants UI réutilisables qui s'adaptent au contenu détecté

**Évolution depuis idae-dashboard :** passe d'un viewer BMAD spécialisé à une plateforme universelle de visualisation de projets structurés.

## Potentiel

- Devenir le dashboard par défaut pour tous les projets structurés en markdown/yaml
- Remplacer des outils comme BMAD Dashboard (VS Code) par une app desktop unifiée
- Permettre à chaque projet d'avoir son propre "dashboard" sans code personnalisé
- Créer un écosystème de plugins communautaires

## Questions ouvertes

- Quelle structure de fichier/plugin pour déclarer une nouvelle section ?
- Comment détecter automatiquement le type de projet (BMAD, autre) ?
- Faut-il un langage de template pour les vues, ou des composants codés ?
- Comment gérer la découverte automatique des plugins ?
- Architecture Tauri ou Electron ou web pur ?

## Styling (à prévoir)

- **Utiliser `@medyll/css-base`** pour tout le styling de IDAE-dashboard
- Skill `css-base` déjà disponible et documentée
- Tokens, utilitaires, composants — tout est dans le design system
- Dark mode géré automatiquement via `light-dark()`

## Connexions

[IDAEO-DASHBOARD](idae-dashboard/idea.md) — projet source dont il est l'évolution  
[INTERFACE-BRIDGE](interface-bridge/idea.md) — pourrait bénéficier d'un dashboard unifié  
[SKILL-EXPLORER](skill-explorer/idea.md) — navigation similaire dans un univers de skills  
[MATURATION](maturation/idea.md) — **intégration en cours** : idae-dashboard affichera les idées de maturation

## Prochaine étape (2026-04-05)

**Priorité 1 :** Diagnostiquer et corriger le menu latéral gauche.
- Story S1-01 créée dans `idae-dashboard/bmad/artifacts/stories/S1-01.md`
- **ACP Developer** requis pour le diagnostic (ne pas appliquer la correction soi-même)
- Documenter dans `bmad/artifacts/diagnostic-menu-lateral.md`

**Priorité 2 :** Intégrer l'affichage des maturations dans idae-dashboard.

Le projet idae-dashboard est en cours de simplification pour supporter plusieurs fonctionnalités. La maturation est déjà opérationnelle (skills + fichiers) — maintenant il faut rendre les idées visibles pour l'utilisateur via le dashboard.

**Action :** Simplifier idae-dashboard → chaque section affichera un type de contenu (BMAD, Maturation, etc.) → cliquer sur un item ouvre le détail.
