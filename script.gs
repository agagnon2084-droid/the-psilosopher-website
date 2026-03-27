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
// The Psilosopher — Google Apps Script Form Handler
// Deploy as Web App: Execute as "Me", Access "Anyone"

var SPREADSHEET_ID = '1I0ye0iaIeOI7TKSALQvggJoHAc6CJ0RsIVVDzZCnTAQ';
var NOTIFY_EMAIL   = 'hello@thepsilosopher.com';

// ── WORKBOOK CONFIG ──────────────────────────────────────────
// 1. Upload the PDF to Google Drive
// 2. Right-click it → "Get link" → copy the ID from the URL
//    e.g. https://drive.google.com/file/d/PASTE_THIS_PART/view
// 3. Replace the value below and re-deploy this script
var WORKBOOK_PDF_ID = 'PASTE_YOUR_DRIVE_FILE_ID_HERE';

function doPost(e) {
    try {
          var params = e.parameter;
              var type   = params.type;

                  if (type === 'newsletter') {
                          logNewsletter(params);
                  } else if (type === 'contact') {
                          logContact(params);
                                sendContactEmail(params);
                  } else if (type === 'workbook') {
                          logWorkbook(params);
                                sendWorkbookEmail(params);
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
        if (sheet.getLastRow() === 0) {
              sheet.appendRow(['Timestamp', 'Email']);
        }
          sheet.appendRow([new Date(), p.email]);
}

function logWorkbook(p) {
    var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
      var sheet = ss.getSheetByName('Workbook Signups') || ss.insertSheet('Workbook Signups');
        if (sheet.getLastRow() === 0) {
              sheet.appendRow(['Timestamp', 'Name', 'Email', 'Status']);
        }
          sheet.appendRow([new Date(), p.name, p.email, 'sent']);
            logNewsletter(p); // also add to newsletter list
}

function logContact(p) {
    var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
      var sheet = ss.getSheetByName('Contact') || ss.insertSheet('Contact');
        if (sheet.getLastRow() === 0) {
              sheet.appendRow(['Timestamp', 'Name', 'Email', 'Subject', 'Message', 'Newsletter Opt-in']);
        }
          sheet.appendRow([
                new Date(), p.name, p.email, p.subject, p.message,
                    p.newsletter === 'on' ? 'Yes' : 'No'
          ]);
            if (p.newsletter === 'on') { logNewsletter(p); }
}

// ── Email sending ────────────────────────────────────────────

function sendWorkbookEmail(p) {
    var firstName = (p.name || '').split(' ')[0] || 'there';
      var subject   = 'Your 7-Day Integration Workbook — The Psilosopher';

        var htmlBody =
            '<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #1a1a1a;">' +
                '<h1 style="font-size: 22px; font-weight: normal; margin-bottom: 8px;">The Psilosopher</h1>' +
                    '<hr style="border: none; border-top: 1px solid #1a1a1a; margin-bottom: 30px;">' +
                        '<p style="font-size: 16px; line-height: 1.7;">Hi ' + firstName + ',</p>' +
                            '<p style="font-size: 16px; line-height: 1.7;">Your <strong>7-Day Integration Workbook</strong> is attached to this email.</p>' +
                                '<p style="font-size: 16px; line-height: 1.7;">Start Day 1 as soon as possible after your experience — ideally within 24 hours. Set aside 20–30 minutes each day in a quiet space. Write without editing yourself. These pages are not for performance — they are for clarity.</p>' +
                                    '<p style="font-size: 16px; line-height: 1.7; margin-top: 24px;"><em>"The compound opens the door. You still have to walk through it."</em></p>' +
                                        '<hr style="border: none; border-top: 1px solid #ccc; margin: 30px 0;">' +
                                            '<p style="font-size: 13px; color: #666;"><a href="https://thepsilosopher.com" style="color: #666;">thepsilosopher.com</a></p>' +
                                                '</div>';

                                                  var plainBody = [
                                                        'Hi ' + firstName + ',', '',
                                                            'Your 7-Day Integration Workbook is attached to this email.', '',
                                                                'Start Day 1 as soon as possible after your experience — ideally within 24 hours.',
                                                                    'Set aside 20-30 minutes each day in a quiet space.',
                                                                        'Write without editing yourself. These pages are not for performance — they are for clarity.', '',
                                                                            '"The compound opens the door. You still have to walk through it."', '',
                                                                                '—', 'thepsilosopher.com'
                                                  ].join('\n');

                                                    var pdf = DriveApp.getFileById(WORKBOOK_PDF_ID);

                                                      GmailApp.sendEmail(p.email, subject, plainBody, {
                                                            htmlBody:    htmlBody,
                                                                attachments: [pdf.getAs(MimeType.PDF)],
                                                                    name:        'The Psilosopher',
                                                                        replyTo:     NOTIFY_EMAIL
                                                      });
}

function sendContactEmail(p) {
    var subject = 'New message from ' + p.name + ' — ' + p.subject;
      var body = [
            'Name: '    + p.name,
                'Email: '   + p.email,
                    'Subject: ' + p.subject,
                        '', p.message, '',
                            '---',
                                'Newsletter opt-in: ' + (p.newsletter === 'on' ? 'Yes' : 'No'),
                                    'Submitted: ' + new Date().toString()
      ].join('\n');
        GmailApp.sendEmail(NOTIFY_EMAIL, subject, body, { replyTo: p.email });
}

// ── Response helper ──────────────────────────────────────────

function respond(data) {
    return ContentService
        .createTextOutput(JSON.stringify(data))
            .setMimeType(ContentService.MimeType.JSON);
}
}
      ]
}
                                                      })
                                                  ]
}
          ])
        }
}
        }
}
        }
}
}
    }
                  }
                  }
                  }
    }
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
