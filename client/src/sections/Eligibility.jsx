import { BriefcaseBusiness, GraduationCap, ShieldCheck, Repeat, ArrowRight } from 'lucide-react';
import { useEnquiry } from '../components/EnquiryContext.js';

const criteria = [
  { icon: BriefcaseBusiness, text: 'Professionals with 2+ years of work experience in any domain' },
  { icon: GraduationCap, text: 'Graduates from technical or non-technical backgrounds' },
  { icon: ShieldCheck, text: 'Professionals interested in ITGC, IT audit, technology risk and compliance' },
  { icon: Repeat, text: 'Individuals looking to explore a domain change' },
];

export default function Eligibility() {
  const { goToEnquiry } = useEnquiry();

  return (
    <section id="eligibility" className="section" aria-labelledby="eligibility-title">
      <div className="container">
        <div className="eligibility reveal">
          <div className="eligibility__text">
            <p className="eyebrow eyebrow--light">Eligibility</p>
            <h2 id="eligibility-title">
              Your Previous Domain Does Not Have to Define Your <span className="text-gold">Next Career Move.</span>
            </h2>
            <p>
              If you have a few years of work experience and an interest in how organisations control and audit their
              IT systems, this program is built for you. Final eligibility is subject to the institute’s policy.
            </p>
            <button className="btn btn--accent btn--lg" onClick={() => goToEnquiry()}>
              Check Your Eligibility <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <ul className="eligibility__list">
            {criteria.map(({ icon: Icon, text }) => (
              <li key={text}>
                <span className="icon-chip icon-chip--glass"><Icon size={20} aria-hidden="true" /></span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
