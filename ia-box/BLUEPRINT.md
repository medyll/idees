# BLUEPRINT — IA-BOX

**Statut :** 🌳 Mature  
**Date :** 2026-04-19  
**Version :** 1.0

---

## 🎯 Vision

Boîtier physique plug-and-play pour IA locale, inspiré SteamBox : brancher, allumer, l'IA tourne. Zéro configuration, zéro cloud.

---

## 📦 Périmètre MVP

### Fonctionnalités Core
- [ ] Hardware : Mini-PC N100 (6GB RAM, 128GB SSD)
- [ ] OS : NixOS avec image préconfigurée
- [ ] Backend : Ollama + modèles préchargés (Llama 3 8B, Mistral 7B)
- [ ] Interface : Web locale (port 3000) responsive
- [ ] Modes préconfigurés : "Code", "Chat", "Créatif"
- [ ] Stockage local : 50GB pour modèles + données

### Hors Scope (Post-MVP)
- [ ] Écran E-ink intégré
- [ ] Mémoire persistante (SKILL-MEMOIRE)
- [ ] Cluster multi-box
- [ ] Interface mobile dédiée

---

## 🏗️ Architecture Technique

### Hardware (2 options)

**Option 1 : Budget (~€150)**
```
Beelink S12 Pro (Intel N100)
├── CPU: 4c/4t, up to 3.4GHz
├── RAM: 16GB DDR4 (suffisant pour 7B-13B)
├── SSD: 500GB NVMe
├── TDP: 6W (silencieux)
└── Prix: ~€150
```

**Option 2 : Performance (~€400)**
```
Minisforum UM780 XTX (AMD Ryzen 7 7840HS)
├── CPU: 8c/16t, up to 5.1GHz
├── RAM: 32GB DDR5 (jusqu'à 20B)
├── SSD: 1TB NVMe
├── iGPU: Radeon 780M (ROCm compatible)
├── TDP: 35-65W
└── Prix: ~€400
```

### Software Stack
```
NixOS 24.05 LTS
├── Ollama 0.1+ (backend modèles)
├── Open WebUI (interface web)
├── Tailscale (accès remote sécurisé)
├── Docker (optionnel, pour agents)
└── ZFS (snapshots automatiques)
```

### Structure du Projet
```
ia-box/
├── nix/
│   ├── configuration.nix    # NixOS config
│   ├── hardware.nix         # Hardware-specific
│   ├── ollama.nix           # Ollama service
│   └── openwebui.nix        # WebUI service
├── models/
│   └── Modelfile            # Modèles préchargés
├── webui/
│   └── custom-theme/        # Thème personnalisé
├── docs/
│   ├── setup.md
│   └── troubleshooting.md
└── README.md
```

---

## 🔧 Spécifications Détaillées

### 1. NixOS Configuration

```nix
# nix/configuration.nix
{ config, pkgs, ... }: {
  imports = [ ./hardware.nix ./ollama.nix ./openwebui.nix ];
  
  # System
  system.stateVersion = "24.05";
  boot.loader.systemd-boot.enable = true;
  
  # Network
  networking.hostName = "ia-box";
  networking.networkmanager.enable = true;
  services.tailscale.enable = true;
  
  # Users
  users.users.ia = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ];
  };
  
  # Services
  services.openssh.enable = true;
  services.docker.enable = true;
  
  # Auto updates
  system.autoUpgrade.enable = true;
  system.autoUpgrade.allowReboot = false;
}
```

### 2. Ollama Service

```nix
# nix/ollama.nix
{ config, pkgs, ... }: {
  services.ollama = {
    enable = true;
    host = "0.0.0.0";
    port = 11434;
    
    # Modèles préchargés
    models = [
      "llama3:8b"      # Mode code/chat
      "mistral:7b"     # Mode créatif
      "codellama:7b"   # Mode code spécialisé
    ];
  };
  
  # Stockage modèles
  environment.variables.OLLAMA_MODELS = "/var/lib/ollama/models";
}
```

### 3. Open WebUI

```nix
# nix/openwebui.nix
{ config, pkgs, ... }: {
  virtualisation.oci-containers.containers.openwebui = {
    image = "ghcr.io/open-webui/open-webui:latest";
    ports = [ "3000:8080" ];
    environment = {
      OLLAMA_BASE_URL = "http://localhost:11434";
      WEBUI_NAME = "IA Box";
    };
    volumes = [
      "openwebui-data:/app/backend/data"
    ];
  };
  
  virtualisation.docker.volumes.openwebui-data.driver = "local";
}
```

### 4. Modes Utilisateur

```yaml
# modes.yaml
modes:
  code:
    model: codellama:7b
    system: "You are an expert programmer. Provide concise, working code."
    temperature: 0.2
    context_window: 8192
    
  chat:
    model: llama3:8b
    system: "You are a helpful, friendly assistant."
    temperature: 0.7
    context_window: 8192
    
  creative:
    model: mistral:7b
    system: "You are a creative writer. Be imaginative and expressive."
    temperature: 0.9
    context_window: 4096
```

### 5. Interface Web (Wireframe)

```
┌─────────────────────────────────────────┐
│  IA Box                      [Settings] │
├─────────────────────────────────────────┤
│                                         │
│  Mode: [Code ▼]  Model: codellama:7b   │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  Write your code here...        │   │
│  │                                 │   │
│  │  def fibonacci(n):              │   │
│  │      if n <= 1:                 │   │
│  │          return n               │   │
│  │      return fib(n-1) + fib(n-2) │   │
│  │                                 │   │
│  └─────────────────────────────────┘   │
│                                         │
│  [💡 Optimize] [🐛 Debug] [📝 Explain] │
│                                         │
│  ┌─────────────────────────────────┐   │
│  │  ✅ Optimized version:          │   │
│  │  def fibonacci(n, memo={}):     │   │
│  │      if n in memo: return memo[n]│  │
│  │      ...                        │   │
│  └─────────────────────────────────┘   │
│                                         │
├─────────────────────────────────────────┤
│  Status: 🟢 Running • 2.3GB RAM used    │
└─────────────────────────────────────────┘
```

---

## 📊 Performance Estimates

| Modèle | RAM | Vitesse (N100) | Vitesse (7840HS) |
|--------|-----|----------------|------------------|
| Llama 3 8B | 6GB | ~3 tokens/s | ~15 tokens/s |
| Mistral 7B | 5GB | ~4 tokens/s | ~18 tokens/s |
| CodeLlama 7B | 5GB | ~4 tokens/s | ~20 tokens/s |
| Llama 3 70B | 40GB | ❌ Trop gros | ~2 tokens/s (quantized) |

---

## 🧪 Plan de Tests

### Tests Hardware
- [ ] Température <70°C après 1h de charge
- [ ] Bruit <30dB (silencieux)
- [ ] Consommation <15W en charge

### Tests Software
- [ ] Boot <30s (cold start)
- [ ] Premier token <3s
- [ ] Pas de crash après 24h uptime
- [ ] Recovery après power loss (ZFS snapshot)

### Tests Utilisateur (10 personnes)
- [ ] Setup initial <10min
- [ ] Changement de mode intuitif
- [ ] Interface web responsive
- [ ] Accès remote via Tailscale fonctionne

---

## 📅 Roadmap

### Phase 1 : Prototype (2 semaines)
- [ ] Achat hardware (N100 ou 7840HS)
- [ ] Install NixOS + config de base
- [ ] Ollama + Open WebUI
- [ ] Tests performance

### Phase 2 : Polish (1 semaine)
- [ ] Image NixOS reproductible
- [ ] Thème WebUI personnalisé
- [ ] Modes préconfigurés
- [ ] Documentation setup

### Phase 3 : Production (1 semaine)
- [ ] Flash image sur SD/USB
- [ ] Tests longue durée
- [ ] Guide troubleshooting
- [ ] Option : vendre kits pré-assemblés

---

## 🚀 Mise en Service

### Commands
```bash
# 1. Créer configuration NixOS
mkdir ia-box && cd ia-box
nix flake init

# 2. Tester en VM
nixos-rebuild build-vm --flake .#ia-box
./result/bin/run-nixos-vm

# 3. Flash sur hardware
nixos-anywhere --flake .#ia-box root@ia-box.local

# 4. Accès web
# http://ia-box.local:3000
```

---

## 📊 Métriques de Succès

| Métrique | Cible MVP | Cible V1 |
|----------|-----------|----------|
| Boot time | <30s | <15s |
| Tokens/s (7B) | 3+ | 10+ |
| RAM idle | <2GB | <1GB |
| Temp max | <75°C | <65°C |
| Setup time | <15min | <5min |

---

## ⚠️ Risques Identifiés

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Hardware incompatible | Élevé | Tester sur liste compatibilité NixOS |
| Modèles trop lents | Moyen | Quantized (Q4_K_M) par défaut |
| Overheating | Moyen | Undervolting + fan curve optimisée |
| Complexité NixOS | Moyen | Image préconfigurée, pas de config manuelle |

---

## 🔗 Dépendances

### Liens Internes
- [SKILL-MEMOIRE](../skill-memoire/idea.md) — Mémoire persistante future
- [AGENTS-REGISTRY](../agents-registry/idea.md) — Héberger agents locaux

### Références Externes
- [Ollama](https://ollama.ai/)
- [Open WebUI](https://openwebui.com/)
- [NixOS](https://nixos.org/)

---

## 📝 Notes de Développement

- **Priorité** : Expérience zéro-config avant features
- **Hardware** : Commencer avec N100 (budget), option 7840HS plus tard
- **Modèles** : Quantized Q4_K_M (meilleur ratio qualité/perf)

---

**Prochaine action :** Commander Beelink S12 Pro (N100) et créer configuration NixOS de base.
