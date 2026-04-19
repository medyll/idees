# BLUEPRINT — SKILL-COMMITS-ROMANESQUE

**Statut :** 🌳 Mature | **Date :** 2026-04-19 | **Version :** 1.0

---

## 🎯 Vision
Skill qui transforme l'historique git en roman : commits = scènes, auteurs = personnages, branches = arcs narratifs, merges = réconciliations.

---

## 📦 MVP
- [ ] Extraction git log (100 derniers commits)
- [ ] 4 styles : Policier, Épopée, Drame, Chronique
- [ ] Génération par chapitre (1 branche = 1 chapitre)
- [ ] Output Markdown + PDF optionnel
- [ ] Anonymisation auteurs (optionnel)
- [ ] Couverture IA (optionnel)

**Stack :** TypeScript | simple-git | LLM API | pdfkit

---

## 🔧 Core

### Extraction Git
```typescript
import simpleGit from 'simple-git';

const git = simpleGit('/path/to/repo');
const log = await git.log({ maxCount: 100 });

const commits = log.all.map(c => ({
  hash: c.hash,
  author: c.author_name,
  date: c.date,
  message: c.message,
  files: c.diff?.files || []
}));
```

### Génération Roman
```typescript
async function generateNovel(commits: Commit[], style: string): Promise<string> {
  const chapters = groupByBranch(commits);
  
  const novel = await llm.generate(`
    Écris un roman style ${style} basé sur ces commits git.
    
    Personnages : ${uniqueAuthors(commits)}
    Intrigue : ${summarizeCommits(commits)}
    
    Chapitre 1 : ${chapters[0].name}
    ${formatCommitsForPrompt(chapters[0].commits)}
  `);
  
  return novel;
}
```

---

## 📅 Roadmap
1. **Semaine 1** : Extraction git + formatage prompts
2. **Semaine 2** : Génération LLM par chapitre
3. **Semaine 3** : Export Markdown/PDF + styles

---

## 🚀 Setup
```bash
mkdir skill-commits-romanesque && cd skill-commits-romanesque
npm install simple-git openai pdfkit
```

**Prochaine action :** Tester extraction git sur petit repo et générer premier chapitre.
