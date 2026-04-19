#!/usr/bin/env node

/**
 * Agent BMAD Orchestration
 * Scan les projets BMAD et lance l'orchestration automatiquement
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Configuration
const PROJECTS_ROOT = 'D:\\boulot\\dev';
const OUTPUT_LOG = path.join(__dirname, 'orchestration.log');

// Logging
function log(message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}`;
  console.log(line);
  fs.appendFileSync(OUTPUT_LOG, line + '\n');
}

// Trouver tous les projets BMAD
function findBmadProjects(root) {
  const projects = [];
  
  function scan(dir) {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
        
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          // Check si ce dossier contient un bmad/status.yaml
          const bmadStatus = path.join(fullPath, 'bmad', 'status.yaml');
          if (fs.existsSync(bmadStatus)) {
            projects.push(fullPath);
            log(`📁 Projet BMAD trouvé: ${fullPath}`);
          } else {
            scan(fullPath);
          }
        }
      }
    } catch (err) {
      // Ignore les erreurs de permission
    }
  }
  
  scan(root);
  return projects;
}

// Lire le status.yaml d'un projet
function readProjectStatus(projectPath) {
  const statusPath = path.join(projectPath, 'bmad', 'status.yaml');
  try {
    const content = fs.readFileSync(statusPath, 'utf8');
    // Parse YAML simple (juste les champs clés)
    const status = {};
    for (const line of content.split('\n')) {
      const [key, value] = line.split(':').map(s => s?.trim());
      if (key && value) {
        status[key] = value.replace(/"/g, '');
      }
    }
    return status;
  } catch (err) {
    log(`❌ Erreur lecture status.yaml: ${projectPath}`);
    return null;
  }
}

// Déterminer si un projet a besoin d'orchestration
function needsOrchestration(status) {
  if (!status) return false;
  
  // Si next_command existe et n'est pas "pause" ou "done"
  const nextCmd = status.next_command;
  if (nextCmd && !['pause', 'done', ''].includes(nextCmd)) {
    return true;
  }
  
  // Si phase est en cours (pas "Done" ou "Release")
  const phase = status.phase;
  if (phase && !phase.includes('Done') && !phase.includes('Release')) {
    return true;
  }
  
  return false;
}

// Lancer bmad continue sur un projet
function runBmadContinue(projectPath) {
  log(`🚀 Lancement: bmad continue sur ${projectPath}`);
  
  try {
    const result = execSync('bmad continue', {
      cwd: projectPath,
      encoding: 'utf8',
      timeout: 300000 // 5 min timeout
    });
    log(`✅ Succès: ${projectPath}`);
    return { success: true, output: result };
  } catch (err) {
    log(`❌ Échec: ${projectPath} — ${err.message}`);
    return { success: false, error: err.message };
  }
}

// Main
async function main() {
  log('═══════════════════════════════════════════');
  log('🤖 Agent BMAD Orchestration — Démarrage');
  log('═══════════════════════════════════════════');
  
  // Trouver tous les projets
  const projects = findBmadProjects(PROJECTS_ROOT);
  log(`📊 ${projects.length} projets BMAD trouvés`);
  
  if (projects.length === 0) {
    log('⚠️ Aucun projet BMAD trouvé');
    return;
  }
  
  // Scanner chaque projet
  const toOrchestrate = [];
  for (const project of projects) {
    const status = readProjectStatus(project);
    const needs = needsOrchestration(status);
    
    log(`📍 ${path.basename(project)} — ${needs ? '⏳ À orchestrer' : '✅ À jour'}`);
    
    if (needs) {
      toOrchestrate.push({ project, status });
    }
  }
  
  // Lancer l'orchestration
  if (toOrchestrate.length === 0) {
    log('✅ Tous les projets sont à jour');
    return;
  }
  
  log(`\n🚀 Orchestration de ${toOrchestrate.length} projet(s)...`);
  
  const results = [];
  for (const { project, status } of toOrchestrate) {
    const result = runBmadContinue(project);
    results.push({ project, status, ...result });
    
    // Pause entre chaque projet
    await new Promise(r => setTimeout(r, 2000));
  }
  
  // Rapport final
  log('\n═══════════════════════════════════════════');
  log('📊 RAPPORT FINAL');
  log('═══════════════════════════════════════════');
  
  const success = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  log(`✅ Succès: ${success.length}`);
  log(`❌ Échecs: ${failed.length}`);
  
  if (failed.length > 0) {
    log('\nDétails échecs:');
    failed.forEach(r => {
      log(`  - ${path.basename(r.project)}: ${r.error}`);
    });
  }
  
  log('\n═══════════════════════════════════════════');
  log('🏁 Agent BMAD Orchestration — Terminé');
  log('═══════════════════════════════════════════');
}

main().catch(err => {
  log(`💥 ERREUR: ${err.message}`);
  process.exit(1);
});
