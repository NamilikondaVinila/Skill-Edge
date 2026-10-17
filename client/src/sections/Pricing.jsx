import { Check, Star } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import { plans } from '../data/plans.js';
import { whatsappLink, planWhatsappMessage } from '../config/siteConfig.js';
import { useEnquiry } from '../components/EnquiryContext.js';

const rows = [
  { key: 'classes', label: 'Included classes' },
  { key: 'resources', label: 'Training resources' },
  { key: 'interviewPrep', label: 'Interview preparation' },
  { key: 'mentoring', label: 'Mentoring / doubt-clearing' },
  { key: 'paymentOptions', label: 'Payment options' },
];

export default function Pricing() {
  const { goToEnquiry } = useEnquiry();

  return (
    <section id="fees" className="section section--tint" aria-labelledby="fees-title">
      <div className="container">
        <SectionHeading
          id="fees-title"
          eyebrow="Course fees"
          title="Choose the Training Plan That Fits You"
          intro="We offer multiple fee structures. Contact us for current fees, plan inclusions and payment options."
        />

        <div className="plans">
          {plans.map((plan, i) => (
            <article
              key={plan.id}
              className={`plan reveal ${plan.recommended ? 'plan--recommended' : ''}`}
              style={{ '--delay': `${i * 80}ms` }}
            >
              {plan.recommended && (
                <span className="plan__badge"><Star size={14} aria-hidden="true" /> Recommended</span>
              )}
              <h3 className="plan__name">{plan.name}</h3>
              <p className="plan__desc">{plan.description}</p>
              <p className="plan__price">{plan.fee || <span className="plan__price--contact">Contact us for fees</span>}</p>

              <ul className="plan__features">
                {rows.map((r) => (
                  <li key={r.key}>
                    <Check size={16} aria-hidden="true" />
                    <span>
                      <span className="plan__feature-label">{r.label}:</span> {plan[r.key] || 'Contact us'}
                    </span>
                  </li>
                ))}
                {plan.extras?.map((x) => (
                  <li key={x}>
                    <Check size={16} aria-hidden="true" />
                    <span>{x}</span>
                  </li>
                ))}
              </ul>

              <div className="plan__actions">
                <button className="btn btn--primary btn--block" onClick={() => goToEnquiry(plan.name)}>
                  Enquire About This Plan
                </button>
                <a
                  className="btn btn--wa btn--block"
                  href={whatsappLink(planWhatsappMessage(plan.name))}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WhatsAppIcon size={18} /> Discuss Fees on WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
