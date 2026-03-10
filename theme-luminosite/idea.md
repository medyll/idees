# idea-THEME-LUMINOSITE

**Date initiale :** 2026-03-03
**Dernière évolution :** 2026-03-10
**Statut :** en croissance
**Tags :** CSS, thème, dark mode, luminosité, accessibilité, capteur

## Description
Un thème qui passe de **dark → light** par paliers en fonction de la luminosité ambiante détectée par le device.

### Comportement
- Pas de transition brusque : changement **par paliers** (ex: 3 niveaux : sombre / intermédiaire / clair)
- S'adapte automatiquement à l'environnement de l'utilisateur
- Utilise l'API `AmbientLightSensor` ou `matchMedia` comme fallback

## Potentiel
Meilleure accessibilité, confort visuel adaptatif, différenciateur UX pour apps mobiles et desktop.

## Questions ouvertes
- `AmbientLightSensor` est peu supporté — quel fallback réaliste ?
- Les paliers sont configurables par l'utilisateur ou fixes ?
- Transition animée entre paliers ou instantanée ?
- Connexion avec les variables CSS custom pour le thème ?

## Historique
- 2026-03-03 : Idée initiale capturée
