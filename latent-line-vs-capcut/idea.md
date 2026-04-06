# idea-LATENT-LINE-VS-CAPCUT

**Date initiale :** 2026-04-04  
**Dernière évolution :** 2026-04-04  
**Statut :** germination  
**Tags :** comparatif, vidéo, IA, édition, concurrent, positionnement

## Description

**Comparatif entre LATENT-LINE (projet personnel) et CAPCUT Desktop** — analyse de positionnement, fonctionnalités, design et approche.

**Contexte :**
Latent-line a été initié il y a 2-3 mois comme application d'édition vidéo tournée vers l'IA. CapCut vient de sortir des fonctionnalités similaires avec une approche "fun".

---

## Comparatif Fonctionnalités

| Catégorie | LATENT-LINE | CAPCUT Desktop |
|-----------|-------------|----------------|
| **Cible** | Créateurs de récits animés AI-driven | Grand public + créateurs pro |
| **Stack** | SvelteKit 5 + Vite + Zod | Native (Mac/PC) |
| **Timeline** | ✅ Événements temporels (ms) avec camera, lighting, FX, ControlNet | ✅ Keyframes + graphiques avancés |
| **Assets** | ✅ Characters, environments, audio avec prompts | ✅ Média local + cloud + recherche intelligente |
| **IA** | ✅ Orchestration AI (checkpoints, samplers, TTS, ControlNet) | ✅ CGIA (contenus générés IA), Script-to-Video, AI Writer |
| **Export** | ✅ YAML, JSON-LD, CSV, JSON, PDF, ZIP | ✅ Vidéo finale + export cloud |
| **Tests** | ✅ 218 tests unitaires + E2E | ❓ Non communiqué |
| **Cloud** | ❌ Local-first (localStorage) | ✅ Sync multi-dispositifs |
| **Partage** | ❌ Export fichiers | ✅ 1-clic TikTok, YouTube |
| **Color grading** | ❌ Non implémenté | ✅ Palette couleurs + auto-adjustment |
| **Effets** | ❌ FX basiques (bloom, blur) | ✅ Bibliothèque effets/filtres tendance |
| **Prix** | Gratuit (open source) | Gratuit + options payantes |

---

## Comparatif Design & Approche

| Aspect | LATENT-LINE | CAPCUT Desktop |
|--------|-------------|----------------|
| **Philosophie** | Outil de **production** AI-driven (orchestration de génération) | Outil d'**édition** vidéo classique boosté IA |
| **UX** | Technique, orienté "data model" (schema, validation, inspection) | Grand public, "ease of use", fun |
| **Workflow** | Définir assets → Construire timeline → Exporter pour génération | Importer médias → Éditer → Exporter vidéo finale |
| **Public** | Créateurs de récits animés, tech-savvy | Novices → Pros, créateurs TikTok/YouTube |
| **Différenciation** | **En amont** de la vidéo (pré-production AI) | **Sur** la vidéo (post-production) |

---

## Positionnement Stratégique

**LATENT-LINE n'est pas en concurrence directe avec CAPCUT.**

| | LATENT-LINE | CAPCUT |
|--|-------------|--------|
| **Quand ?** | **Avant** la génération vidéo (pré-production) | **Après** capture/création (post-production) |
| **Quoi ?** | Orchestre la **génération** AI de scènes | **Édite** des vidéos existantes |
| **Sortie** | Narrative + params AI → À générer ailleurs | Vidéo finale prête à publier |

**Opportunité :**
- LATENT-LINE pourrait **exporter vers CAPCUT** (générer d'abord avec AI, puis éditer dans CAPCUT)
- Ou intégrer un **moteur de rendu vidéo** pour concurrencer directement

---

## Questions ouvertes

- Faut-il pivoter vers un outil de pré-production AI (niche) ou viser l'édition complète (concurrence CAPCUT) ?
- Ajouter un moteur de rendu vidéo intégré ou rester en amont (orchestration) ?
- Comment intégrer le cloud sans perdre le local-first ?
- Faut-il ajouter des templates "fun" comme CAPCUT ou rester technique ?

## Connexions

[LATENT-LINE](latent-line/idea.md) — projet source  
[MOTEUR-ANIMATION-CLIP](moteur-animation-clip/idea.md) — pourrait servir de moteur de rendu  
[IDAE-MACHINE-COEUR](idae-machine-coeur/idea.md) — socle UI/data unifié
