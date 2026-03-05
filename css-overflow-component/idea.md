# idea-CSS-OVERFLOW-COMPONENT

**Date initiale :** 2026-03-02
**Dernière évolution :** 2026-03-03
**Statut :** germination
**Tags :** CSS, composant, overflow, pseudo-composant, layout

## Description

Un composant web (ou pseudo-composant CSS/JS) qui occupe 100% de la hauteur de son conteneur, lequel est en `overflow: clip` ou propriété équivalente moderne, en position statique pour ne pas perturber le flux.

Le problème de conception : on veut qu'un élément remplisse exactement son conteneur sans déborder, mais sans recourir à `position: absolute` (qui sort du flux et casse le scroll parent), et sans que `display: contents` empêche le scroll interne.

### Contraintes identifiées

- Le conteneur doit être en `overflow: clip` (ou `overflow: hidden`) pour contenir l'enfant
- Le composant doit rester en `position: static` pour ne pas perturber le layout environnant
- `display: contents` est problématique car il supprime la boîte de rendu et peut bloquer le scroll
- L'objectif est peut-être `height: 100cqh` (container query height) ou une combinaison moderne

### API du composant

```html
<Overflow overflow="auto" overflow-clip="hidden">
  <!-- contenu -->
</Overflow>
```

Les props `overflow` et `overflow-clip` sont des attributs de présentation, pas métier.

## Potentiel

Composant layout réutilisable pour des panels, drawers, sidebars, modals avec scroll interne propre.

## Implémentation envisagée

- Web Component natif (`customElements.define`) ou composant React/Vue/Svelte
- CSS custom properties en interne (`--overflow`, `--overflow-clip`)
- Utilisation de `container-type: size` sur le parent pour les unités `cq*`
- Tests cross-browser sur le comportement de scroll avec `overflow: clip` vs `overflow: hidden`
- Fallback gracieux pour les navigateurs sans support `cqh`

## Questions ouvertes

- `overflow: clip` vs `overflow: hidden` — quelle différence exacte pour ce cas d'usage ?
- `100cqh` nécessite que le conteneur soit un container query — est-ce acceptable ?
- Est-ce qu'un simple `height: 100%` + `overflow: auto` sur l'enfant ne suffirait pas avec le bon contexte ?
- Framework-agnostic ou ciblé React ?
- Y a-t-il un cas d'usage concret qui a motivé cette idée ?
- Web Component natif ou simple classe utilitaire CSS ?
- Compatible avec les containers queries ?
- Testé dans quel contexte (Flexbox ? Grid ?) ?

## Connexions

Relation technique avec **CSS-3D-LANGUAGE** : les deux travaillent sur les limites CSS modernes.

## Historique

- 2026-03-03 : Contenu enrichi avec implémentation envisagée
- 2026-03-02 : Idée initiale capturée
