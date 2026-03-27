// The Psilosopher — Google Apps Script Form Handler
// Deploy as Web App: Execute as "Me", Access "Anyone"

var SPREADSHEET_ID = '1I0ye0iaIeOI7TKSALQvggJoHAc6CJ0RsIVVDzZCnTAQ';
var NOTIFY_EMAIL   = 'hello@thepsilosopher.com';

function doPost(e) {
  try {
    var params = e.parameter;
    var type   = params.type;

    if (type === 'newsletter') {
      logNewsletter(params);
    } else if (type === 'contact') {
      logContact(params);
      sendContactEmail(params);
    }

    return respond({ success: true });
  } catch (err) {
    return respond({ success: false, error: err.message });
  }
}

// Allow preflight / direct GET (returns simple status)
function doGet() {
  return respond({ status: 'ok' });
}

// ── Sheet helpers ────────────────────────────────────────────

function logNewsletter(p) {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName('Newsletter') || ss.insertSheet('Newsletter');

  // Add header row if empty
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Email']);
  }

  sheet.appendRow([new Date(), p.email]);
}

function logContact(p) {
  var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
  var sheet = ss.getSheetByName('Contact') || ss.insertSheet('Contact');

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Newsletter Opt-in']);
  }

  sheet.appendRow([
    new Date(),
    p.name,
    p.email,
    p.subject,
    p.message,
    p.newsletter === 'on' ? 'Yes' : 'No'
  ]);

  // If they opted into newsletter, log them there too
  if (p.newsletter === 'on') {
    logNewsletter(p);
  }
}

// ── Email notification ───────────────────────────────────────

function sendContactEmail(p) {
  var subject = 'New message from ' + p.name + ' — ' + p.subject;
  var body    = [
    'Name:    ' + p.name,
    'Email:   ' + p.email,
    'Subject: ' + p.subject,
    '',
    p.message,
    '',
    '---',
    'Newsletter opt-in: ' + (p.newsletter === 'on' ? 'Yes' : 'No'),
    'Submitted: ' + new Date().toString()
  ].join('\n');

  GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, {
    replyTo: p.email
  });
}

// ── Response helper ──────────────────────────────────────────

function respond(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
