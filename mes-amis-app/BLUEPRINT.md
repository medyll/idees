# BLUEPRINT — MES-AMIS-APP

**Statut :** 🌱 Germination | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Application de chat social où l'utilisateur est le seul humain — tous les autres "participants" sont des IA avec personnalités distinctes qui simulent des relations sociales.

---

## 📦 MVP
- [ ] Interface chat classique (style WhatsApp)
- [ ] 4-5 amis IA avec personnalités (drôle, sage, cynique, optimiste)
- [ ] Conversations individuelles
- [ ] Conversations de groupe (humain + IAs)
- [ ] Historique des conversations
- [ ] Notifications de messages

**Stack :** React Native (ou Expo) | LLM API | @medyll/css-base

---

## 🔧 Core

### Personas IA
```typescript
interface AIFriend {
  id: string;
  name: string;
  avatar: string;
  personality: {
    humor: number;        // 0-100
    wisdom: number;       // 0-100
    cynicism: number;     // 0-100
    optimism: number;     // 0-100
    openness: number;     // 0-100
  };
  systemPrompt: string;   // Prompt LLM pour ce persona
  conversationStyle: 'formal' | 'casual' | 'emoji-heavy' | 'minimal';
}

const FRIENDS: AIFriend[] = [
  {
    id: 'le-drole',
    name: 'Max',
    personality: { humor: 90, wisdom: 40, cynicism: 20, optimism: 70, openness: 80 },
    systemPrompt: "Tu es Max, toujours blagueur, tu vois le côté drôle de tout...",
    conversationStyle: 'emoji-heavy'
  },
  {
    id: 'le-sage',
    name: 'Sophia',
    personality: { humor: 30, wisdom: 95, cynicism: 10, optimism: 60, openness: 90 },
    systemPrompt: "Tu es Sophia, philosophe, tu réponds avec sagesse et profondeur...",
    conversationStyle: 'formal'
  },
  // ... 3 autres
];
```

### Chat Interface
```typescript
interface Message {
  id: string;
  senderId: string;  // 'user' ou ID d'un ami IA
  content: string;
  timestamp: Date;
  conversationId: string;
}

async function sendMessage(conversationId: string, content: string): Promise<void> {
  // 1. Sauvegarder message utilisateur
  // 2. Générer réponse IA (LLM avec persona)
  // 3. Afficher réponse après délai naturel (1-3s)
  // 4. Sauvegarder dans historique
}
```

### Conversations de Groupe
```typescript
interface GroupConversation {
  id: string;
  name: string;
  participants: string[];  // IDs des amis IA + 'user'
  messages: Message[];
  
  // Les IAs peuvent interagir entre elles
  // L'orchestrateur gère les tours de parole
}
```

---

## 📅 Roadmap
1. **Semaine 1** : Interface chat + 2 premiers personas
2. **Semaine 2** : 3 autres personas + conversations groupe
3. **Semaine 3** : Historique + notifications + polish

---

## 🚀 Setup
```bash
npx create-expo-app mes-amis-app --template blank-typescript
cd mes-amis-app
npm install openai @react-navigation/native
```

**Prochaine action :** Créer les 5 personas IA avec prompts LLM et tester conversations individuelles.
