// ============================================================
// ON FORWARD — Domain Warm-Up Script
// Google Apps Script — paste into script.google.com
// Runs daily from skapankaya@onforward.eu
// ============================================================
// BEFORE RUNNING:
//   1. Create 3 free Gmail accounts (see SETUP.md for names)
//   2. On each account: Settings → Vacation responder → ON
//      Subject: "Re: [any]"
//      Message: "Thanks, got this!"
//      "Send to everyone" → ON
//   3. Paste those 3 addresses in WARMUP_ADDRESSES below
//   4. Run createWarmupTrigger() once to schedule daily sends
// ============================================================

const WARMUP_CONFIG = {
  // ← REPLACE these with the 3 Gmail accounts you create
  WARMUP_ADDRESSES: [
    'onforward.warmup1@gmail.com',
    'onforward.warmup2@gmail.com',
    'onforward.warmup3@gmail.com',
  ],

  // How many warm-up emails to send per day
  // Week 1–2: 5 | Week 3–4: 10 | Week 5+: 15
  // Change this manually each week — don't jump too fast
  DAILY_COUNT: 5,
};

// Varied subject lines and bodies so emails look organic
const WARMUP_SUBJECTS = [
  'Quick follow-up',
  'Checking in',
  'One more thing',
  'Thoughts on this?',
  'For your review',
  'Re: our conversation',
  'Circling back',
  'Update from our end',
  'Re: next steps',
  'Brief question',
];

const WARMUP_BODIES = [
  'Hi, just wanted to follow up on our last conversation. Let me know when you have a moment to connect.',
  'Quick check-in — wanted to make sure this didn\'t get buried in your inbox.',
  'Following up here. Happy to jump on a call if that\'s easier.',
  'Wanted to share a quick update. Let me know if you have any questions.',
  'Just circling back on this. No rush, but wanted to make sure you saw it.',
  'Hi — quick one. Can you confirm you received this? Would appreciate a quick reply.',
  'Checking in — we\'re finalising a few things on our end and wanted to sync briefly.',
];

// ─────────────────────────────────────────────
// MAIN — runs daily
// ─────────────────────────────────────────────
function warmupSend() {
  const addresses = WARMUP_CONFIG.WARMUP_ADDRESSES.filter(a => a && a.includes('@'));

  if (addresses.length === 0) {
    Logger.log('ERROR: No warm-up addresses configured. Add Gmail accounts to WARMUP_ADDRESSES.');
    return;
  }

  let sent = 0;

  for (let i = 0; i < WARMUP_CONFIG.DAILY_COUNT; i++) {
    const address = addresses[i % addresses.length];
    const subject = WARMUP_SUBJECTS[Math.floor(Math.random() * WARMUP_SUBJECTS.length)];
    const body    = WARMUP_BODIES[Math.floor(Math.random() * WARMUP_BODIES.length)];

    try {
      GmailApp.sendEmail(address, subject, body, {
        name:    'Sevval Kapankaya',
        replyTo: 'skapankaya@onforward.eu',
      });
      sent++;

      // Random 15–45 second gap between sends — looks more human
      const delay = 15000 + Math.floor(Math.random() * 30000);
      Utilities.sleep(delay);

    } catch (e) {
      Logger.log('ERROR: ' + e.message);
    }
  }

  Logger.log('Warm-up: sent ' + sent + ' emails.');
}

// ─────────────────────────────────────────────
// TRIGGER SETUP — run once, never again
// ─────────────────────────────────────────────
function createWarmupTrigger() {
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'warmupSend')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('warmupSend')
    .timeBased()
    .everyDays(1)
    .atHour(10)   // 10am — different hour from the sequencer (9am) intentionally
    .create();

  Logger.log('✓ Warm-up trigger set for 10am daily.');
}


// ─────────────────────────────────────────────
// WARM-UP RAMP SCHEDULE (manual — update DAILY_COUNT each week)
// ─────────────────────────────────────────────
// Week 1: DAILY_COUNT = 5
// Week 2: DAILY_COUNT = 8
// Week 3: DAILY_COUNT = 12
// Week 4: DAILY_COUNT = 15  ← by this point you're warmed up
//
// After week 3, you can start sending cold emails (at low volume first)
// Keep warm-up running in parallel indefinitely — it keeps your domain healthy
