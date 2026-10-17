# Skill Edge Institute – Website

Website for Skill Edge Institute's ITGC / IT Systems Audit training program.

- **Frontend** (`client/`): React + Vite. This is the website visitors see.
- **Backend** (`server/`): Node.js + Express. It receives the enquiry form, saves each enquiry, and lets you download them as a spreadsheet (CSV).

```
skill-edge-website/
├── package.json          ← one-command scripts for the whole project
├── client/               ← the website (React)
│   ├── public/           ← favicon, social-share image, (your logo goes here)
│   └── src/
│       ├── config/siteConfig.js   ← phone, WhatsApp, email, address, social links
│       ├── data/                  ← ALL editable content (fees, batches, stories, FAQ…)
│       ├── sections/              ← one file per website section
│       ├── components/            ← header, footer, logo, buttons…
│       └── styles/global.css      ← colours and styling
└── server/               ← the backend API
    ├── index.js
    ├── .env.example      ← copy to .env and set your admin key
    └── data/enquiries.json  ← created automatically when the first enquiry arrives
```

---

## 1. Run it on your computer (Windows)

**One-time setup**

1. Install **Node.js 18 or newer** (LTS) from https://nodejs.org – keep the default options.
2. Open the `skill-edge-website` folder in File Explorer, click the address bar, type `cmd` and press Enter. A Command Prompt opens in that folder.
3. Install everything:
   ```
   npm run install:all
   ```
4. Create the backend settings file:
   ```
   copy server\.env.example server\.env
   ```
   Open `server\.env` in Notepad and change `ADMIN_KEY` to a long secret word of your own.

**Start the website (development mode)**

```
npm run dev
```

- Website: **http://localhost:5173**
- Backend API: http://localhost:5000

Changes you save in any file appear in the browser immediately. Press `Ctrl + C` in the Command Prompt to stop.

**Run it like the live site (production mode)**

```
npm run build
npm start
```

Now the backend serves the finished website as well – open **http://localhost:5000**.

---

## 2. Viewing enquiries

Every form submission is saved in `server/data/enquiries.json`. To view or download them (replace `YOUR_KEY` with the `ADMIN_KEY` from `server/.env`):

- Spreadsheet (opens in Excel): `http://localhost:5000/api/enquiries.csv?key=YOUR_KEY`
- Raw list: `http://localhost:5000/api/enquiries?key=YOUR_KEY`

On the live site, replace `http://localhost:5000` with your domain.

If the backend is ever unreachable, the form does **not** pretend it succeeded – it shows an error and offers a one-click "Send these details on WhatsApp" button instead. The "Send via WhatsApp" button also works at any time without the backend.

Spam protection: hidden honeypot field, a minimum fill-in time, and a limit of 5 enquiries per device every 15 minutes.

**Optional:** to get each enquiry in Google Sheets / Zapier / a CRM as well, put the webhook URL in `ENQUIRY_WEBHOOK_URL` in `server/.env`.

---

## 3. Editing the content

All content lives in plain JavaScript files. Edit the text between the quotes, save, and the site updates. Anything set to `null` is a placeholder and is hidden or shown as "Contact us" until you fill it in.

| What you want to change | File |
|---|---|
| Phone number, WhatsApp number, WhatsApp message, email, address, social links, logo | `client/src/config/siteConfig.js` |
| Fee plans (price, classes, resources, payment options, "Recommended" badge) | `client/src/data/plans.js` |
| Upcoming batches and demo classes | `client/src/data/batches.js` |
| Success stories and the placements table | `client/src/data/stories.js` |
| Course facts and the 30-class curriculum | `client/src/data/course.js` |
| Career roles and salary table | `client/src/data/careers.js` |
| FAQ questions and answers | `client/src/data/faqs.js` |
| Colours | top of `client/src/styles/global.css` (`:root`) |

### Contact details
In `siteConfig.js`:
- `phoneDisplay` – how the number looks on screen.
- `phoneLink` – used for click-to-call (`+91…`, no spaces).
- `whatsappNumber` – digits only with country code (`918885801601`). Every WhatsApp button uses this one value.
- `email`, `address`, `social.linkedin` etc. – currently `null` (hidden). Add the official details when ready, e.g. `email: 'info@skilledge.in'`.

### Logo
Put your logo file in `client/public/` (e.g. `logo.png`) and set `logoUrl: '/logo.png'` in `siteConfig.js`. Until then a text logo is shown.

### Fees
In `plans.js`, fill in each plan, for example:
```js
fee: '₹25,000',
classes: '30 live classes',
resources: 'Recordings, notes and templates',
interviewPrep: 'Mock interviews',
mentoring: 'WhatsApp doubt-clearing group',
extras: ['Resume review'],
paymentOptions: 'Full payment or 2 instalments',
recommended: true,   // only once you decide which plan to highlight
```

### Batches and demo classes
In `batches.js` each item has an `endsAt` date-time. After that moment the item disappears from the website automatically, so expired dates are never shown. The 17 & 18 October 2026 demo classes are already set to vanish after 12:00 PM IST on each day. Items with `endsAt: null` always show. `status` can be `'open'`, `'filling'`, `'closed'` or `'announced'`.

The orange bar at the very top of the page appears automatically only while a free demo class is upcoming.

### Success stories
`stories.js` contains the placement list you supplied ("Latest ITGC Placements from SkillEdge") and five highlight cards built from it (300%+, 200%+, 150%+, company transition, career transition).

**Before going live:**
1. Confirm each student is happy for their first name, salary and employer to be shown. To show initials only, set `showNames: false`.
2. Add a real `testimonial` in the student's own words if you have one (leave `null` otherwise).
3. Replace `newRole: 'ITGC role'` with the exact job title if known.
4. Mark `verified: true` only for outcomes checked independently – the badge changes from "Institute-reported" to "Independently verified".
5. Set `showPlacementTable: false` to hide the full table.

### Salary table
`careers.js` has `publishSalaryFigures: false`. While false, the career-progression table shows roles and experience only, with the message "Compensation varies by experience, organization, role, and location…". The ranges from your poster are already in the file. If you want to show them, first check them against current, reliable sources, write the source in `salarySource`, then set `publishSalaryFigures: true`.

### Curriculum
`course.js` contains a proposed 30-class plan built from your topic list (8 modules). When the institute confirms it, set `curriculumConfirmed: true` to remove the "Proposed curriculum" note.

---

## 4. Putting the website online

The simplest option is a single Node.js host that runs both the website and the backend:

**Render.com (free tier available)** – or Railway, or any VPS:
1. Upload this folder to a GitHub repository (the `.gitignore` already excludes `node_modules`, `.env` and saved enquiries).
2. Create a new **Web Service** from that repository.
3. Build command: `npm run install:all && npm run build`
4. Start command: `npm start`
5. Add environment variables: `ADMIN_KEY` (your secret) and `ALLOWED_ORIGINS` (your website address, e.g. `https://www.yourdomain.com`).
6. Connect your domain in the host's settings.

> Note: on hosts with temporary disks (like Render's free tier), `server/data/enquiries.json` can be wiped when the service restarts. For anything beyond testing, either use a host with a persistent disk, or set `ENQUIRY_WEBHOOK_URL` so every enquiry is also copied to Google Sheets / your CRM. Moving to MongoDB later only requires changing `server/src/storage.js`.

**Alternative – frontend and backend hosted separately** (e.g. website on Netlify/Vercel, backend on Render):
- Netlify/Vercel: base directory `client`, build command `npm run build`, publish directory `dist`.
- Create `client/.env` with `VITE_API_BASE_URL=https://your-backend-address` before building.
- Set `ALLOWED_ORIGINS` on the backend to the website address.

---

## 5. Credibility notes (kept deliberately)

- No prices, faculty credentials, accreditations, partnerships or extra contact details are invented – they are placeholders until you supply them.
- Placement results are labelled "institute-reported", with a note that no job or salary outcome is guaranteed.
- Market salary figures are hidden until verified.
- Claims from the posters such as "low AI risk", "15–20% industry growth" and "10,000+ job postings daily" were not used, because they need a source before being published.
