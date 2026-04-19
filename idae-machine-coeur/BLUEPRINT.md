# BLUEPRINT — IDAE-MACHINE-COEUR

**Statut :** 🌿 En croissance | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Librairie schema-driven UI & validation unifiée pour tous les projets idae (déjà opérationnelle v0.136.0, 186 tests).

---

## 📦 État Actuel
- ✅ Package NPM : `@medyll/idae-machine@0.136.0`
- ✅ 186 tests unitaires (100% pass)
- ✅ OWASP 100% compliance
- ✅ Performance : <5ms par validation
- ✅ Demo : Car rental business (6 collections)

**Localisation :** `D:\boulot\dev\node\idae\packages\idae-machine`

---

## 🔧 Core

### Features
```typescript
// Schema-driven UI
const schema = {
  name: { type: 'text', required: true },
  age: { type: 'number', min: 0 },
  fk_user: { type: 'fk', collection: 'users' }
};

// Validation DSL
validate(data, schema); // → errors[]

// UI auto-générée
<FormField schema={schema.name} />
```

### Intégrations Prévues
- **QOOLIE** : gestion data
- **DELTA-SIMCA** : à définir
- **MOTEUR-DASHBOARD** : socle technique

---

## 📅 Roadmap
1. **Semaine 1** : Intégrer QOOLIE
2. **Semaine 2** : Définir DELTA-SIMCA
3. **Semaine 3** : Étendre DSL + docs

---

## 🚀 Setup
```bash
cd D:\boulot\dev\node\idae\packages\idae-machine
npm install
npm test  # 186 tests
```

**Prochaine action :** Documenter intégration QOOLIE et définir scope DELTA-SIMCA.
