import { useState } from 'react';
import { TrendingUp, Building2, Route, ArrowRight, Info, Quote, ChevronDown } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { spotlightStories, placements, storiesSettings } from '../data/stories.js';
import { useEnquiry } from '../components/EnquiryContext.js';

function iconFor(category) {
  if (category.includes('Company')) return Building2;
  if (category.includes('Career')) return Route;
  return TrendingUp;
}

function displayName(name) {
  if (!name) return 'Name to be added';
  return storiesSettings.showNames ? name : `${name.charAt(0)}.`;
}

function StoryCard({ story, index }) {
  const Icon = iconFor(story.category);
  return (
    <article className="story reveal" style={{ '--delay': `${index * 60}ms` }}>
      <header className="story__head">
        <span className="story__icon"><Icon size={20} aria-hidden="true" /></span>
        <span className="story__category">{story.category}</span>
      </header>

      {story.growth && (
        <p className="story__growth">
          {story.growth}
          <small>salary growth</small>
        </p>
      )}

      <p className="story__name">{displayName(story.name)}</p>

      <dl className="story__path">
        <div>
          <dt>Before</dt>
          <dd>{story.previousRole || '—'}</dd>
          {story.previousSalary && <dd className="story__salary">{story.previousSalary}</dd>}
        </div>
        <ArrowRight className="story__arrow" size={18} aria-hidden="true" />
        <div>
          <dt>After</dt>
          <dd>{story.newRole || '—'}</dd>
          {story.newSalary && <dd className="story__salary story__salary--new">{story.newSalary}</dd>}
        </div>
      </dl>

      {story.company && <p className="story__company">{story.company}</p>}

      {story.testimonial && (
        <blockquote className="story__quote">
          <Quote size={16} aria-hidden="true" />
          {story.testimonial}
        </blockquote>
      )}

      <p className={`story__tag ${story.verified ? 'story__tag--verified' : ''}`}>
        {story.verified ? 'Independently verified' : 'Institute-reported'}
      </p>
    </article>
  );
}

export default function SuccessStories() {
  const { goToEnquiry } = useEnquiry();
  const [showAll, setShowAll] = useState(false);
  const rows = showAll ? placements : placements.slice(0, 8);

  return (
    <section id="success" className="section" aria-labelledby="success-title">
      <div className="container">
        <SectionHeading
          id="success-title"
          eyebrow="Student success stories"
          title="Real Career Journeys. Inspiring Growth."
          intro="Learners from mainframes, content moderation, accounts, audit, Google mapping, AML-KYC and development backgrounds have moved into ITGC roles."
        />

        <div className="stories">
          {spotlightStories.map((s, i) => (
            <StoryCard key={s.id} story={s} index={i} />
          ))}
        </div>

        {storiesSettings.showPlacementTable && placements.length > 0 && (
          <div className="placements reveal">
            <div className="placements__head">
              <h3>Latest ITGC placements reported by Skill Edge</h3>
              <p>Annual packages in ₹ lakhs (L). Previous domain → offers received.</p>
            </div>
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Previous domain</th>
                    <th scope="col">Previous package</th>
                    <th scope="col">Company offers</th>
                    <th scope="col">Package offered</th>
                    <th scope="col">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((p) => (
                    <tr key={p.name + p.company}>
                      <th scope="row">{displayName(p.name)}</th>
                      <td>{p.domain}</td>
                      <td>{p.previous}</td>
                      <td>{p.company}</td>
                      <td><strong>{p.offered}</strong></td>
                      <td><span className="pill pill--growth">{p.growth}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {placements.length > 8 && (
              <button className="btn btn--link" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}>
                {showAll ? 'Show fewer' : `Show all ${placements.length} placements`}
                <ChevronDown size={18} className={showAll ? 'rotate' : ''} aria-hidden="true" />
              </button>
            )}
          </div>
        )}

        <p className="note note--muted reveal">
          <Info size={16} aria-hidden="true" />
          These outcomes are reported by Skill Edge Institute from its own records and have not been independently
          verified. Individual results depend on experience, skills, effort and the job market. No job or salary
          increase is guaranteed.
        </p>

        <div className="center reveal">
          <button className="btn btn--primary btn--lg" onClick={() => goToEnquiry()}>
            Start Your Career Journey <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
