# idea-MOTEUR-DASHBOARD

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04  
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

## Connexions

[IDAEO-DASHBOARD](idae-dashboard/idea.md) — projet source dont il est l'évolution  
[INTERFACE-BRIDGE](interface-bridge/idea.md) — pourrait bénéficier d'un dashboard unifié  
[SKILL-EXPLORER](skill-explorer/idea.md) — navigation similaire dans un univers de skills
