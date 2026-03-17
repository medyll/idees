# idea-SKILL-MEMOIRE

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** mémoire, LLM, skill, dégradation, cerveau, français

## Description

Un skill qui stocke des souvenirs en "petit français" et les dégrade progressivement dans le temps selon des règles qui imitent la mémoire humaine. **La clé : on recherche en partant de la pattern la plus dégradée et on remonte vers le détail si on trouve un match.**

La mémoire humaine n'est pas un disque dur. Elle dégrade, transforme, mélange. Ce skill simule ça :

- **Stockage en couches** : chaque souvenir existe en plusieurs niveaux de dégradation (du détail complet au vague souvenir)
- **Recherche inversée** : au lieu de chercher dans le détail, on commence par la version la plus dégradée (mots-clés flous) et on remonte vers le détail si on trouve un match pertinent
- **Recherche floue** : requêtes naturelles ("t'as pas un truc sur les grilles ?") matchent d'abord sur la version très dégradée, puis on enrichit la réponse si pertinent
- **Renforcement** : rappeler un souvenir le renforce et ralentit sa dégradation
- **Fusion** : des souvenirs similaires se fondent avec le temps en un souvenir composite

### Modes de dégradation (du détail au vague)

- Niveau 0 (frais) : détail complet, contexte riche
- Niveau 1 (quelques jours) : résumé avec l'essentiel
- Niveau 2 (semaines) : impression générale, mots-clés essentiels
- Niveau 3 (mois) : "j'ai un vague souvenir que..." (ultra-résumé)
- Niveau 4 (perdu) : disparu ou fusionné dans un autre souvenir

## Potentiel

Mémoire contextuelle réaliste pour agents LLM. Évite la sur-accumulation de contexte en simulant l'oubli naturel.

## Implémentation envisagée

- **Stockage multi-niveaux** : chaque souvenir enregistre ses N versions dégradées (du détail au vague)
- **Moteur de recherche régressif** : commence par chercher sur le Niveau 3 (ultra-dégradé), puis remonte vers Niveau 2, 1, 0 si besoin
- **Recherche floue sur versions dégradées** : embeddings ou BM25 sur les mots-clés essentiels (Niveau 3) avant d'aller chercher le contexte riche
- **Dégradation calculée** : fonction basée sur temps écoulé + nombre de rappels
- **LLM pour réécriture** : transformer "détail complet" → "résumé" → "impression générale" → "vague souvenir"
- **Interface** : skill Claude ou daemon en arrière-plan

## Questions ouvertes

- **Efficacité recherche** : À quel point chercher en partant du dégradé réduit-il vraiment le coût computationnel ?
- **Remontée du détail** : Quand le LLM enrichit la réponse depuis Niveau 0, ça "rajeunit" le souvenir ? (renforcement automatique)
- **Persistance multi-niveaux** : Comment stocker efficacement toutes les dégradations ? (fichiers plats, vector DB, SQLite)
- **Trigger de fusion** : Quand 2 souvenirs ressemblent trop (même Niveau 3), on les fusionne automatiquement ?
- **Mémoire photographique** : Faut-il un mode désactivable qui saute les dégradations ?
- **Cycles de dégradation** : Tous les N heures ? À la volée ? Basé sur nombre d'interactions ?
- **Saillance** : Comment définir qu'un souvenir mérite de rester "frais" ?

## Réflexion approfondie

Question résolue : **efficacité de la recherche inversée**. Chercher d'abord sur le Niveau 3 (5-10 mots-clés) avec BM25 coûte quasi rien. Si match, on récupère le Niveau 0 (détail complet) seulement si nécessaire. Le gain computationnel est réel : on évite d'embedder et de comparer des textes longs pour des requêtes qui ne matchent pas.

**Saillance** (question partiellement résolue) : un souvenir est saillant si (1) il a été rappelé récemment, (2) il est connecté à d'autres souvenirs actifs, (3) il a une charge émotionnelle marquée (détectable dans le texte par le LLM de stockage). Ces trois critères combinés → score de saillance.

Connexion inattendue avec **TIMELINE-CATALOG** : les tags d'un souvenir au Niveau 3 sont exactement ce que TIMELINE-CATALOG track. SKILL-MEMOIRE + TIMELINE-CATALOG = une mémoire avec conscience de son propre état (sait ce qu'elle a pensé récemment vs ce qu'elle oublie).

## Connexions

- [MATURATION](../maturation/idea.md) : un souvenir qui revient souvent pourrait devenir une idée dans MATURATION
- [SKILL-STACKOVERFLOW](../skill-stackoverflow/idea.md) : les bots pourraient utiliser ce système de mémoire
- [TIMELINE-CATALOG](../timeline-catalog/idea.md) : les tags Niveau 3 des souvenirs = vocabulaire actif trackable
- [MOTEUR-CATEGORISATION](../moteur-categorisation/idea.md) : backend d'indexation multi-catégories pour les souvenirs

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
