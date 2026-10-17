import { ShieldCheck, ClipboardCheck, Scale, Briefcase, FileCheck2, Users, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { careerRoles } from '../data/careers.js';

const icons = [ShieldCheck, ClipboardCheck, Scale, Briefcase, FileCheck2, Users];

export default function Careers() {
  return (
    <section id="careers" className="section" aria-labelledby="careers-title">
      <div className="container">
        <SectionHeading
          id="careers-title"
          eyebrow="Career opportunities"
          title="Roles you can explore after ITGC training"
          intro="The skills covered in this program are relevant to a range of roles across audit firms, consulting firms and in-house risk and compliance teams."
        />
        <div className="grid grid--3">
          {careerRoles.map((r, i) => {
            const Icon = icons[i % icons.length];
            return (
              <article key={r.title} className="card card--role reveal" style={{ '--delay': `${(i % 3) * 60}ms` }}>
                <span className="icon-chip"><Icon size={22} aria-hidden="true" /></span>
                <h3>{r.title}</h3>
                <p>{r.description}</p>
              </article>
            );
          })}
        </div>
        <p className="note note--muted reveal">
          <Info size={16} aria-hidden="true" />
          Actual eligibility, compensation and hiring requirements depend on your experience, skills, the employer and
          location. Completing the course does not automatically qualify you for every role.
        </p>
      </div>
    </section>
  );
}
