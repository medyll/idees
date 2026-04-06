# OPENCLAW-TAILSCALE-DOMAINS — Accès aux projets via sous-domaines Tailscale

**Statut:** 🌱 En germination  
**Créé:** 2026-04-06  
**Dernière mise à jour:** 2026-04-06  
**Tags:** openclaw, tailscale, domaines, HTTPS, deployment, zero-config

---

## 📋 Description

Permettre l'accès aux projets OpenClaw via des sous-domaines Tailscale sécurisés (`project-name.tailnet.ts.net`), avec HTTPS automatique et isolation des projets par port.

---

## 🎯 Problème Résolu

**Actuellement:**
- OpenClaw Gateway tourne sur localhost (127.0.0.1:18789)
- Tailscale fournit l'accès réseau mais pas le routing par domaine
- Les projets ne sont pas accessibles via des URLs mémorables
- Pas d'isolation au niveau du domaine

**Solution:**
- Chaque projet obtient un sous-domaine unique
- HTTPS automatique via Tailscale Funnel
- Isolation des projets au niveau du domaine
- Déploiement zero-config

---

## 🏗️ Architecture

```
project-a.ts.net ─┐
project-b.ts.net ─┼→ Tailscale Funnel → OpenClaw Router → Project A (:3001)
project-c.ts.net ─┘                                        → Project B (:3002)
```

### Composants

1. **Tailscale Router Middleware** — Route les sous-domaines vers les ports projets
2. **Domain Manager** — Gère l'allocation des sous-domaines
3. **Funnel Controller** — Automatise la configuration Tailscale Funnel
4. **Gateway Config** — Configuration dans `~/.openclaw/openclaw.json`

---

## 🔐 Sécurité

- **Contrôle d'accès:** ACLs Tailscale (pas d'auth additionnelle)
- **HTTPS:** Automatique via Tailscale Funnel
- **Isolation:** Isolation des projets par port
- **Certificats:** Renouvellement automatique par Tailscale

---

## 📅 Planning

| Sprint | Durée | Objectif |
|--------|-------|----------|
| **Sprint 1** | 5 jours | Router Tailscale + Domain Manager |
| **Sprint 2** | 5 jours | Automatisation Funnel |
| **Sprint 3** | 5 jours | Domaines personnalisés |

---

## 🔗 Connexions

| Idée | Relation |
|------|----------|
| [OPENCLAW-OS-INTEGRATION](../openclaw-os-integration/idea.md) | ICônes PWA dans Windows — complément déploiement |
| [IDAE-DASHBOARD-MULTI-SCOPES](../idae-dashboard-multi-scopes/idea.md) | Architecture multi-scopes — pattern similaire |
| [MOTEUR-DASHBOARD](../moteur-dashboard/idea.md) | Dashboard de gestion des domaines |

---

## 📚 Documentation

- **PRD:** `D:\boulot\dev\openclaw-windows-pwa\tailscale-domains\bmad\prd.md`
- **Architecture:** `D:\boulot\dev\openclaw-windows-pwa\tailscale-domains\bmad\architecture.md`
- **BMAD Status:** `D:\boulot\dev\openclaw-windows-pwa\tailscale-domains\bmad\status.yaml`

---

## 🚀 Prochaines Étapes

1. ✅ PRD et Architecture complétés
2. ⏳ En attente de validation utilisateur
3. ⏳ Sprint 1: Implementation router + domain manager

---

## 📊 Métriques de Succès

| Métrique | Cible |
|----------|-------|
| Temps de résolution de domaine | < 100ms |
| Isolation des projets | 100% |
| Couverture HTTPS | 100% |
| Temps de setup utilisateur | < 5 min |

---

**Références:**
- [Tailscale Funnel Docs](https://tailscale.com/kb/1223/funnel)
- [Tailscale DNS](https://tailscale.com/kb/1081/dns)
- [OpenClaw Gateway](https://docs.openclaw.ai/gateway)
