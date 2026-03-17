# idea-WEBCOMPONENT-NAMING

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
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

## Réflexion approfondie

Question résolue : **compatibilité du nommage inversé**. Les registres de composants existants (npm, CDN) utilisent le préfixe lib par convention sociale, pas par contrainte technique. Rien n'empêche `customElements.define('button-mylib', ...)`. La migration est une convention, pas un breaking change.

Le vrai argument pour le nommage inversé : **l'autocomplete IDE**. Taper `button` dans un fichier HTML suggère tous les composants de type "bouton" de toutes les libs. Taper `mylib` ne suggère que les composants de cette lib. Le premier usage est plus fréquent.

**Shadow DOM communicant** : les `CSS ::part()` exposent des sous-éléments stylables de l'extérieur sans casser l'encapsulation. La communication JS passe par des événements custom sur l'élément hôte (pas dans le shadow). Ce patron est déjà supporté et documenté — la question est de le standardiser comme convention.

Connexion inattendue avec **CSS-OVERFLOW-COMPONENT** : ce composant est un cas d'école — il a besoin d'exposer `::part(scroll-container)` pour que les thèmes puissent styler la scrollbar, et doit propager des events `scroll` vers l'extérieur du shadow.

## Questions ouvertes
- Convention `button-mylib` vs `mylib-button` : comment convaincre l'écosystème ?
- Les registres npm et frameworks (Lit, Stencil) supportent-ils cette convention ?
- Un linter (ESLint plugin) pourrait enforcer la convention automatiquement ?

## Connexions
- [CSS-OVERFLOW-COMPONENT](../css-overflow-component/idea.md) : cas d'école pour Shadow DOM avec parts exposés
- Potentiel article/RFC : "Web Components naming manifesto"

## Historique
- 2026-03-03 : Idée initiale capturée
