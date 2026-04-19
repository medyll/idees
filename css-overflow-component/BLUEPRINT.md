# BLUEPRINT — CSS-OVERFLOW-COMPONENT

**Statut :** 🌳 Mature  
**Date :** 2026-04-19  
**Version :** 1.0

---

## 🎯 Vision

Composant layout réutilisable qui occupe 100% de la hauteur de son conteneur avec gestion propre du scroll, sans `position: absolute`, utilisant les Container Queries modernes.

---

## 📦 Périmètre MVP

### Fonctionnalités Core
- [ ] Web Component natif `<overflow-container>`
- [ ] Props : `overflow`, `overflow-clip`
- [ ] Height: 100cqh (container query height)
- [ ] Fallback ResizeObserver (sans container queries)
- [ ] CSS `parts` exposés pour thématisation

### Hors Scope (Post-MVP)
- [ ] Support anciens navigateurs (IE11)
- [ ] Versions React/Vue/Svelte wrappers
- [ ] Gestion scroll horizontal (vertical only MVP)

---

## 🏗️ Architecture Technique

### Stack Recommandée
```
Core:
├── TypeScript
├── Web Components natifs
├── Container Queries (CSS)
└── ResizeObserver (fallback)

Build:
├── Vite (lib mode)
├── @medyll/css-base
└── npm publish
```

### Structure du Projet
```
css-overflow-component/
├── src/
│   ├── OverflowContainer.ts   # Web Component
│   ├── OverflowContainer.css  # Styles + parts
│   └── types.ts
├── demo/
│   └── index.html
├── package.json
└── README.md
```

---

## 🔧 Spécifications Détaillées

### 1. Web Component

```typescript
// src/OverflowContainer.ts

export class OverflowContainer extends HTMLElement {
  static get observedAttributes() {
    return ['overflow', 'overflow-clip'];
  }
  
  private resizeObserver: ResizeObserver;
  private containerType: 'size' | 'inline-size' = 'size';
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    
    // Fallback ResizeObserver
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        this.style.height = `${height}px`;
      }
    });
  }
  
  connectedCallback() {
    this.render();
    this.resizeObserver.observe(this.parentElement!);
  }
  
  disconnectedCallback() {
    this.resizeObserver.disconnect();
  }
  
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (oldValue !== newValue) {
      this.render();
    }
  }
  
  private render() {
    const overflow = this.getAttribute('overflow') || 'auto';
    const overflowClip = this.getAttribute('overflow-clip') || 'hidden';
    
    this.shadowRoot!.innerHTML = `
      <style>
        :host {
          display: block;
          container-type: ${this.containerType};
          height: 100cqh;
          overflow: ${overflow};
          overflow-clip-margin: ${overflowClip};
        }
        
        /* Parts exposés pour thématisation */
        ::part(scrollbar) {
          /* Customisé par l'utilisateur */
        }
      </style>
      
      <div part="content">
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('overflow-container', OverflowContainer);
```

### 2. CSS avec @medyll/css-base

```css
/* src/OverflowContainer.css */
@import '@medyll/css-base';

:host {
  display: block;
  container-type: size;
  height: 100cqh;
  overflow: auto;
  overflow-clip-margin: hidden;
  
  /* Smooth scrolling */
  scroll-behavior: smooth;
  
  /* Scrollbar styling via parts */
  &::part(scrollbar) {
    width: 8px;
  }
  
  &::part(scrollbar-thumb) {
    background: var(--color-neutral-300);
    border-radius: 4px;
    
    &:hover {
      background: var(--color-neutral-400);
    }
  }
}

/* Fallback sans container queries */
@supports not (container-type: size) {
  :host {
    height: 100%;
    position: relative;
  }
}
```

### 3. API du Composant

```html
<!-- Usage basique -->
<overflow-container overflow="auto" overflow-clip="hidden">
  <!-- Contenu scrollable -->
</overflow-container>

<!-- Avec thématisation -->
<overflow-container overflow="auto">
  <style>
    overflow-container::part(scrollbar) {
      width: 12px;
    }
    overflow-container::part(scrollbar-thumb) {
      background: blue;
    }
  </style>
</overflow-container>

<!-- Avec contenu dynamique -->
<overflow-container id="my-overflow">
  <div id="dynamic-content"></div>
</overflow-container>

<script>
  const container = document.getElementById('my-overflow');
  const content = document.getElementById('dynamic-content');
  
  // Ajout dynamique
  for (let i = 0; i < 100; i++) {
    content.innerHTML += `<p>Paragraph ${i}</p>`;
  }
  
  // Scroll to bottom
  container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
</script>
```

### 4. Props API

```typescript
interface OverflowContainerProps {
  /**
   * Comportement overflow vertical
   * @default 'auto'
   */
  overflow?: 'auto' | 'hidden' | 'clip' | 'scroll' | 'visible';
  
  /**
   * Overflow clip margin
   * @default 'hidden'
   */
  'overflow-clip'?: 'hidden' | 'content' | 'padding' | 'border' | 'margin';
  
  /**
   * Container type pour queries
   * @default 'size'
   */
  'container-type'?: 'size' | 'inline-size' | 'normal';
  
  /**
   * Smooth scrolling
   * @default true
   */
  'scroll-smooth'?: boolean;
}
```

### 5. Fallback Strategy

```typescript
// Détection feature
const supportsContainerQueries = CSS.supports('container-type', 'size');

if (!supportsContainerQueries) {
  // Utiliser ResizeObserver
  class FallbackOverflowContainer extends OverflowContainer {
    connectedCallback() {
      super.connectedCallback();
      this.style.height = 'auto';
      this.observeParent();
    }
    
    private observeParent() {
      const observer = new ResizeObserver(([entry]) => {
        this.style.height = `${entry.contentRect.height}px`;
      });
      
      observer.observe(this.parentElement!);
    }
  }
}
```

---

## 🖥️ Démo

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .parent {
      height: 400px;
      border: 2px solid blue;
      overflow: clip;
    }
  </style>
</head>
<body>
  <div class="parent">
    <overflow-container overflow="auto">
      <div style="height: 800px; background: linear-gradient(red, blue);">
        Contenu scrollable de 800px dans parent de 400px
      </div>
    </overflow-container>
  </div>
  
  <script type="module">
    import { OverflowContainer } from './src/OverflowContainer.js';
    customElements.define('overflow-container', OverflowContainer);
  </script>
</body>
</html>
```

---

## 🧪 Plan de Tests

### Tests Unitaires
- [ ] Composant s'attache au DOM
- [ ] Props overflow/overflow-clip appliquées
- [ ] ResizeObserver observe parent
- [ ] Cleanup disconnectCallback

### Tests d'Intégration
- [ ] Scroll fonctionne dans parent overflow:clip
- [ ] Height 100cqh ou fallback px
- [ ] Parts CSS thématisables

### Tests Cross-Browser
- [ ] Chrome 105+ (container queries)
- [ ] Firefox 110+ (container queries)
- [ ] Safari 16+ (container queries)
- [ ] Anciens (fallback ResizeObserver)

---

## 📅 Roadmap

### Phase 1 : Core (3 jours)
- [ ] Web Component basique
- [ ] Props overflow/overflow-clip
- [ ] Container queries
- [ ] Demo HTML

### Phase 2 : Fallback (2 jours)
- [ ] ResizeObserver fallback
- [ ] Détection feature
- [ ] Tests cross-browser

### Phase 3 : Polish (2 jours)
- [ ] CSS parts exposés
- [ ] Integration @medyll/css-base
- [ ] Documentation
- [ ] npm publish

---

## 🚀 Mise en Service

### Commands
```bash
# 1. Setup projet
mkdir css-overflow-component && cd css-overflow-component
npm init -y
npm install -D typescript vite @medyll/css-base

# 2. Config Vite (lib mode)
# vite.config.ts
export default {
  build: {
    lib: {
      entry: 'src/OverflowContainer.ts',
      name: 'OverflowContainer',
      fileName: 'overflow-container',
    },
  },
};

# 3. Build
npm run build

# 4. Publish
npm publish
```

### Usage
```bash
npm install @medyll/css-overflow-component
```

```typescript
import '@medyll/css-overflow-component';
// <overflow-container> disponible
```

---

## 📊 Métriques de Succès

| Métrique | Cible |
|----------|-------|
| Bundle size | <5KB |
| FPS scroll | 60 |
| Support navigateurs | 95% (avec fallback) |
| npm downloads (mois 1) | 100+ |

---

## ⚠️ Risques Identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Container queries support | Moyen | Fallback ResizeObserver |
| Performance scroll | Faible | Utiliser scroll natif |
| Adoption Web Components | Faible | Wrappers React/Vue futurs |

---

## 🔗 Dépendances

### Liens Internes
- [CSS-3D-LANGUAGE](../css-3d-language/idea.md) — Gestion layout similaire
- [WEBCOMPONENT-NAMING](../webcomponent-naming/idea.md) — Shadow DOM communicant

### Références Externes
- [Container Queries MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries)
- [ResizeObserver MDN](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver)

---

## 📝 Notes de Développement

- **Priorité** : Fallback ResizeObserver dès le jour 1
- **Scope** : Vertical scroll only (horizontal post-MVP)
- **Shadow DOM** : Exposer parts pour thématisation

---

**Prochaine action :** Créer Web Component basique avec props overflow/overflow-clip et demo HTML.
