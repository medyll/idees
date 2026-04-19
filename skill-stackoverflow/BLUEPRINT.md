# BLUEPRINT — SKILL-STACKOVERFLOW

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Skill simulant une communauté Stack Overflow avec bots à personas (débutant, senior, sceptique) qui débattent autour d'une question technique.

---

## 📦 MVP
- [ ] 4 personas : Débutant, Senior, Sceptique, Evangéliste
- [ ] Orchestrateur tournoi délibératif
- [ ] 3 tours de débat max
- [ ] Synthèse finale consolidée
- [ ] Simulation locale (pas de post réel sur SO)
- [ ] Input : question technique + tags

**Stack :** TypeScript | LLM API | Prompt templates

---

## 🔧 Core

### Personas
```typescript
const PERSONAS = {
  beginner: "Tu es débutant, tu poses des questions naïves mais pertinentes",
  senior: "Tu es senior backend, pragmatique, tu détestes le over-engineering",
  skeptic: "Tu challenges tout, tu cherches les edge cases",
  evangelist: "Tu adores les nouvelles technos, tu proposes toujours la dernière version"
};
```

### Orchestrateur
```typescript
async function debate(question: string): Promise<string> {
  const turns = [];
  
  // Tour 1 : Débutant pose sous-questions
  turns.push(await llm.generate(PERSONAS.beginner, question));
  
  // Tour 2 : Senior répond
  turns.push(await llm.generate(PERSONAS.senior, { question, previous: turns }));
  
  // Tour 3 : Sceptique challenge
  turns.push(await llm.generate(PERSONAS.skeptic, { question, previous: turns }));
  
  // Synthèse
  return await llm.synthesize({ question, turns });
}
```

---

## 📅 Roadmap
1. **Semaine 1** : Personas + prompts de base
2. **Semaine 2** : Orchestrateur + tours de parole
3. **Semaine 3** : Synthèse + tests utilisateurs

---

## 🚀 Setup
```bash
mkdir skill-stackoverflow && cd skill-stackoverflow
npm install openai
```

**Prochaine action :** Écrire prompts des 4 personas et tester avec questions simples.
