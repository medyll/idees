# BLUEPRINT — INTERFACE-BRIDGE

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Programme LLM qui génère automatiquement une interface "glue" entre deux systèmes incompatibles (OpenAPI, TypeScript, JSON schema).

---

## 📦 MVP
- [ ] Input : 2 interfaces (OpenAPI/TypeScript/YAML) + contexte métier
- [ ] LLM chain : analyse → mapping → génération
- [ ] Output : adaptateur + DTOs + documentation
- [ ] Rapport de conflits non résolus
- [ ] 3 modes : automatique, assisté, manuel
- [ ] Prompt maître versionné

**Stack :** TypeScript | LLM API (OpenAI/Claude) | Zod validation

---

## 🔧 Core

### Architecture
```typescript
interface BridgeConfig {
  sourceInterface: string;    // OpenAPI/TypeScript
  targetInterface: string;    // OpenAPI/TypeScript
  context: string;            // Contexte métier
  mode: 'auto' | 'assisted' | 'manual';
  promptMaster: string;       // Règles de mapping
}

interface BridgeResult {
  adapter: string;            // Code généré
  dtos: string[];             // Types intermédiaires
  documentation: string;
  conflicts: Conflict[];      // Non résolus
}
```

### LLM Chain
```typescript
async function generateBridge(config: BridgeConfig): Promise<BridgeResult> {
  const analysis = await llm.analyze(config.source, config.target);
  const mapping = await llm.map(analysis, config.promptMaster);
  const code = await llm.generate(mapping, config.mode);
  const conflicts = await llm.identifyConflicts(analysis, mapping);
  
  return { adapter: code, dtos: mapping.dtos, documentation: mapping.docs, conflicts };
}
```

---

## 📅 Roadmap
1. **Semaine 1** : Parser interfaces + prompts de base
2. **Semaine 2** : LLM chain complète
3. **Semaine 3** : Modes + rapport conflits

---

## 🚀 Setup
```bash
mkdir interface-bridge && cd interface-bridge
npm install openai zod typescript
```

**Prochaine action :** Créer prompts d'analyse et tester sur 2 APIs simples (ex: Stripe → PayPal).
