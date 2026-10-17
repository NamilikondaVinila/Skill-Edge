import { Sprout, CodeXml, Repeat, Layers, Workflow, FileSearch, MessagesSquare, Search } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';

const reasons = [
  { icon: Sprout, title: 'Beginner-friendly approach', text: 'Concepts are explained from the ground up, so you do not need prior audit or IT background.' },
  { icon: CodeXml, title: 'No advanced programming', text: 'Core ITGC concepts are process-oriented and do not require coding skills.' },
  { icon: Repeat, title: 'Built for domain switchers', text: 'Suitable for professionals moving from finance, BPO, operations, mapping, moderation and more.' },
  { icon: Layers, title: 'Structured 30-class program', text: 'A clear sequence of modules so you always know what comes next.' },
  { icon: Workflow, title: 'Practical, process-oriented', text: 'Learn how controls work inside real business and IT processes.' },
  { icon: FileSearch, title: 'Controls, compliance & documentation', text: 'Understand IT controls, compliance expectations and how audit work is documented.' },
  { icon: MessagesSquare, title: 'Interview preparation', text: 'Career-oriented preparation for ITGC and IT audit interviews.' },
  { icon: Search, title: 'Job-search support', text: 'Guidance on identifying relevant openings and presenting your profile.' },
];

export default function WhyChoose() {
  return (
    <section id="why" className="section section--dark" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading
          light
          id="why-title"
          eyebrow="Why Skill Edge Institute"
          title="A specialised career path, taught in a way that makes sense"
          intro="ITGC and IT audit are specialised fields that reward process understanding and careful judgement. Our training is built around exactly that."
        />
        <div className="grid grid--4">
          {reasons.map(({ icon: Icon, title, text }, i) => (
            <article key={title} className="card card--dark reveal" style={{ '--delay': `${(i % 4) * 60}ms` }}>
              <span className="icon-chip icon-chip--glow"><Icon size={22} aria-hidden="true" /></span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
