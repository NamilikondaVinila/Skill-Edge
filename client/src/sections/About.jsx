import { Target, Layers, Lightbulb, MessagesSquare, Compass } from 'lucide-react';

const pillars = [
  { icon: Target, title: 'Career-focused learning', text: 'Every module connects back to the work ITGC and IT audit teams actually do.' },
  { icon: Layers, title: 'Structured training', text: 'A planned 30-class journey that builds step by step from the basics.' },
  { icon: Lightbulb, title: 'Practical examples & scenarios', text: 'Concepts explained through real-world style audit situations, not just theory.' },
  { icon: MessagesSquare, title: 'Interview preparation', text: 'Practice for the questions and discussions common in ITGC interviews.' },
  { icon: Compass, title: 'Guidance for career transitions', text: 'Support in positioning your existing experience for a move into IT audit.' },
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
              Skill Edge Institute helps experienced professionals explore career opportunities in ITGC and IT Systems
              Audit through structured training, practical learning, and career-focused guidance.
            </p>
            <p>
              Our program is designed to make complex audit and compliance concepts easier to understand for learners
              from different professional backgrounds — whether you come from finance, accounting, audit, BPO,
              operations, content moderation, Google mapping or a technical role.
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
