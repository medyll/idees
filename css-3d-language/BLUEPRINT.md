# BLUEPRINT — CSS-3D-LANGUAGE

**Statut :** 🌳 Mature  
**Date :** 2026-04-19  
**Version :** 1.0

---

## 🎯 Vision

Langage CSS 3D déclaratif qui hérite des règles CSS (cascade, sélecteurs, héritage) et ajoute des propriétés 3D natives, compilé vers WebGPU pour le rendu.

---

## 📦 Périmètre MVP

### Fonctionnalités Core
- [ ] Parser CSS étendu avec at-rules 3D (`@scene`, `@light`, `@camera`)
- [ ] Propriétés 3D : `depth`, `transform-style-3d`, `material`
- [ ] Moteur de rendu WebGPU minimal
- [ ] Héritage DOM → hiérarchie de scène 3D
- [ ] Fallback 2D (projection orthographique)

### Hors Scope (Post-MVP)
- [ ] Physique et collisions
- [ ] Animations 3D keyframes
- [ ] Pseudo-sélecteurs 3D (`:facing-camera`)
- [ ] Éclairage avancé (shadows, PBR materials)

---

## 🏗️ Architecture Technique

### Stack Recommandée
```
Core Engine:
├── TypeScript
├── WebGPU (via @webgpu/types)
├── CSS Parser (css-tree ou fork)
└── Vite (dev server)

Runtime:
├── Scene Graph (basé sur DOM tree)
├── Camera Controller
├── Light System (directional, point)
└── Material System (lambertian simple)
```

### Structure du Projet
```
css-3d-language/
├── parser/
│   ├── src/
│   │   ├── css3d-parser.ts      # Étend css-tree
│   │   ├── ast-types.ts         # Noeuds AST 3D
│   │   └── at-rules.ts          # @scene, @light, @camera
│   └── package.json
├── engine/
│   ├── src/
│   │   ├── WebGPURenderer.ts    # Rendu WebGPU
│   │   ├── SceneGraph.ts        # Arbre de scène
│   │   ├── Camera.ts            # Contrôles camera
│   │   ├── Light.ts             # Sources lumineuses
│   │   ├── Material.ts          # Matériaux simples
│   │   └── Fallback2D.ts        # Canvas 2D fallback
│   └── package.json
├── runtime/
│   ├── src/
│   │   ├── index.ts             # <canvas css3d>
│   │   └── custom-element.ts    # Web Component
│   └── package.json
├── examples/
│   └── basic-scene.html
└── package.json (monorepo root)
```

---

## 🔧 Spécifications Détaillées

### 1. Syntaxe CSS Étendue

```css
/* Déclaration de scène 3D */
@scene main-scene {
  camera: perspective(60deg);
  background: #1a1a2e;
}

/* Éléments 3D */
.cube {
  depth: 100px;              /* Épaisseur Z */
  transform-style: preserve-3d;
  transform: rotateX(45deg) rotateY(45deg);
  
  /* Matériau simple */
  material: lambertian;
  material-color: #e94560;
  material-roughness: 0.5;
}

/* Sources lumineuses */
@light main-light {
  type: directional;
  direction: (1, -1, 0.5);
  intensity: 1.0;
  color: #ffffff;
}

@light point-light {
  type: point;
  position: (100px, 200px, 300px);
  intensity: 0.8;
  color: #ffd700;
}

/* Camera */
@camera main-camera {
  type: perspective;
  fov: 60deg;
  position: (0, 0, 500px);
  look-at: (0, 0, 0);
}

/* Sélecteur 3D (futur) */
.object:facing-camera {
  material-emissive: #00ff00;
}
```

### 2. AST Types

```typescript
// parser/src/ast-types.ts

interface SceneRule {
  type: 'at-rule';
  name: 'scene';
  prelude: 'main-scene';
  camera?: CameraConfig;
  background?: string;
}

interface LightRule {
  type: 'at-rule';
  name: 'light';
  prelude: 'main-light';
  lightType: 'directional' | 'point' | 'ambient';
  direction?: Vector3;
  position?: Vector3;
  intensity: number;
  color: string;
}

interface ThreeDProperty {
  property: 'depth' | 'transform-style-3d' | 'material' | 'material-color';
  value: string | number;
}

interface Vector3 {
  x: number;
  y: number;
  z: number;
}
```

### 3. Scene Graph (Basé sur DOM)

```typescript
// engine/src/SceneGraph.ts

class SceneNode {
  id: string;
  parent: SceneNode | null;
  children: SceneNode[];
  
  // Transform
  position: Vector3 = { x: 0, y: 0, z: 0 };
  rotation: Vector3 = { x: 0, y: 0, z: 0 };
  scale: Vector3 = { x: 1, y: 1, z: 1 };
  
  // Material
  material: Material;
  
  // DOM reference
  domElement: HTMLElement;
  
  // Héritage CSS
  computeInheritedTransform(): Matrix4 {
    const parentMatrix = this.parent?.computeInheritedTransform() || Matrix4.identity();
    const localMatrix = this.getLocalMatrix();
    return parentMatrix.multiply(localMatrix);
  }
}

class SceneGraph {
  root: SceneNode;
  camera: Camera;
  lights: Light[];
  
  // Construit la scène depuis le DOM
  static fromDOM(root: HTMLElement): SceneGraph {
    const graph = new SceneGraph();
    graph.traverseAndBuild(root, null);
    return graph;
  }
  
  private traverseAndBuild(element: HTMLElement, parent: SceneNode | null): SceneNode {
    const node = new SceneNode(element, parent);
    node.children = Array.from(element.children).map(child => 
      this.traverseAndBuild(child, node)
    );
    return node;
  }
}
```

### 4. WebGPU Renderer

```typescript
// engine/src/WebGPURenderer.ts

class WebGPURenderer {
  device: GPUDevice;
  context: GPUCanvasContext;
  pipeline: GPURenderPipeline;
  
  async initialize(canvas: HTMLCanvasElement) {
    const adapter = await navigator.gpu.requestAdapter();
    this.device = await adapter.requestDevice();
    this.context = canvas.getContext('webgpu');
    
    const format = navigator.gpu.getPreferredCanvasFormat();
    this.context.configure({ device: this.device, format });
    
    // Pipeline de rendu basique
    this.pipeline = this.device.createRenderPipeline({
      layout: 'auto',
      vertex: { module: /* shader */, entryPoint: 'main' },
      fragment: { module: /* shader */, entryPoint: 'main', targets: [{ format }] },
      primitive: { topology: 'triangle-list' },
      depthStencil: { depthWriteEnabled: true, depthCompare: 'less' },
    });
  }
  
  render(scene: SceneGraph) {
    const commandEncoder = this.device.createCommandEncoder();
    const textureView = this.context.getCurrentTexture().createView();
    
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [{
        view: textureView,
        clearValue: { r: 0.1, g: 0.1, b: 0.15, a: 1 },
        loadOp: 'clear',
        storeOp: 'store',
      }],
      depthStencilAttachment: { /* ... */ },
    });
    
    renderPass.setPipeline(this.pipeline);
    // Dessiner tous les noeuds de la scène
    for (const node of scene.root.traverse()) {
      this.drawNode(renderPass, node);
    }
    
    renderPass.end();
    this.device.queue.submit([commandEncoder.finish()]);
  }
}
```

### 5. Fallback 2D (Projection)

```typescript
// engine/src/Fallback2D.ts

class Fallback2D {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  
  // Projette un point 3D en 2D
  project(point: Vector3, camera: Camera): { x: number; y: number; scale: number } {
    const fov = camera.fov;
    const distance = camera.position.z - point.z;
    const scale = fov / distance;
    
    return {
      x: point.x * scale + this.canvas.width / 2,
      y: point.y * scale + this.canvas.height / 2,
      scale,
    };
  }
  
  render(scene: SceneGraph) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    for (const node of scene.root.traverse()) {
      const projected = this.project(node.position, scene.camera);
      
      // Dessiner rectangle avec échelle
      this.ctx.save();
      this.ctx.translate(projected.x, projected.y);
      this.ctx.scale(projected.scale, projected.scale);
      this.ctx.fillStyle = node.material.color;
      this.ctx.fillRect(-50, -50, 100, 100);
      this.ctx.restore();
    }
  }
}
```

---

## 🖥️ Exemple Complet

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    @scene main {
      camera: perspective(60deg);
      background: #1a1a2e;
    }
    
    @light main-light {
      type: directional;
      direction: (1, -1, 1);
      intensity: 1.0;
    }
    
    .cube {
      depth: 100px;
      width: 100px;
      height: 100px;
      transform-style: preserve-3d;
      transform: rotateX(45deg) rotateY(45deg);
      material: lambertian;
      material-color: #e94560;
    }
  </style>
</head>
<body>
  <canvas css3d scene="main">
    <div class="cube"></div>
  </canvas>
  
  <script type="module">
    import { CSS3DElement } from '@css-3d-language/runtime';
    customElements.define('canvas-css3d', CSS3DElement);
  </script>
</body>
</html>
```

---

## 🧪 Plan de Tests

### Tests Unitaires
- [ ] Parser reconnaît `@scene`, `@light`, `@camera`
- [ ] Propriétés 3D parsées correctement
- [ ] SceneGraph construit depuis DOM
- [ ] Projection 3D→2D correcte

### Tests d'Intégration
- [ ] Rendu WebGPU affiche cube rotatif
- [ ] Fallback 2D fonctionne sans WebGPU
- [ ] Héritage transforms parent→enfant

### Tests Cross-Browser
- [ ] Chrome (WebGPU natif)
- [ ] Firefox (WebGPU ou fallback)
- [ ] Safari (fallback 2D)

---

## 📅 Roadmap

### Phase 1 : Parser (2 semaines)
- [ ] Fork css-tree ou écrire parser custom
- [ ] Support at-rules 3D
- [ ] AST types TypeScript
- [ ] Tests parsing

### Phase 2 : Moteur WebGPU (3 semaines)
- [ ] Setup WebGPU context
- [ ] SceneGraph depuis DOM
- [ ] Camera + controls
- [ ] Light system basique
- [ ] Material lambertian

### Phase 3 : Fallback 2D (1 semaine)
- [ ] Projection orthographique
- [ ] Rendu Canvas 2D
- [ ] Détection automatique fallback

### Phase 4 : Polish (2 semaines)
- [ ] Animations CSS keyframes 3D
- [ ] Pseudo-sélecteur `:facing-camera`
- [ ] Exemples + démos
- [ ] Documentation

---

## 🚀 Mise en Service

### Pré-requis
- Node.js 18+
- Navigateur avec WebGPU (Chrome 113+) ou fallback 2D

### Commands
```bash
# 1. Setup monorepo
mkdir css-3d-language && cd css-3d-language
npm init -y

# 2. Parser
mkdir parser && cd parser
npm install css-tree typescript
npx tsc --init

# 3. Engine
mkdir ../engine && cd ../engine
npm install @webgpu/types typescript
npx tsc --init

# 4. Runtime
mkdir ../runtime && cd ../runtime
npm install typescript
npx tsc --init

# 5. Dev server
cd ..
npm install -D vite
npx vite

# http://localhost:5173/examples/basic-scene.html
```

---

## 📊 Métriques de Succès

| Métrique | Cible MVP | Cible V1 |
|----------|-----------|----------|
| FPS (WebGPU) | 60 | 60 |
| FPS (Fallback 2D) | 30 | 60 |
| Temps parsing CSS | <100ms | <50ms |
| Taille bundle | <50KB | <100KB |
| Support navigateurs | 2 (Chrome, Firefox) | 3 (+ Safari) |

---

## ⚠️ Risques Identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| WebGPU immature | Élevé | Fallback 2D obligatoire |
| Performance parsing | Moyen | Parser incrémental, cache AST |
| Complexité moteur 3D | Élevé | Rester minimal (pas physique, pas PBR) |
| Adoption navigateurs | Moyen | Fallback 2D graceful |

---

## 🔗 Dépendances

### Liens Internes
- [MOTEUR-ANIMATION-CLIP](../moteur-animation-clip/idea.md) — Pourrait compiler vers clip-path 2D
- [CSS-OVERFLOW-COMPONENT](../css-overflow-component/idea.md) — Gestion layout similaire

### Références Externes
- [WebGPU Spec](https://www.w3.org/TR/webgpu/)
- [css-tree](https://github.com/csstree/csstree)
- [Three.js](https://three.js.org/) (inspiration, pas dépendance)

---

## 📝 Notes de Développement

- **Priorité** : Fallback 2D dès le jour 1 (accessibilité)
- **Scope** : Rester minimal — pas de physique, pas de shadows complexes
- **Inspiration** : CSS 2D a réussi par sa simplicité, pas ses features
- **Compilation** : CSS-3D → WebGPU shaders (WGSL)

---

**Prochaine action :** Fork css-tree et ajouter le support des at-rules `@scene`, `@light`, `@camera` avec tests de parsing.
