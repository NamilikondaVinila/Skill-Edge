import { Sprout, CodeXml, Lightbulb, Compass } from 'lucide-react';

const pillars = [
  { icon: Sprout, title: 'Beginner-friendly', text: 'Starts from the basics. No audit or IT background needed.' },
  { icon: CodeXml, title: 'No coding required', text: 'Core ITGC work is about processes and controls, not programming.' },
  { icon: Lightbulb, title: 'Practical & job-focused', text: 'Real-world audit scenarios that mirror what IT audit teams actually do.' },
  { icon: Compass, title: 'Interview & job support', text: 'Interview practice, profile positioning and help finding the right openings.' },
];

export default function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <div className="about">
          <div className="about__text reveal">
            <p className="eyebrow">About Skill Edge Institute</p>
            <h2 id="about-title">Your experience is the starting point. We help you build on it.</h2>
            <p>
              We help working professionals from finance, audit, BPO, operations or tech roles move into ITGC and IT
              Systems Audit, with every concept explained simply and practically.
            </p>
          </div>
          <div className="about__cards">
            {pillars.map(({ icon: Icon, title, text }, i) => (
              <article key={title} className="card card--feature reveal" style={{ '--delay': `${i * 60}ms` }}>
                <span className="icon-chip"><Icon size={22} aria-hidden="true" /></span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
