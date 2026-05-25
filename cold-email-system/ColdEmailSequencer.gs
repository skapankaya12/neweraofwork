// ============================================================
// ON FORWARD — Cold Email Sequencer
// Google Apps Script — paste into script.google.com
// Connected to your Prospects Google Sheet
// ============================================================
// SETUP (do once):
//   1. Open script.google.com → New project → paste this file
//   2. Go to Resources → Advanced Google services → enable Gmail API
//   3. Run createDailyTrigger() once to schedule daily sends
//   4. Fill your Prospects sheet (see prospects-template.csv)
// ============================================================

const SEQ_CONFIG = {
  SHEET_NAME: 'Prospects',
  FROM_NAME: 'Sevval Kapankaya',
  REPLY_TO: 'skapankaya@onforward.eu',

  // Days to wait before each follow-up
  STEP2_DELAY_DAYS: 5,
  STEP3_DELAY_DAYS: 7,

  // Max cold emails sent per day — keep at 20 for weeks 1-2, raise to 40 after
  DAILY_SEND_LIMIT: 20,

  // Column positions in the sheet (A=0, B=1, ...)
  COL: {
    FIRST_NAME:  0,   // A
    LAST_NAME:   1,   // B
    COMPANY:     2,   // C
    TITLE:       3,   // D
    EMAIL:       4,   // E
    STATUS:      5,   // F  — values: Active | Replied | Bounced | Unsubscribed | Complete | Error
    STEP:        6,   // G  — values: 0 (not started), 1, 2, 3
    STEP1_DATE:  7,   // H
    STEP2_DATE:  8,   // I
    STEP3_DATE:  9,   // J
    NOTES:       10   // K
  }
};

// ─────────────────────────────────────────────
// MAIN — runs daily via trigger
// ─────────────────────────────────────────────
function runSequences() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SEQ_CONFIG.SHEET_NAME);

  if (!sheet) {
    Logger.log('ERROR: Sheet "Prospects" not found. Check the sheet name.');
    return;
  }

  const data  = sheet.getDataRange().getValues();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let sentCount = 0;

  for (let i = 1; i < data.length; i++) {           // skip header row
    if (sentCount >= SEQ_CONFIG.DAILY_SEND_LIMIT) break;

    const row    = data[i];
    const status = (row[SEQ_CONFIG.COL.STATUS] || '').toString().trim();
    const step   = parseInt(row[SEQ_CONFIG.COL.STEP]) || 0;

    if (status !== 'Active') continue;

    const firstName = row[SEQ_CONFIG.COL.FIRST_NAME] || '';
    const company   = row[SEQ_CONFIG.COL.COMPANY]    || '';
    const email     = (row[SEQ_CONFIG.COL.EMAIL] || '').toString().trim();

    if (!email || !email.includes('@')) continue;

    let shouldSend = false;
    let emailStep  = 0;

    if (step === 0) {
      shouldSend = true;
      emailStep  = 1;

    } else if (step === 1) {
      const step1Date = new Date(row[SEQ_CONFIG.COL.STEP1_DATE]);
      step1Date.setHours(0, 0, 0, 0);
      const daysSince = Math.floor((today - step1Date) / 86400000);
      if (daysSince >= SEQ_CONFIG.STEP2_DELAY_DAYS) {
        shouldSend = true;
        emailStep  = 2;
      }

    } else if (step === 2) {
      const step2Date = new Date(row[SEQ_CONFIG.COL.STEP2_DATE]);
      step2Date.setHours(0, 0, 0, 0);
      const daysSince = Math.floor((today - step2Date) / 86400000);
      if (daysSince >= SEQ_CONFIG.STEP3_DELAY_DAYS) {
        shouldSend = true;
        emailStep  = 3;
      }

    } else if (step >= 3) {
      sheet.getRange(i + 1, SEQ_CONFIG.COL.STATUS + 1).setValue('Complete');
      continue;
    }

    if (!shouldSend) continue;

    const content = getEmailContent(emailStep, firstName, company);

    try {
      GmailApp.sendEmail(
        email,
        content.subject,
        '',   // plain text body (empty — we use htmlBody)
        {
          name:     SEQ_CONFIG.FROM_NAME,
          htmlBody: content.html,
          replyTo:  SEQ_CONFIG.REPLY_TO,
        }
      );

      // Update step number
      sheet.getRange(i + 1, SEQ_CONFIG.COL.STEP + 1).setValue(emailStep);

      // Update the matching date column
      const dateColIndex = (emailStep === 1) ? SEQ_CONFIG.COL.STEP1_DATE
                         : (emailStep === 2) ? SEQ_CONFIG.COL.STEP2_DATE
                         :                     SEQ_CONFIG.COL.STEP3_DATE;
      sheet.getRange(i + 1, dateColIndex + 1).setValue(new Date());

      sentCount++;
      Logger.log('Sent step ' + emailStep + ' → ' + email);

      Utilities.sleep(3000 + Math.floor(Math.random() * 4000)); // 3–7s gap between sends

    } catch (e) {
      Logger.log('ERROR sending to ' + email + ': ' + e.message);
      sheet.getRange(i + 1, SEQ_CONFIG.COL.STATUS + 1).setValue('Error');
      sheet.getRange(i + 1, SEQ_CONFIG.COL.NOTES  + 1).setValue(e.message);
    }
  }

  Logger.log('── Done. Sent ' + sentCount + ' emails today. ──');
}


// ─────────────────────────────────────────────
// EMAIL COPY — 3-step professional services sequence
// Edit subject lines and body here to A/B test
// ─────────────────────────────────────────────
function getEmailContent(step, firstName, company) {
  const name = firstName || 'there';

  if (step === 1) {
    return {
      subject: 'client reporting at ' + company,
      html: [
        'Hi ' + name + ',',
        '',
        'Quick question — how long does it take your team to put together a client report right now?',
        '',
        'We recently built a reporting agent for a professional services firm: it pulls the data, writes the commentary, and assembles a draft for partner review. Took the process from 4–5 hours per report to about 20 minutes. The firm ended up taking on 40% more clients without adding headcount.',
        '',
        'Worth a 20-minute call to see if something similar makes sense for ' + company + '?',
        '',
        'Sevval<br>On Forward<br>skapankaya@onforward.eu'
      ].join('<br>')
    };
  }

  if (step === 2) {
    return {
      subject: 'Re: client reporting at ' + company,
      html: [
        'Hi ' + name + ',',
        '',
        'Following up — easy to miss.',
        '',
        'What we do: embed in a client\'s team, map how their operations actually run, and build custom AI around the real process. Not a platform you have to configure yourself.',
        '',
        'For professional services firms, that usually means automating the most time-consuming repeatable work — reporting, data extraction, document review.',
        '',
        'Happy to share more if useful.',
        '',
        'Sevval<br>On Forward<br>skapankaya@onforward.eu'
      ].join('<br>')
    };
  }

  // step === 3
  return {
    subject: 'Re: client reporting at ' + company,
    html: [
      'Hi ' + name + ',',
      '',
      'Last note from me.',
      '',
      'If automating client reporting or similar back-office work isn\'t a priority right now, completely understood — timing matters.',
      '',
      'If it becomes relevant later, I\'m at skapankaya@onforward.eu.',
      '',
      'Sevval<br>On Forward<br>skapankaya@onforward.eu'
    ].join('<br>')
  };
}


// ─────────────────────────────────────────────
// TRIGGER SETUP — run once, never again
// ─────────────────────────────────────────────
function createDailyTrigger() {
  // Remove old triggers for this function first
  ScriptApp.getProjectTriggers()
    .filter(t => t.getHandlerFunction() === 'runSequences')
    .forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('runSequences')
    .timeBased()
    .everyDays(1)
    .atHour(9)           // fires at 9am in your Apps Script timezone
    .create();

  Logger.log('✓ Daily trigger created — runSequences fires at 9am every day.');
}


// ─────────────────────────────────────────────
// UTILITIES
// ─────────────────────────────────────────────

// Run this to see a summary of your pipeline in the logs
function pipelineSummary() {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SEQ_CONFIG.SHEET_NAME);
  const data  = sheet.getDataRange().getValues();

  const counts = { Active: 0, Replied: 0, Complete: 0, Unsubscribed: 0, Bounced: 0, Error: 0, Other: 0 };

  for (let i = 1; i < data.length; i++) {
    const status = (data[i][SEQ_CONFIG.COL.STATUS] || 'Other').toString().trim();
    counts[status] = (counts[status] || 0) + 1;
  }

  Logger.log('── Pipeline Summary ──');
  Object.entries(counts).forEach(([k, v]) => {
    if (v > 0) Logger.log(k + ': ' + v);
  });
}

// Call this manually when someone replies — pass their email address
// e.g. markReplied('john@firm.com')
function markReplied(emailAddress) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SEQ_CONFIG.SHEET_NAME);
  const data  = sheet.getDataRange().getValues();

  for (let i = 1; i < data.length; i++) {
    if (data[i][SEQ_CONFIG.COL.EMAIL] === emailAddress) {
      sheet.getRange(i + 1, SEQ_CONFIG.COL.STATUS + 1).setValue('Replied');
      Logger.log('Marked as Replied: ' + emailAddress);
      return;
    }
  }
  Logger.log('Not found: ' + emailAddress);
}
