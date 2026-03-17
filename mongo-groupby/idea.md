# idea-MONGO-GROUPBY

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** MongoDB, SQL, aggregation, DX

## Description

Proposer une abstraction plus lisible et composable pour remplacer les pipelines `MongoDB.aggregate()`, en particulier les étapes `$group` (groupBy) et `$lookup` (join), sans perdre la puissance de Mongo.

Le pipeline `aggregate` de MongoDB est puissant mais verbeux et peu intuitif. L'idée est de créer une couche d'abstraction qui :

- Expose des méthodes `groupBy(field, { sum, avg, count... })` lisibles
- Expose un `join(collection, { on, select })` façon SQL
- Reste compatible avec Mongo (transpile vers aggregate en arrière-plan)
- Peut être utilisée comme librairie légère ou comme DSL

L'objectif n'est pas de réinventer un ORM complet, mais de résoudre ce point de friction précis.

## Potentiel

Réduire drastiquement la verbosité des agrégations MongoDB. Pourrait être une lib JS/TS ou une surcouche ODM.

## Implémentation envisagée

- API fluent/chainable : `db.collection('orders').groupBy('userId', { total: sum('amount') }).join('users', { on: '_id' })`
- Transpileur vers pipeline `$aggregate` MongoDB natif
- TypeScript-first avec inférence de types sur les résultats
- Support optionnel pour exécuter la même requête en mémoire (pour tests sans Mongo)
- Zero-dependency si possible, ou peer-dep sur le driver Mongo officiel

## Questions ouvertes

- Est-ce une lib npm standalone ou un plugin/extension du driver officiel ?
- Faut-il supporter d'autres bases NoSQL (ex: Firestore) ou rester Mongo-only ?
- Comment gérer les cas complexes : `$unwind`, `$facet`, `$bucket` ?
- Existe-t-il déjà des libs similaires ? (mongoose ne couvre pas vraiment ça)
- Simple surcouche syntaxique ou vrai DSL compilé vers le pipeline aggregate ?
- Support de toutes les étapes de pipeline ou seulement les plus communes ?
- Compatible Mongoose ?

## Réflexion approfondie

La vraie tension : **lisibilité vs exhaustivité**. Les cas simples (groupBy + join) couvrent 80% des usages réels. Les 20% restants (`$facet`, `$bucket`, `$unwind`) sont là où le pipeline Mongo brille. La lib doit permettre **l'évasion gracieuse** : si la méthode fluent ne suffit pas, on peut passer au pipeline brut directement.

Piste de design : `db.collection('orders').groupBy(...).raw([{ $bucket: ... }])` — le `.raw()` insère du pipeline natif dans la chaîne fluent.

Question résolue (partielle) : Mongoose ne couvre pas ça car il cible le schéma/validation, pas l'aggregation ergonomique. La lib serait complémentaire de Mongoose, pas concurrente.

## Connexions

- [INTERFACE-BRIDGE](../interface-bridge/idea.md) : pourrait générer l'adaptateur MongoDB automatiquement
- Connexion potentielle avec **MOTEUR-CATEGORISATION** : une ontologie stockée en Mongo bénéficierait directement de cette API pour les requêtes hiérarchiques

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
