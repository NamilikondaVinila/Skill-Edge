// Skill Edge Institute — backend API
//   POST /api/enquiries        save an enquiry from the website form
//   GET  /api/enquiries        list enquiries (needs ADMIN_KEY)
//   GET  /api/enquiries.csv    download enquiries as CSV (needs ADMIN_KEY)
//   GET  /api/health           health check
// In production it also serves the built React site from client/dist.

import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { validateEnquiry, looksLikeSpam } from './src/validate.js';
import { saveEnquiry, listEnquiries } from './src/storage.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.PORT) || 5000;
const ADMIN_KEY = process.env.ADMIN_KEY || '';
const WEBHOOK = process.env.ENQUIRY_WEBHOOK_URL || '';
const ALLOWED = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((s) => s.trim())
  .filter(Boolean);

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(express.json({ limit: '20kb' }));
app.use(
  '/api',
  cors({
    origin: (origin, cb) => cb(null, !origin || ALLOWED.includes(origin)),
  })
);

// Basic security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  next();
});

// --- Simple in-memory rate limit: max 5 enquiries per IP per 15 minutes ---
const hits = new Map();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_HITS = 5;
function rateLimited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  list.push(now);
  hits.set(ip, list);
  return list.length > MAX_HITS;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, list] of hits) if (!list.some((t) => now - t < WINDOW_MS)) hits.delete(ip);
}, WINDOW_MS).unref();

function requireAdmin(req, res, next) {
  const key = req.get('x-admin-key') || req.query.key;
  if (!ADMIN_KEY || ADMIN_KEY.startsWith('change-me')) {
    return res.status(503).json({ ok: false, message: 'Set a real ADMIN_KEY in server/.env to enable this endpoint.' });
  }
  if (key !== ADMIN_KEY) return res.status(401).json({ ok: false, message: 'Unauthorised' });
  next();
}

app.get('/api/health', (req, res) => res.json({ ok: true, time: new Date().toISOString() }));

app.post('/api/enquiries', async (req, res) => {
  if (rateLimited(req.ip)) {
    return res.status(429).json({ ok: false, message: 'Too many enquiries from this device. Please try again later or contact us on WhatsApp.' });
  }

  // Silently accept obvious spam without storing it (so bots get no signal).
  if (looksLikeSpam(req.body)) {
    return res.status(200).json({ ok: true, message: 'Thank you! Your enquiry has been received.' });
  }

  const { data, errors } = validateEnquiry(req.body);
  if (Object.keys(errors).length) {
    return res.status(400).json({ ok: false, message: 'Please correct the highlighted fields.', errors });
  }

  try {
    const record = await saveEnquiry(data);
    console.log(`[enquiry] ${record.createdAt} ${record.fullName} ${record.countryCode}${record.mobile}`);

    // Optional: forward to an external system (Google Sheet, CRM, email service...)
    if (WEBHOOK) {
      fetch(WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) })
        .catch((err) => console.error('[webhook] failed:', err.message));
    }

    return res.status(201).json({
      ok: true,
      message: 'Thank you! Your enquiry has been received. Our team will contact you shortly.',
    });
  } catch (err) {
    console.error('[enquiry] save failed:', err);
    return res.status(500).json({ ok: false, message: 'Something went wrong while saving your enquiry. Please try again or contact us on WhatsApp.' });
  }
});

app.get('/api/enquiries', requireAdmin, async (req, res) => {
  res.json({ ok: true, enquiries: await listEnquiries() });
});

app.get('/api/enquiries.csv', requireAdmin, async (req, res) => {
  const rows = await listEnquiries();
  const cols = ['createdAt', 'fullName', 'countryCode', 'mobile', 'email', 'currentRole', 'experience', 'background', 'plan', 'message'];
  const esc = (v) => {
    let s = String(v ?? '');
    if (/^[=+\-@]/.test(s)) s = `'${s}`; // prevent spreadsheet formula injection
    return `"${s.replace(/"/g, '""')}"`;
  };
  const csv = [cols.join(','), ...rows.map((r) => cols.map((c) => esc(r[c])).join(','))].join('\r\n');
  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', 'attachment; filename="skill-edge-enquiries.csv"');
  res.send('﻿' + csv);
});

app.use('/api', (req, res) => res.status(404).json({ ok: false, message: 'Not found' }));

// --- Serve the built website (after `npm run build`) ---
const DIST = path.join(__dirname, '..', 'client', 'dist');
if (existsSync(DIST)) {
  app.use(express.static(DIST, { maxAge: '7d', index: false }));
  app.get('*', (req, res) => res.sendFile(path.join(DIST, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Skill Edge API running on http://localhost:${PORT}`);
  if (existsSync(DIST)) console.log(`Serving website from client/dist at http://localhost:${PORT}`);
});
