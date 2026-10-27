# NxOs POS — Offline Billing System

A responsive HTML/CSS/JavaScript point-of-sale demo. Product and bill records are stored in IndexedDB in the current browser. No backend, login, or network connection is required for day-to-day local billing after the app shell has been cached.

## Features
- Billing cart with quantity controls and customer name, mobile, table number.
- Cash, UPI, and Card payment labels.
- Optional GST switch (5%, 12%, 18%, 28%); product prices are entered before GST.
- Final payable rounded to the nearest whole rupee (`Math.round`, so ₹435.50 becomes ₹436).
- Product add/edit/enable/disable.
- Persistent bill history with date/time, text, and payment filters.
- Printable receipts; use the browser print dialog with a regular or compatible thermal printer.
- Offline Excel-compatible workbook export with `Bills` and `Bill Items` sheets, plus CSV.
- JSON backup and restore.
- Service worker cache for offline app-shell loading when served on localhost/HTTPS.

## Run it
### Recommended (desktop or Android)
Use a local static server. For example, install Node.js and run from this folder:

```bash
npx serve .
```

Open the URL printed by the command, then open the app once while online/connected to the local server so the service worker can cache its files. The app can subsequently reopen offline from the same browser/PWA installation, depending on browser support.

If using VS Code, the Live Server extension also works. On Android, a local server app or Termux can serve the folder; opening the app through `http://localhost:PORT` is preferable to opening `index.html` as a `file://` URL.

### Installable app
On supported browsers, open the served URL and use the browser menu's **Add to Home screen / Install app**. Service workers require HTTPS or localhost.

## Important data notes
- Data is local to the browser profile on that device. It does not sync to another phone/computer.
- Clearing browser site data can delete the database. Download a backup regularly.
- The initial product list is demo data; edit it under **Products**.
- The system is not protected by user accounts. Anyone with access to the same browser profile can view its bills.
- The `.xls` export is Excel 2003 XML Spreadsheet format with multiple worksheets, generated locally without a third-party library. Excel-compatible apps can open it; if needed, use **Save As** to convert it to `.xlsx`.
- The receipt is a general cash memo template, not a guarantee of GST invoice compliance. Confirm tax treatment, invoice fields, and applicable GST requirements with your accountant before business use.
- The app does not integrate with a payment gateway or verify UPI/card payments. Choose the payment method after you have collected/confirmed payment.
- Browser print dialog support varies by printer and mobile browser. Thermal printer paper sizing may need adjustment in print settings.

## Suggested production upgrades
Add cashier PIN/login, bill void/refund with audit trail, cash drawer shift reports, database replication, role-based permissions, and validated tax invoice settings before using in a multi-user business environment.
