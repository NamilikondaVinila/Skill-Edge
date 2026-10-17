/**
 * UPCOMING BATCHES & ANNOUNCEMENTS
 *
 * Each item disappears from the website automatically once its `endsAt`
 * date-time has passed, so old dates are never shown as "upcoming".
 * Use ISO date-times with the India offset, e.g. '2026-10-17T12:00:00+05:30'.
 * Leave `endsAt: null` for items that should always show (e.g. "Dates to be announced").
 *
 * status: 'open' | 'filling' | 'closed' | 'announced'
 */

export const batches = [
  {
    id: 'demo-2026-10-17',
    type: 'Free Demo Class',
    name: 'ITGC / IT Systems Audit – Free Demo',
    startDate: 'Saturday, 17 October 2026',
    duration: '1 hour',
    schedule: '11:00 AM – 12:00 PM IST',
    format: 'Live online via Microsoft Teams',
    status: 'open',
    endsAt: '2026-10-17T12:00:00+05:30',
  },
  {
    id: 'demo-2026-10-18',
    type: 'Free Demo Class',
    name: 'ITGC / IT Systems Audit – Free Demo',
    startDate: 'Sunday, 18 October 2026',
    duration: '1 hour',
    schedule: '11:00 AM – 12:00 PM IST',
    format: 'Live online via Microsoft Teams',
    status: 'open',
    endsAt: '2026-10-18T12:00:00+05:30',
  },
  {
    id: 'next-batch',
    type: 'Training Batch',
    name: 'Next ITGC / IT Systems Audit Batch',
    startDate: 'To be announced',
    duration: 'Approximately 2 months (30 classes)',
    schedule: 'To be announced',
    format: 'To be confirmed',
    status: 'announced',
    endsAt: null,
  },
];
