# BLUEPRINT — VOICE-INTERFACE-HISTORIQUE

**Statut :** 🌱 Germination | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Interface de capture vocale pour maturation avec affichage inbox persistant — historique complet des entrées vocales, consultable en temps réel, non effacé.

---

## 📦 MVP
- [ ] Bouton capture vocale (STT)
- [ ] Panneau inbox latéral (historique complet)
- [ ] Transcription en temps réel
- [ ] Lien avec idées maturation (taguer, lier)
- [ ] Recherche full-text historique
- [ ] Sync avec app mobile OpenClaw

**Stack :** Web Speech API | Svelte 5 | IndexedDB | @medyll/css-base

---

## 🔧 Core

### Architecture
```typescript
interface VoiceEntry {
  id: string;
  timestamp: Date;
  transcription: string;
  audioBlob?: Blob;  // Optionnel
  linkedIdeas?: string[];  // Codes des idées liées
  tags?: string[];
}

class VoiceInbox {
  async startRecording(): Promise<void>;
  async stopRecording(): Promise<VoiceEntry>;
  getHistory(): Promise<VoiceEntry[]>;
  search(query: string): Promise<VoiceEntry[]>;
  linkToIdea(entryId: string, ideaCode: string): Promise<void>;
}
```

### UI Layout
```
┌─────────────────────────────────────┐
│  Voice Inbox                   [🎤] │  ← Bouton capture
├─────────────────────────────────────┤
│  [Recherche ___________]           │
├─────────────────────────────────────┤
│  2026-04-05 14:30                   │
│  "Idée pour app mobile grid..."     │
│  Tags: mobile, UX                   │
├─────────────────────────────────────┤
│  2026-04-05 12:15                   │
│  "Réflexion sur skill-memoire..."   │
│  Tags: skill, mémoire               │
└─────────────────────────────────────┘
```

### Web Speech API
```typescript
const recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = (event) => {
  const transcript = Array.from(event.results)
    .map(result => result[0].transcript)
    .join('');
  
  // Affichage en temps réel dans inbox
  updateInbox(transcript);
};
```

---

## 📅 Roadmap
1. **Semaine 1** : Capture vocale + transcription temps réel
2. **Semaine 2** : Inbox UI + stockage IndexedDB
3. **Semaine 3** : Lien avec maturation + recherche

---

## 🚀 Setup
```bash
mkdir voice-interface-historique && cd voice-interface-historique
npm install svelte @medyll/css-base idae-idbql
```

**Prochaine action :** Implémenter reconnaissance vocale avec Web Speech API et affichage temps réel.
