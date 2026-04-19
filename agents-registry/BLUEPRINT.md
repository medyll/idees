# BLUEPRINT — AGENTS-REGISTRY

**Statut :** 🌳 Mature  
**Date :** 2026-04-19  
**Version :** 1.0

---

## 🎯 Vision

Registre centralisé permettant aux agents logiciels de se déclarer, rapporter leur statut en temps réel, et être découverts par d'autres agents ou observateurs.

---

## 📦 Périmètre MVP

### Fonctionnalités Core
- [ ] Enregistrement agent (id, type, version, capacités)
- [ ] Signalement statut (idle, running, failed, completed)
- [ ] Heartbeat automatique (toutes les 30s)
- [ ] Historique des exécutions (logs + résultats)
- [ ] API REST + WebSocket (temps réel)
- [ ] Dashboard web simple (liste agents + statuts)

### Hors Scope (Post-MVP)
- [ ] ACLs avancées (qui peut parler à qui)
- [ ] Orchestration automatique (agents s'auto-organisent)
- [ ] Metrics avancées (performance, coût)

---

## 🏗️ Architecture Technique

### Stack Recommandée
```
Backend:
├── Node.js 18+ (ou Bun)
├── Fastify (API REST rapide)
├── Socket.io (WebSocket temps réel)
├── SQLite (registre + historique)
└── TypeScript

Dashboard:
├── Svelte 5 (ou React)
├── @medyll/css-base
└── Vite
```

### Structure du Projet
```
agents-registry/
├── server/
│   ├── src/
│   │   ├── api/
│   │   │   ├── agents.ts        # POST /agents, GET /agents/:id
│   │   │   ├── status.ts        # PATCH /agents/:id/status
│   │   │   └── logs.ts          # POST /agents/:id/logs
│   │   ├── db/
│   │   │   ├── schema.sql       # Tables SQLite
│   │   │   └── repository.ts    # Queries
│   │   ├── websocket/
│   │   │   └── handler.ts       # Socket.io events
│   │   └── index.ts             # Fastify server
│   └── package.json
├── dashboard/
│   ├── src/
│   │   ├── App.svelte
│   │   ├── components/
│   │   │   ├── AgentList.svelte
│   │   │   └── AgentDetail.svelte
│   │   └── lib/
│   │       └── api.ts
│   └── package.json
└── shared/
    └── types.ts                 # Types TypeScript partagés
```

---

## 🔧 Spécifications Détaillées

### 1. Schéma de Base de Données

```sql
-- Table agents
CREATE TABLE agents (
  id TEXT PRIMARY KEY,           -- UUID ou slug unique
  name TEXT NOT NULL,
  type TEXT NOT NULL,            -- 'orchestrator', 'worker', 'monitor', etc.
  version TEXT NOT NULL,         -- '1.0.0'
  capabilities TEXT[],           -- ['file-read', 'git-commit', 'bmad-run']
  status TEXT NOT NULL DEFAULT 'idle',
  last_heartbeat TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  metadata JSONB                 -- { endpoint: 'http://...', tags: [] }
);

-- Table execution_logs
CREATE TABLE execution_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  agent_id TEXT NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  event_type TEXT NOT NULL,      -- 'started', 'completed', 'failed', 'status_change'
  status_before TEXT,
  status_after TEXT,
  message TEXT,                  -- log message
  result JSONB,                  -- résultat de l'exécution
  FOREIGN KEY (agent_id) REFERENCES agents(id)
);

-- Index pour performance
CREATE INDEX idx_logs_agent ON execution_logs(agent_id);
CREATE INDEX idx_agents_status ON agents(status);
```

### 2. API REST

```typescript
// Enregistrement agent
POST /api/agents
{
  "id": "agent-maturation-01",
  "name": "Maturation Agent",
  "type": "orchestrator",
  "version": "1.0.0",
  "capabilities": ["file-read", "file-write", "git-commit"],
  "metadata": {
    "endpoint": "http://localhost:3001",
    "tags": ["maturation", "bmad"]
  }
}

// Mise à jour statut
PATCH /api/agents/:id/status
{
  "status": "running",
  "message": "Processing story #12"
}

// Récupérer infos agent
GET /api/agents/:id

// Lister tous les agents
GET /api/agents?status=running

// Poster un log
POST /api/agents/:id/logs
{
  "event_type": "status_change",
  "status_before": "idle",
  "status_after": "running",
  "message": "Starting bmad-continue"
}

// Historique agent
GET /api/agents/:id/logs?limit=50
```

### 3. WebSocket Events

```typescript
// Client subscribe
socket.emit('subscribe', { agentId: 'agent-maturation-01' });

// Server broadcast
socket.emit('agent:status', {
  agentId: 'agent-maturation-01',
  status: 'running',
  timestamp: '2026-04-19T10:30:00Z'
});

// Heartbeat
socket.emit('agent:heartbeat', {
  agentId: 'agent-maturation-01',
  lastSeen: '2026-04-19T10:30:00Z'
});
```

### 4. Heartbeat Strategy

```typescript
// Côté agent
setInterval(() => {
  fetch(`/api/agents/${AGENT_ID}/heartbeat`, { method: 'POST' });
}, 30000); // 30 secondes

// Côté server
// Marquer agent comme 'dead' si pas de heartbeat depuis 90s
const DEAD_THRESHOLD = 90000;

// Cleanup job (toutes les minutes)
async function markDeadAgents() {
  const threshold = new Date(Date.now() - DEAD_THRESHOLD);
  await db.run(
    `UPDATE agents SET status = 'dead' WHERE last_heartbeat < ? AND status != 'dead'`,
    [threshold]
  );
}
```

### 5. Types TypeScript Partagés

```typescript
// shared/types.ts
export type AgentStatus = 'idle' | 'running' | 'paused' | 'failed' | 'completed' | 'dead';

export type AgentType = 'orchestrator' | 'worker' | 'monitor' | 'scheduler';

export interface Agent {
  id: string;
  name: string;
  type: AgentType;
  version: string;
  capabilities: string[];
  status: AgentStatus;
  lastHeartbeat: string;
  createdAt: string;
  metadata: {
    endpoint?: string;
    tags?: string[];
    [key: string]: any;
  };
}

export interface ExecutionLog {
  id: number;
  agentId: string;
  timestamp: string;
  eventType: 'started' | 'completed' | 'failed' | 'status_change' | 'heartbeat';
  statusBefore?: AgentStatus;
  statusAfter?: AgentStatus;
  message?: string;
  result?: any;
}
```

---

## 🖥️ Dashboard UI

### Wireframe
```
┌─────────────────────────────────────────────────┐
│  Agents Registry                     [Refresh]  │
├─────────────────────────────────────────────────┤
│                                                 │
│  🟢 agent-maturation-01    orchestrator  v1.0   │
│     idle • last seen 2s ago                     │
│     [file-read, file-write, git-commit]         │
│                                                 │
│  🟡 agent-bmad-worker-01 worker         v0.9    │
│     running • "Processing story #12"            │
│     [bmad-run, test-runner]                     │
│                                                 │
│  🔴 agent-monitor-01     monitor        v1.2    │
│     failed • "Database connection lost"         │
│     [health-check, alerting]                    │
│                                                 │
├─────────────────────────────────────────────────┤
│  Total: 3 agents • 1 running • 1 idle • 1 failed│
└─────────────────────────────────────────────────┘
```

---

## 🧪 Plan de Tests

### Tests Unitaires
- [ ] Enregistrement agent avec ID unique
- [ ] Mise à jour statut persistée en DB
- [ ] Heartbeat met à jour `last_heartbeat`
- [ ] Agents morts détectés après 90s

### Tests d'Intégration
- [ ] API REST complète (CRUD agents)
- [ ] WebSocket broadcast temps réel
- [ ] Dashboard affiche statuts à jour

### Tests de Charge
- [ ] 100 agents simultanés
- [ ] 1000 logs/minute
- [ ] Dashboard reste fluide

---

## 📅 Roadmap

### Phase 1 : Core (1 semaine)
- [ ] Setup Fastify + SQLite
- [ ] API REST agents + status
- [ ] Schéma DB + repository
- [ ] Tests unitaires

### Phase 2 : Temps Réel (3 jours)
- [ ] Socket.io integration
- [ ] Heartbeat mechanism
- [ ] WebSocket events (status, heartbeat)

### Phase 3 : Dashboard (3 jours)
- [ ] Setup Svelte 5 + Vite
- [ ] Agent list + detail view
- [ ] Auto-refresh via WebSocket
- [ ] Filtering by status/type

### Phase 4 : Production (2 jours)
- [ ] Logs rotation (garder 30 jours)
- [ ] Backup automatique SQLite
- [ ] Documentation API
- [ ] Dockerfile optionnel

---

## 🚀 Mise en Service

### Pré-requis
- Node.js 18+ ou Bun
- SQLite (inclus avec Node)

### Commands
```bash
# 1. Server
cd agents-registry/server
npm install fastify @fastify/cors socket.io better-sqlite3
npm install -D typescript @types/node @types/better-sqlite3
npx tsc --init
npm run dev  # http://localhost:3000

# 2. Dashboard
cd agents-registry/dashboard
npm create vite@latest . -- --template svelte-ts
npm install @medyll/css-base
npm run dev  # http://localhost:5173

# 3. Enregistrer premier agent
curl -X POST http://localhost:3000/api/agents \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-agent-01",
    "name": "Test Agent",
    "type": "worker",
    "version": "1.0.0",
    "capabilities": ["test"]
  }'
```

---

## 📊 Métriques de Succès

| Métrique | Cible MVP | Cible V1 |
|----------|-----------|----------|
| Latence API | <50ms | <20ms |
| WebSocket lag | <100ms | <50ms |
| Agents supportés | 50 | 500 |
| Logs/minute | 100 | 1000 |
| Dashboard FPS | 60 | 60 |

---

## ⚠️ Risques Identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Single point of failure | Élevé | Mode cluster (PostgreSQL) en V2 |
| Performance SQLite | Moyen | Index optimisés, WAL mode |
| Concurrence écritures | Moyen | Transactions SQLite |
| Security (auth) | Élevé | API tokens en V2 (hors MVP) |

---

## 🔗 Dépendances

### Liens Internes
- [MATURATION](../maturation/idea.md) — Premier cas d'usage : agents de maturation
- [TIMELINE-CATALOG](../timeline-catalog/idea.md) — Chaque agent peut avoir son propre timeline
- [SKILL-EXPLORER](../skill-explorer/idea.md) — Pattern similaire de découverte

### Références Externes
- [Fastify](https://www.fastify.io/)
- [Socket.io](https://socket.io/)
- [better-sqlite3](https://github.com/JoshuaWise/better-sqlite3)

---

## 📝 Notes de Développement

- **Priorité** : Simplicité avant scalabilité (SQLite avant PostgreSQL)
- **Auth** : Hors MVP (ajouter API tokens en V2)
- **Observabilité** : Dashboard minimal mais fonctionnel
- **Extension** : Prévoir hooks pour plugins (ex: exporter logs vers ELK)

---

**Prochaine action :** Initialiser le projet server avec Fastify + SQLite et implémenter l'API REST `/api/agents`.
