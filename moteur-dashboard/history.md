# Full History — idea-MOTEUR-DASHBOARD

---

## [2026-04-04 04:45] — Capture initiale

**Trigger :** Discussion utilisateur via chat WhatsApp/OpenClaw

Moteur de dashboard générique piloté par un explorateur de fichiers markdown/yaml. Évolution d'idae-dashboard pour en faire une plateforme universelle de visualisation de données structurées.

**Contexte :**
L'utilisateur travaille sur idae-dashboard (app Tauri qui lit des fichiers BMAD et affiche des pourcentages). Veut le rendre générique :
- Une section "Projets" qui va chercher des architectures particulières et affiche des choses particulières
- D'autres sections possibles
- Système d'affichage générique, plugin-able
- Capable d'afficher d'autres types de contenu

**Spécifications initiales :**
- Explorateur de fichiers markdown/yaml
- Sections dynamiques par type de projet
- Système de plugins extensible
- Affichage générique adaptable

**Connexions identifiées :**
- IDAE-DASHBOARD (projet source)
- INTERFACE-BRIDGE (pourrait bénéficier d'un dashboard unifié)
- SKILL-EXPLORER (navigation similaire)
