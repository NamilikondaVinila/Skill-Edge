import { CalendarDays, Clock, MonitorPlay, Timer, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { getActiveBatches } from '../utils/batches.js';
import { useEnquiry } from '../components/EnquiryContext.js';

const statusLabel = {
  open: 'Registrations open',
  filling: 'Filling fast',
  closed: 'Registrations closed',
  announced: 'Coming soon',
};

export default function Batches() {
  const { goToEnquiry } = useEnquiry();
  const items = getActiveBatches();

  return (
    <section id="batches" className="section section--tint" aria-labelledby="batches-title">
      <div className="container">
        <SectionHeading
          id="batches-title"
          eyebrow="Upcoming batches & announcements"
          title="Join the next session"
          intro="Attend a free demo to understand the program, or register your interest for the next training batch."
        />

        {items.length === 0 ? (
          <p className="center muted">New batch dates will be announced soon. Contact us to be notified.</p>
        ) : (
          <div className="batches">
            {items.map((b, i) => (
              <article key={b.id} className="batch reveal" style={{ '--delay': `${i * 70}ms` }}>
                <div className="batch__top">
                  <span className="batch__type">{b.type}</span>
                  <span className={`status status--${b.status}`}>{statusLabel[b.status] || b.status}</span>
                </div>
                <h3>{b.name}</h3>
                <ul className="batch__meta">
                  <li><CalendarDays size={16} aria-hidden="true" /><span><strong>Start:</strong> {b.startDate}</span></li>
                  <li><Timer size={16} aria-hidden="true" /><span><strong>Duration:</strong> {b.duration}</span></li>
                  <li><Clock size={16} aria-hidden="true" /><span><strong>Schedule:</strong> {b.schedule}</span></li>
                  <li><MonitorPlay size={16} aria-hidden="true" /><span><strong>Format:</strong> {b.format}</span></li>
                </ul>
                {b.status !== 'closed' && (
                  <button className="btn btn--outline btn--block" onClick={() => goToEnquiry()}>
                    {b.type.toLowerCase().includes('demo') ? 'Register for Demo' : 'Register Interest'}
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
