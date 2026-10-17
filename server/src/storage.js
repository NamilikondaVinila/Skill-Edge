// Simple file-based storage for enquiries (server/data/enquiries.json).
// Good enough for a first version. To move to MongoDB later, replace these
// two functions — the rest of the server does not need to change.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import crypto from 'node:crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, '..', 'data');
const FILE = path.join(DATA_DIR, 'enquiries.json');

let writeQueue = Promise.resolve();

async function readAll() {
  try {
    const raw = await fs.readFile(FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
}

export async function saveEnquiry(data, meta = {}) {
  const record = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    ...data,
    source: meta.source || 'website',
  };
  // Queue writes so two enquiries arriving together never overwrite each other.
  writeQueue = writeQueue.then(async () => {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const all = await readAll();
    all.push(record);
    const tmp = `${FILE}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(all, null, 2), 'utf8');
    await fs.rename(tmp, FILE);
  });
  await writeQueue;
  return record;
}

export async function listEnquiries() {
  await writeQueue;
  const all = await readAll();
  return all.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
