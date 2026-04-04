# Agent Capture Maturation — Script de Traitement

## Rôle
Traiter les idées brutes depuis `capture-maturation.md` et les migrer vers le système de maturation.

## Algorithme

1. **Lire** `capture-maturation.md`
2. **Parser** les idées entre `---IDEE---` (section "Idées en attente de traitement")
3. **Compter** le nombre d'idées
4. **Pour chaque idée non traitée :**
   - Extraire date, source, tags, description
   - Générer un CODE (slug uppercase, 2-4 mots)
   - Checker `idea-index.md` pour doublons
   - Si doublon → fusionner ou connecter
   - Si nouveau → créer `code-lowercase/idea.md` + `history.md`
   - Mettre à jour `idea-index.md`
5. **Rotation :** Si >30 idées après traitement → supprimer les plus anciennes (bas du fichier)
6. **Mettre à jour** `capture-maturation.md` (garder max 30 idées non traitées)
7. **Notifier** l'utilisateur (format sobre, max 4 lignes)

## Format de notification

```
▸ Idée capturée — [CODE]
  Synopsis : [1 ligne de résumé]
  → capture-maturation.md
```

## Règles

- Max **30 idées** dans le fichier
- Rotation par **le bas** (supprimer anciennes idées traitées en premier)
- Respecter le format maturation (idea.md + history.md)
- Dates en YYYY-MM-DD HH:MM
- CODE en uppercase, slugifié
- Tags lowercase, séparés par virgules
- Ne jamais supprimer une idée brute sans l'avoir migrée
- En cas de doute sur un doublon → créer + ajouter connexion
- Notification sobre, max 4 lignes, pas d'emoji colorés
