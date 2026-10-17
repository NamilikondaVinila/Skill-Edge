import { Clock, BookOpenCheck, BadgeCheck, UsersRound, MonitorPlay, GraduationCap, ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import { courseOverview } from '../data/course.js';
import { whatsappLink } from '../config/siteConfig.js';
import { useEnquiry } from '../components/EnquiryContext.js';

const icons = [Clock, BookOpenCheck, BadgeCheck, UsersRound, MonitorPlay, GraduationCap];

export default function CourseOverview() {
  const { goToEnquiry } = useEnquiry();

  return (
    <section id="course" className="section section--tint" aria-labelledby="course-title">
      <div className="container">
        <SectionHeading
          id="course-title"
          eyebrow="Course overview"
          title={courseOverview.title}
          intro="A beginner-friendly program that takes you from the basics of IT general controls to audit execution, documentation and interview readiness."
        />

        <div className="course">
          <dl className="course__facts">
            {courseOverview.facts.map((f, i) => {
              const Icon = icons[i % icons.length];
              return (
                <div key={f.label} className="fact reveal" style={{ '--delay': `${i * 50}ms` }}>
                  <span className="icon-chip icon-chip--sm"><Icon size={18} aria-hidden="true" /></span>
                  <div>
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                </div>
              );
            })}
          </dl>

          <aside className="summary-card reveal" aria-label="Course summary">
            <p className="summary-card__label">Course summary</p>
            <h3>ITGC / IT Systems Audit</h3>
            <ul className="summary-card__list">
              <li><span>Classes</span><strong>30</strong></li>
              <li><span>Duration</span><strong>~2 months</strong></li>
              <li><span>Experience</span><strong>2+ years</strong></li>
              <li><span>Coding</span><strong>Not required for core concepts</strong></li>
            </ul>
            <button className="btn btn--accent btn--block" onClick={() => goToEnquiry()}>
              Enquire About Fees <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a className="btn btn--wa btn--block" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon size={18} /> Ask on WhatsApp
            </a>
          </aside>
        </div>
      </div>
    </section>
  );
}
