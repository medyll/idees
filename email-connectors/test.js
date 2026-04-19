const fs = require('fs');
const path = require('path');

const { EmailManager } = require('./index');

async function test() {
  console.log('📧 Email Connectors — Test Dynamique\n');

  try {
    // Charger config
    const configPath = path.join(__dirname, 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    console.log('✅ Config chargée');

    // Manager détecte tous les comptes automatiquement
    const manager = new EmailManager(config);
    const summary = manager.summary();

    console.log('\n📊 Comptes détectés :');
    console.log(`   Total: ${summary.total}`);
    console.log(`   Gmail: ${summary.gmail}`);
    console.log(`   Outlook: ${summary.outlook}`);
    console.log(`   Proton: ${summary.proton}`);
    console.log(`   Autres: ${summary.other}`);

    console.log('\n📋 Comptes :');
    summary.accounts.forEach(acc => {
      console.log(`   - ${acc.label}: ${acc.email} (${acc.type})`);
    });

    if (summary.total === 0) {
      console.log('\n⚠️ Aucun compte activé trouvé');
      return;
    }

    // Connexion
    console.log('\n⏳ Connexion à tous les comptes...');
    await manager.connectAll();
    console.log('✅ Tous les comptes connectés');

    // Fetch emails
    console.log('\n📬 Recherche emails non lus...');
    const emails = await manager.fetchAllUnread(10);
    console.log(`   ${emails.length} emails non lus (tous comptes)`);

    if (emails.length > 0) {
      console.log('\n📩 Derniers emails :');
      emails.slice(0, 5).forEach(e => {
        console.log(`   [${e.account}] ${e.from}: ${e.subject?.substring(0, 40) || '(sans sujet)'}`);
      });
    }

    // Déconnexion
    manager.disconnectAll();
    console.log('\n✅ Déconnecté');
    console.log('\n✅ Test terminé avec succès');

  } catch (err) {
    console.log('\n❌ ERREUR:', err.message);
    console.log('\nStack:', err.stack);
  }
}

test();
