import { batches } from '../data/batches.js';

/** Returns only the batches/demos that have not ended yet. */
export function getActiveBatches(now = new Date()) {
  return batches.filter((b) => !b.endsAt || new Date(b.endsAt) > now);
}

/** Returns active free demo classes (used by the top announcement bar). */
export function getActiveDemos(now = new Date()) {
  return getActiveBatches(now).filter((b) => b.type.toLowerCase().includes('demo'));
}
