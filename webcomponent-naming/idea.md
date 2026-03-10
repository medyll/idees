# idea-WEBCOMPONENT-NAMING

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-10
**Statut :** en croissance
**Tags :** Web Components, nommage, convention, Shadow DOM, interop

## Description
Réflexion sur les péchés originels des Web Components :

### 1. Le problème de nommage
- Convention actuelle : `mylib-button` → met la lib en préfixe
- Proposition : `button-mylib` → met le **type** en préfixe, la lib en suffixe
- Avantage : meilleure lisibilité sémantique, groupement naturel dans les IDE

### 2. Shadow DOM communicant
- Possibilité de créer un Shadow DOM qui communique en `.js` (module JS)
- Ouvrir le Shadow DOM sans le casser : events, slots, parts exposés proprement

## Potentiel
Manifeste / RFC pour améliorer l'ergonomie des Web Components. Pourrait devenir un article, une lib de conventions, ou une proposition W3C.

## Questions ouvertes
- Le nommage inversé est-il compatible avec les registres de composants existants ?
- Comment le Shadow DOM communicant évite-t-il les fuites de style ?

## Historique
- 2026-03-03 : Idée initiale capturée
