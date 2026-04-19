# BLUEPRINT — MOTEUR-ANIMATION-CLIP

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Moteur d'animation 2D basé sur `clip-path` CSS : formes, masques, transitions 100% CSS, GPU-accélérés.

---

## 📦 MVP
- [ ] Parser clip-path (polygon, circle, ellipse)
- [ ] Timeline JSON déclarative
- [ ] Moteur d'interpolation keyframes
- [ ] Interactions via pointer-events
- [ ] Fallback canvas (optionnel)

**Stack :** TypeScript | CSS clip-path | RequestAnimationFrame

---

## 🔧 Core

### Timeline Format
```json
{
  "duration": 2000,
  "easing": "ease-in-out",
  "keyframes": [
    { "time": 0, "clip-path": "polygon(0 0, 100% 0, 100% 100%, 0 100%)" },
    { "time": 1000, "clip-path": "polygon(0 0, 100% 0, 100% 50%, 0 100%)" },
    { "time": 2000, "clip-path": "polygon(0 0, 100% 0, 100% 0, 0 0)" }
  ]
}
```

### API
```typescript
class ClipEngine {
  play(element: HTMLElement, timeline: Timeline): void;
  pause(): void;
  seek(time: number): void;
  on(event: 'complete' | 'frame', callback: () => void): void;
}
```

---

## 📅 Roadmap
1. **Semaine 1** : Parser clip-path + interpolation
2. **Semaine 2** : Timeline engine + easing
3. **Semaine 3** : Interactions + démos

---

## 🚀 Setup
```bash
mkdir moteur-animation-clip && cd moteur-animation-clip
npm install typescript vite
```

**Prochaine action :** Implémenter interpolation polygon() et tester sur démo simple.
