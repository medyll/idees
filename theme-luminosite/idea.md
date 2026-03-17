# idea-THEME-LUMINOSITE

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-17
**Statut :** mature
**Tags :** CSS, thème, dark mode, luminosité, accessibilité, capteur

## Description
Un thème qui passe de **dark → light** par paliers en fonction de la luminosité ambiante détectée par le device.

### Comportement
- Pas de transition brusque : changement **par paliers** (ex: 3 niveaux : sombre / intermédiaire / clair)
- S'adapte automatiquement à l'environnement de l'utilisateur
- Utilise l'API `AmbientLightSensor` ou `matchMedia` comme fallback

## Potentiel
Meilleure accessibilité, confort visuel adaptatif, différenciateur UX pour apps mobiles et desktop.

## Réflexion approfondie

Question résolue : **fallback réaliste**. `AmbientLightSensor` n'a que ~30% de support. Fallback par ordre de priorité : (1) `matchMedia('(prefers-color-scheme: dark)')` comme état initial, (2) heure de la journée comme proxy de luminosité (6h-20h = clair, reste = sombre), (3) la caméra frontale sur mobile comme capteur de luminosité approximatif (via `getUserMedia` + analyse de frame). Les trois fallbacks donnent une expérience dégradée gracieusement.

Implémentation : les paliers comme **CSS custom properties** (`--theme-level: 0|1|2`) que l'app met à jour. Tout le thème réagit via `[data-theme-level="0"] { ... }`. Transition via `transition: background-color 0.5s ease`.

Connexion inattendue avec **APP-MOBILE-GRID** : le niveau de luminosité pourrait influencer la densité de l'interface (plus sombre = interface plus contrastée et simplifiée).

## Questions ouvertes
- `AmbientLightSensor` : prioriser heure-du-jour ou caméra comme fallback ?
- Les paliers sont configurables (nombre et seuils) ou fixes à 3 niveaux ?
- Transition animée entre paliers (0.3s) ou instantanée pour l'accessibilité ?
- Système opt-out clair (l'utilisateur peut forcer un thème fixe) ?

## Connexions
- [CSS-OVERFLOW-COMPONENT](../css-overflow-component/idea.md) : les deux explorent CSS custom properties comme API de thème
- [APP-MOBILE-GRID](../app-mobile-grid/idea.md) : la luminosité pourrait influencer la densité de l'interface

## Historique
- 2026-03-03 : Idée initiale capturée
