# idea-IA-BOX

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** hardware, IA, boîtier, local, SteamDeck, embarqué

## Description
Une IA Box inspirée de la SteamBox : un boîtier physique dédié à faire tourner des modèles IA localement, plug-and-play, sans cloud.

## Potentiel
Souveraineté numérique, confidentialité, IA hors-ligne. Marché potentiel : créateurs, entreprises, particuliers tech.

## Réflexion approfondie

Le marché converge vers ce concept : Apple Silicon (mémoire unifiée), AMD APU Ryzen AI, NVIDIA Jetson. La vraie valeur de IA-BOX n'est pas le matériel — c'est **l'expérience d'installation zéro** : brancher, allumer, l'IA tourne. L'OS et le modèle sont préconfigurés.

Différenciateur clé : **la sélection du modèle comme expérience utilisateur**. Pas une liste de modèles, mais un "mode" : "mode créatif", "mode code", "mode chat" — chacun précharge le bon modèle avec les bons paramètres.

Connexion inattendue avec **SKILL-MEMOIRE** : la IA-BOX serait le hardware naturel pour héberger un système de mémoire persistante locale — les souvenirs stockés sur le device, pas dans le cloud.

## Questions ouvertes
- Matériel : AMD APU (meilleur rapport perf/watt/prix) ou NVIDIA (meilleure compatibilité CUDA) ?
- OS : NixOS (reproductible, atomic upgrades) ou Ubuntu Server minimal ?
- Interface : web locale (port 3000) ou écran E-ink intégré pour statut ?
- Facteur de forme : mini-PC (N100 style) ou boîtier dédié avec venting custom ?
- Stratégie modèle : Ollama en backend, interface Modelfile pour swap de modèles ?

## Connexions
- [SKILL-MEMOIRE](../skill-memoire/idea.md) : plateforme naturelle pour mémoire LLM locale persistante
- [AGENTS-REGISTRY](../agents-registry/idea.md) : la box pourrait héberger un registre d'agents local

## Historique
- 2026-03-03 : Idée initiale capturée
