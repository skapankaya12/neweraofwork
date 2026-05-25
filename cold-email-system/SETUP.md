# On Forward Cold Email System — Setup Guide

Two scripts, one Google Sheet. Total setup time: ~45 minutes. Cost: $0.

---

## What you're setting up

| Script | What it does |
|---|---|
| `WarmupScript.gs` | Sends emails daily from your inbox to 3 dummy accounts so Google sees real activity → stops your cold emails landing in spam |
| `ColdEmailSequencer.gs` | Reads your Prospects sheet, sends the 3-step outreach sequence automatically, tracks status |

---

## Step 1 — Create 3 warm-up Gmail accounts (10 min)

Create these three free Gmail accounts (or similar names — doesn't matter):
- `onforward.warmup1@gmail.com`
- `onforward.warmup2@gmail.com`
- `onforward.warmup3@gmail.com`

On **each account**, do this:
1. Open Gmail → Settings (gear icon) → See all settings
2. Go to **General** tab → scroll to **Vacation responder**
3. Toggle **ON**
4. Subject: `Re:`
5. Message: `Thanks, got this.`
6. Check **"Send a response to everyone"**
7. Save

These accounts will auto-reply whenever the warm-up script emails them — creating real two-way traffic from your domain.

---

## Step 2 — Set up the Warm-Up Script (10 min)

1. Go to [script.google.com](https://script.google.com) (sign in with `skapankaya@onforward.eu`)
2. Click **New project** → name it `OnForward Warmup`
3. Delete the default `myFunction()` code
4. Copy the entire contents of `WarmupScript.gs` and paste it in
5. In the `WARMUP_ADDRESSES` array, replace the placeholder emails with your 3 real warm-up Gmail addresses
6. Click **Save** (disk icon or Cmd+S)
7. In the function dropdown (top bar), select `createWarmupTrigger` → click **Run**
8. Google will ask for permissions — click **Allow**

That's it. Warm-up runs at 10am every day automatically.

**Warm-up ramp — update `DAILY_COUNT` manually each week:**
- Week 1: `5`
- Week 2: `8`
- Week 3: `12`
- Week 4+: `15`

---

## Step 3 — Set up your Prospects Google Sheet (5 min)

1. Go to [sheets.google.com](https://sheets.google.com) → create a new sheet
2. Name the sheet (the file): `On Forward Prospects`
3. Name the first tab (bottom): `Prospects`
4. Set up these exact column headers in Row 1:

```
A: First Name
B: Last Name
C: Company
D: Title
E: Email
F: Status
G: Step
H: Step1 Date
I: Step2 Date
J: Step3 Date
K: Notes
```

5. Import the sample rows from `prospects-template.csv` or paste them manually to test

**Status values you'll use:**
- `Active` — include in sequences (this is how you "launch" a prospect)
- `Replied` — they responded; stop the sequence
- `Unsubscribed` — asked to be removed
- `Bounced` — email bounced
- `Complete` — all 3 steps sent, no reply
- `Error` — something went wrong (check Notes column)

---

## Step 4 — Set up the Cold Email Sequencer (10 min)

1. Go to [script.google.com](https://script.google.com) → **New project** → name it `OnForward Sequencer`
2. Paste the entire contents of `ColdEmailSequencer.gs`
3. Click **Save**
4. You need to link it to your Prospects sheet:
   - In the script, click **Project Settings** (gear icon on left)
   - Under **Script Properties** → Add property:
     - Key: `SPREADSHEET_ID`
     - Value: the ID from your sheet's URL (the long string between `/d/` and `/edit`)
   - Actually — simpler: just open the script **from inside the Google Sheet**:
     - In your Prospects sheet → Extensions → Apps Script
     - Delete default code → paste `ColdEmailSequencer.gs`
     - Save → this automatically links it to the sheet

5. In the function dropdown, select `createDailyTrigger` → click **Run**
6. Allow permissions when prompted

---

## Step 5 — Test it (5 min)

1. Add a row to your Prospects sheet with your own email address, Status = `Active`, Step = `0`
2. In the sequencer script, select `runSequences` from the dropdown → click **Run**
3. Check your inbox — you should receive Email 1
4. Check the sheet — Step should now say `1`, Step1 Date should be filled

If it worked: you're done. Delete the test row and you're live.

---

## Day-to-day operation

**Adding new prospects:** Paste into the sheet with Status = `Active`, Step = `0`. The script picks them up at 9am.

**When someone replies:** Go to the sheet → find their row → change Status to `Replied`. Or run `markReplied('their@email.com')` from the script editor.

**Checking pipeline:** Run `pipelineSummary()` in the script editor to see counts by status.

**Increasing daily volume:** Change `DAILY_SEND_LIMIT` in `ColdEmailSequencer.gs` — but only after 3 weeks of warm-up. Start at 20, move to 40 after a week, then 60.

---

## Timing summary

| Week | Warm-up count/day | Cold sends/day | Action |
|---|---|---|---|
| 1–2 | 5 | 0 (domain warming) | Set up scripts, build prospect list |
| 3 | 10 | 0 | Finalize prospect list, load into sheet |
| 4 | 12 | 20 | Start sending — set Status = Active on first batch |
| 5+ | 15 | 30–40 | Ramp up as replies come in |

---

## Questions or errors

Send the error message to Claude and I'll fix the script.
