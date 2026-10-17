import { useState } from 'react';
import { Plus } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { faqs } from '../data/faqs.js';

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="section" aria-labelledby="faq-title">
      <div className="container container--narrow">
        <SectionHeading
          id="faq-title"
          eyebrow="FAQ"
          title="Frequently asked questions"
          intro="Straight answers to the questions we hear most. Can’t find yours? Ask us on WhatsApp."
        />
        <div className="faq">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`faq__item ${isOpen ? 'is-open' : ''}`}>
                <h3>
                  <button
                    id={`faq-q-${i}`}
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{f.q}</span>
                    <Plus className="faq__icon" size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="faq__a" hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
