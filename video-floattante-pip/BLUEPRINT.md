# BLUEPRINT — VIDEO-FLOTTANTE-PIP

**Statut :** 🌱 Germination | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Lecteur vidéo persistant flottant (Picture-in-Picture intelligent) qui suit l'utilisateur à travers toute l'interface sans jamais disparaître lors de la navigation.

---

## 📦 MVP
- [ ] Pavé vidéo flottant positionnable
- [ ] Transparence vidéo au survol (contrôles restent visibles)
- [ ] Persistance à travers navigation
- [ ] Contrôles intégrés (play/pause, volume, timeline)
- [ ] Support YouTube + vidéos HTML5 natives
- [ ] Positionnement automatique au-dessus barre des tâches

**Stack :** Web Components | CSS backdrop-filter | Picture-in-Picture API

---

## 🔧 Core

### Architecture UI
```
┌─────────────────────────┐
│   [VIDÉO]               │  ← Partie haute : vidéo
│   (transparente hover)  │
├─────────────────────────┤
│  ⏮ ⏯ ⏭ 🔊 ────── ⏱  │  ← Contrôles (toujours visibles)
└─────────────────────────┘
```

### Implementation
```typescript
class FloatingVideoPlayer extends HTMLElement {
  private videoContainer: HTMLDivElement;
  private controlsContainer: HTMLDivElement;
  private video: HTMLVideoElement;
  
  connectedCallback() {
    this.innerHTML = `
      <style>
        :host {
          position: fixed;
          bottom: 60px;
          right: 20px;
          z-index: 9999;
        }
        .video-container {
          background: transparent;
          transition: opacity 0.3s;
        }
        .video-container:hover {
          opacity: 0.1;
        }
        .controls-container {
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
        }
      </style>
      <div class="video-container">
        <video src="${this.getAttribute('src')}"></video>
      </div>
      <div class="controls-container">
        <!-- Contrôles -->
      </div>
    `;
  }
}
```

### Features Clés
- **Conteneur unique** mais fond transparent
- **Partie vidéo** : devient transparente au survol
- **Contrôles** : toujours visibles, séparés
- **Positionnement** : automatique (au-dessus barre des tâches)
- **PIP API** : fallback si navigateur supporte

---

## 📅 Roadmap
1. **Semaine 1** : Web Component + transparence hover
2. **Semaine 2** : Contrôles + support YouTube
3. **Semaine 3** : Positionnement auto + tests UX

---

## 🚀 Setup
```bash
mkdir video-floattante-pip && cd video-floattante-pip
npm install typescript vite
```

**Prochaine action :** Créer Web Component avec vidéo transparente au survol et contrôles séparés.
