/**
 * On Forward — Career Form Handler
 * Google Apps Script
 *
 * HOW TO DEPLOY:
 * 1. Go to script.google.com → New project
 * 2. Paste this entire file in
 * 3. Click Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Click Deploy → copy the Web App URL
 * 5. Paste that URL into App.jsx where it says SCRIPT_URL (in CareerModal)
 * 6. Create a Google Sheet named "On Forward – Career Applications"
 *    (or update SHEET_NAME below to match whatever you name it)
 */

const SHEET_NAME = "On Forward – Career Applications";

// ── Column headers — order must match what doPost writes ──────────────────────
const HEADERS = [
  "Timestamp",
  "Submitted At",
  "Name",
  "Email",
  "Role",
  "AI Project",
  "Portfolio",
];

// ── Entry point ───────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);

    // Create the sheet + headers if it doesn't exist yet
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);

      // Style the header row
      const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
      headerRange.setFontWeight("bold");
      headerRange.setBackground("#0a0a0d");
      headerRange.setFontColor("#7fffd4");
      sheet.setFrozenRows(1);
    }

    // Build the row
    const row = [
      new Date(),                         // Timestamp (Google Sheets native date)
      data.submittedAt || "",             // ISO string from the browser
      data.name        || "",
      data.email       || "",
      data.role        || "",
      data.project     || "",
      data.portfolio   || "",
    ];

    sheet.appendRow(row);

    // Auto-resize columns so nothing gets cut off
    sheet.autoResizeColumns(1, HEADERS.length);

    // Optional: send yourself an email notification
    // (remove the comment block below to enable)
    /*
    MailApp.sendEmail({
      to: "your@email.com",
      subject: `New career application — ${data.role || "unknown role"}`,
      body: [
        `Name:      ${data.name}`,
        `Email:     ${data.email}`,
        `Role:      ${data.role}`,
        `Portfolio: ${data.portfolio || "—"}`,
        ``,
        `AI Project:`,
        data.project,
        ``,
        `Submitted: ${data.submittedAt}`,
      ].join("\n"),
    });
    */

    return ContentService
      .createTextOutput(JSON.stringify({ status: "ok" }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: "error", message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── Helper: run this once manually to create the sheet + headers ──────────────
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    const headerRange = sheet.getRange(1, 1, 1, HEADERS.length);
    headerRange.setFontWeight("bold");
    headerRange.setBackground("#0a0a0d");
    headerRange.setFontColor("#7fffd4");
    sheet.setFrozenRows(1);
    Logger.log("Sheet created: " + SHEET_NAME);
  } else {
    Logger.log("Sheet already exists: " + SHEET_NAME);
  }
}
