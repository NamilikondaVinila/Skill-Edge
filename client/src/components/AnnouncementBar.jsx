import { CalendarDays, X } from 'lucide-react';
import { useState } from 'react';
import { getActiveDemos } from '../utils/batches.js';

/** Thin bar at the very top — only shows while a free demo class is still upcoming. */
export default function AnnouncementBar() {
  const [closed, setClosed] = useState(false);
  const demos = getActiveDemos();
  if (closed || demos.length === 0) return null;

  const dates = demos.map((d) => d.startDate.split(',').pop().trim().replace(/ \d{4}$/, '')).join(' & ');

  return (
    <div className="announce" role="region" aria-label="Announcement">
      <div className="container announce__inner">
        <CalendarDays size={16} aria-hidden="true" />
        <p>
          <strong>Free demo classes:</strong> {dates}
          <span className="announce__extra"> · {demos[0].schedule} · {demos[0].format}</span>
        </p>
        <a href="#batches" className="announce__link">Details</a>
        <button className="announce__close" onClick={() => setClosed(true)} aria-label="Dismiss announcement">
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
