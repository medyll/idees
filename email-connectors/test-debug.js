const fs = require('fs');
const path = require('path');
const Imap = require('imap');

async function testAccount(label, config) {
  return new Promise((resolve) => {
    const role = config.role || '?';
    const identity = config.identity ? `(${config.identity})` : '';
    console.log(`\n📧 Test: ${label} ${identity} [${role}] (${config.email})`);
    
    const imap = new Imap({
      user: config.email,
      password: config.password,
      host: config.imap.host,
      port: config.imap.port,
      tls: config.imap.tls,
      tlsOptions: { servername: config.imap.host }
    });

    let resolved = false;

    imap.once('ready', () => {
      if (!resolved) {
        resolved = true;
        console.log(`   ✅ ${label} CONNECTÉ`);
        imap.end();
        resolve({ label, success: true });
      }
    });

    imap.once('error', (err) => {
      if (!resolved) {
        resolved = true;
        console.log(`   ❌ ${label} ÉCHEC: ${err.message}`);
        resolve({ label, success: false, error: err.message });
      }
    });

    imap.once('end', () => {
      if (!resolved) {
        resolved = true;
        resolve({ label, success: false, error: 'Connection closed' });
      }
    });

    imap.connect();

    // Timeout 10s
    setTimeout(() => {
      if (!resolved) {
        resolved = true;
        console.log(`   ⏱️ ${label} TIMEOUT`);
        imap.end();
        resolve({ label, success: false, error: 'Timeout' });
      }
    }, 10000);
  });
}

async function main() {
  console.log('📧 Email Connectors — Test compte par compte\n');

  try {
    const configPath = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

    const results = [];

    // Test chaque compte
    for (const [key, accountConfig] of Object.entries(config)) {
      if (!accountConfig || !accountConfig.enabled) {
        console.log(`⊘ ${key}: skip (disabled)`);
        continue;
      }
      if (!accountConfig.email || !accountConfig.password) {
        console.log(`⊘ ${key}: skip (incomplet)`);
        continue;
      }

      const result = await testAccount(key, accountConfig);
      results.push(result);

      // Pause entre chaque test
      await new Promise(r => setTimeout(r, 1000));
    }

    // Résumé
    console.log('\n═══════════════════════════════════════');
    console.log('📊 RÉSUMÉ');
    console.log('═══════════════════════════════════════');
    
    const success = results.filter(r => r.success);
    const failed = results.filter(r => !r.success);

    console.log(`\n✅ Succès: ${success.length}`);
    success.forEach(r => console.log(`   - ${r.label}`));

    console.log(`\n❌ Échecs: ${failed.length}`);
    failed.forEach(r => console.log(`   - ${r.label}: ${r.error}`));

    console.log('\n═══════════════════════════════════════');

  } catch (err) {
    console.log('\n❌ ERREUR:', err.message);
  }
}

main();
