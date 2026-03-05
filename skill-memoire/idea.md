# idea-SKILL-MEMOIRE

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-03
**Statut :** germination
**Tags :** mémoire, LLM, skill, dégradation, cerveau, français

## Description

Un skill qui stocke des souvenirs en "petit français" et les dégrade progressivement dans le temps selon des règles qui imitent la mémoire humaine. On y accède avec des règles de rappel similaires à celles du cerveau.

La mémoire humaine n'est pas un disque dur. Elle dégrade, transforme, mélange. Ce skill simule ça :

- **Stockage** : les faits sont enregistrés en "petit français" (phrases courtes, informelles, pas de JSON froid)
- **Dégradation temporelle** : plus un souvenir est ancien et peu rappelé, plus il devient flou (résumé, perte de détails, approximation)
- **Règles de rappel** : on accède à la mémoire avec des requêtes floues ("t'as pas un truc sur les grilles ?") plutôt que des clés exactes
- **Renforcement** : rappeler un souvenir le renforce et ralentit sa dégradation
- **Fusion** : des souvenirs similaires se fondent avec le temps en un souvenir composite

### Modes de dégradation

- Niveau 0 (frais) : détail complet
- Niveau 1 (quelques jours) : résumé avec l'essentiel
- Niveau 2 (semaines) : impression générale, mots-clés
- Niveau 3 (mois) : "j'ai un vague souvenir que..."
- Niveau 4 (perdu) : disparu ou fusionné dans un autre souvenir

## Potentiel

Mémoire contextuelle réaliste pour agents LLM. Évite la sur-accumulation de contexte en simulant l'oubli naturel.

## Implémentation envisagée

- Fichiers de mémoire horodatés avec niveau de fraîcheur calculé
- Fonction de dégradation basée sur le temps écoulé + nombre de rappels
- Moteur de recherche flou (embeddings ou BM25 léger) pour les requêtes naturelles
- LLM pour la réécriture dégradée (résumé de résumé)
- Interface : skill Claude ou daemon en arrière-plan

## Questions ouvertes

- La dégradation est-elle automatique (daemon) ou calculée à la volée au moment du rappel ?
- Comment persister l'état de dégradation sans recalculer à chaque fois ?
- Le "petit français" est-il une contrainte de format de stockage ou juste le style de réponse ?
- Faut-il un mode "mémoire photographique" désactivable ?
- La dégradation est temporelle (en heures/jours) ou liée au nombre d'interactions ?
- Comment définir qu'un souvenir est "saillant" ?
- Stockage : fichiers plats, vector DB, SQLite ?

## Connexions

- **IDEAX** : MEMO pourrait alimenter IDEAX — un souvenir qui revient souvent devient une idée.
- **SKILL-STACKOVERFLOW** : les bots pourraient utiliser ce système de mémoire.

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
