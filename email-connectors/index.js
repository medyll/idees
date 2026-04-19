/**
 * Email Connectors — Dynamique
 * Détecte automatiquement tous les comptes email configurés
 */

const Imap = require('imap');
const { simpleParser } = require('mailparser');

class EmailConnector {
  constructor(config, label) {
    this.config = config;
    this.label = label;
    this.role = config.role || 'unknown';
    this.identity = config.identity || '';
    this.imap = null;
    this.connected = false;
    this.type = this.detectType(config.email);
  }

  detectType(email) {
    if (!email) return 'unknown';
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain?.includes('gmail.com')) return 'gmail';
    if (domain?.includes('live.fr') || domain?.includes('live.com') || 
        domain?.includes('outlook.com') || domain?.includes('hotmail.com')) return 'outlook';
    if (domain?.includes('proton')) return 'proton';
    return 'other';
  }

  async connect() {
    return new Promise((resolve, reject) => {
      this.imap = new Imap({
        user: this.config.email,
        password: this.config.password,
        host: this.config.imap.host,
        port: this.config.imap.port,
        tls: this.config.imap.tls,
        tlsOptions: { servername: this.config.imap.host }
      });

      this.imap.once('ready', () => {
        this.connected = true;
        resolve();
      });

      this.imap.once('error', reject);
      this.imap.connect();
    });
  }

  async fetchUnread(limit = 10) {
    return new Promise((resolve, reject) => {
      this.imap.openBox('INBOX', false, (err, box) => {
        if (err) return reject(err);

        const searchCriteria = ['UNSEEN'];
        const fetchOptions = {
          bodies: '',
          struct: true,
          limit: limit
        };

        const f = this.imap.search(searchCriteria, fetchOptions);
        const emails = [];

        f.on('message', (msg) => {
          msg.on('body', (stream) => {
            simpleParser(stream, (err, parsed) => {
              if (!err) {
                emails.push({
                  account: this.label,
                  from: parsed.from?.text,
                  to: parsed.to?.text,
                  subject: parsed.subject,
                  date: parsed.date,
                  text: parsed.text,
                  html: parsed.html,
                  attachments: parsed.attachments
                });
              }
            });
          });
        });

        f.once('end', () => resolve(emails));
        f.once('error', reject);
      });
    });
  }

  disconnect() {
    if (this.imap) {
      this.imap.end();
      this.connected = false;
    }
  }
}

// Détecte et connecte TOUS les comptes email du config
class EmailManager {
  constructor(config) {
    this.connectors = [];
    
    // Parcourt TOUTES les clés du config
    Object.entries(config).forEach(([key, accountConfig]) => {
      // Skip les clés qui ne sont pas des comptes email
      if (!accountConfig || !accountConfig.enabled) return;
      if (!accountConfig.email || !accountConfig.password) return;
      if (!accountConfig.imap) return;

      // Crée le connecteur
      const connector = new EmailConnector(accountConfig, key);
      this.connectors.push(connector);
    });

    // Trie par type
    this.byType = {
      gmail: this.connectors.filter(c => c.type === 'gmail'),
      outlook: this.connectors.filter(c => c.type === 'outlook'),
      proton: this.connectors.filter(c => c.type === 'proton'),
      other: this.connectors.filter(c => c.type === 'other')
    };
  }

  async connectAll() {
    await Promise.all(this.connectors.map(c => c.connect()));
  }

  async fetchAllUnread(limit = 10) {
    const results = await Promise.all(
      this.connectors.map(c => c.fetchUnread(limit))
    );
    return results.flat();
  }

  getByType(type) {
    return this.byType[type] || [];
  }

  disconnectAll() {
    this.connectors.forEach(c => c.disconnect());
  }

  summary() {
    return {
      total: this.connectors.length,
      gmail: this.byType.gmail.length,
      outlook: this.byType.outlook.length,
      proton: this.byType.proton.length,
      other: this.byType.other.length,
      accounts: this.connectors.map(c => ({
        label: c.label,
        email: c.config.email,
        type: c.type,
        role: c.role,
        identity: c.identity
      }))
    };
  }
}

module.exports = {
  EmailConnector,
  EmailManager
};
