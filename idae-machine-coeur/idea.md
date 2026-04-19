# idea-IDAE-MACHINE-COEUR

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04 06:00  
**Statut :** en croissance  
**Tags :** core, data, UI, schema-driven, validation, Svelte 5, IndexedDB, local-first

## Description

**IDAE-MACHINE** est le cœur unifié pour tous les projets idae — librairie schema-driven UI & validation déjà opérationnelle (v0.136.0, 186 tests).

**Rôle :**
- Transformer des data models en UI CRUD complètes automatiquement
- Validation de champs avec règles DSL (`text (required)`, `fk-collection.id`...)
- Reactive state management (Svelte 5 runes)
- IndexedDB via `@medyll/idae-idbql`
- Local-first natif

**État actuel :**
- ✅ Package NPM publié : `@medyll/idae-machine@0.136.0`
- ✅ 186 tests unitaires (100% pass)
- ✅ OWASP 100% compliance
- ✅ Performance validée (< 5ms par validation)
- ✅ Demo : Car rental business (6 collections)

**Localisation :** `D:\boulot\dev\node\idae\packages\idae-machine`

**Évolutions prévues :**
- Intégrer **QOOLIE** (gestion data)
- Intégrer **DELTA-SIMCA** (à définir)
- Étendre à d'autres projets idae (dashboard, sync, etc.)

## Potentiel

- ✅ Déjà le socle technique pour TOUS les projets idae
- Unifier l'expérience utilisateur entre les apps
- Réduire la duplication de code data/UI
- Permettre le local-first et le temps réel natif
- Générer des UI complètes depuis un simple schema

## Questions ouvertes

- Comment intégrer QOOLIE et DELTA-SIMCA ?
- Quels projets idae adopteront MACHINE en priorité ?
- Faut-il étendre le DSL pour couvrir plus de cas ?
- Comment exposer MACHINE dans MOTEUR-DASHBOARD ?

## Connexions

[QOOLIE](qoolie/idea.md) — à intégrer (gestion data)  
[DELTA-SIMCA](delta-simca/idea.md) — à intégrer  
[MOTEUR-DASHBOARD](moteur-dashboard/idea.md) — pourrait bénéficier du socle  
[IDAE-DASHBOARD](idae-dashboard/idea.md) — projet existant à unifier  
[IDAEO-IDBQL](idae-idbql/idea.md) — dépendance directe
