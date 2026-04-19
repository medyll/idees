# BLUEPRINT — OPENCLAW-TAILSCALE-DOMAINS

**Statut :** 🌱 Germination | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Accès aux projets OpenClaw via sous-domaines Tailscale sécurisés (`project-name.tailnet.ts.net`), HTTPS auto, isolation par port.

---

## 📦 MVP
- [ ] Tailscale Router Middleware (routing par domaine)
- [ ] Domain Manager (allocation sous-domaines)
- [ ] Funnel Controller (config auto Tailscale Funnel)
- [ ] Gateway Config (`~/.openclaw/openclaw.json`)
- [ ] HTTPS automatique via Tailscale

**Stack :** Node.js | Tailscale API | Fastify

---

## 🔧 Core

### Architecture
```
project-a.ts.net ─┐
project-b.ts.net ─┼→ Tailscale Funnel → OpenClaw Router → :3001, :3002
project-c.ts.net ─┘
```

### Router Middleware
```typescript
interface RouteConfig {
  domain: string;        // 'project-a.ts.net'
  targetPort: number;    // 3001
  projectId: string;
}

async function routeRequest(domain: string): Promise<number> {
  const config = await loadRouteConfig(domain);
  return config.targetPort;
}
```

---

## 📅 Planning (déjà documenté)
- **Sprint 1 (5j)** : Router + Domain Manager
- **Sprint 2 (5j)** : Automatisation Funnel
- **Sprint 3 (5j)** : Domaines personnalisés

---

## 🚀 Setup
```bash
cd D:\boulot\dev\openclaw-windows-pwa\tailscale-domains
npm install fastify @tailscale/client
```

**Prochaine action :** Implémenter Router Middleware et tester avec 2 projets locaux.
