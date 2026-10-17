import { useState } from 'react';
import { ChevronDown, Info } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { curriculum, curriculumConfirmed } from '../data/course.js';

export default function Curriculum() {
  const [openId, setOpenId] = useState(curriculum[0]?.id);

  return (
    <section id="curriculum" className="section" aria-labelledby="curriculum-title">
      <div className="container">
        <SectionHeading
          id="curriculum-title"
          eyebrow="What you will learn"
          title="A 30-class learning journey"
          intro="Each module builds on the previous one — from understanding controls, to testing them, to explaining your work confidently in an interview."
        />

        {!curriculumConfirmed && (
          <p className="note reveal">
            <Info size={16} aria-hidden="true" /> Proposed curriculum. Final topics and class allocation will be
            confirmed by the institute for each batch.
          </p>
        )}

        <ol className="modules">
          {curriculum.map((m, i) => {
            const isOpen = openId === m.id;
            return (
              <li key={m.id} className={`module reveal ${isOpen ? 'is-open' : ''}`}>
                <h3 className="module__heading">
                  <button
                    className="module__toggle"
                    aria-expanded={isOpen}
                    aria-controls={`${m.id}-panel`}
                    onClick={() => setOpenId(isOpen ? null : m.id)}
                  >
                    <span className="module__num">{String(i + 1).padStart(2, '0')}</span>
                    <span className="module__title">
                      {m.title}
                      <small>Classes {m.classes}</small>
                    </span>
                    <ChevronDown className="module__chev" size={20} aria-hidden="true" />
                  </button>
                </h3>
                <div id={`${m.id}-panel`} className="module__panel" role="region" hidden={!isOpen}>
                  <p>{m.summary}</p>
                  <ul className="checklist">
                    {m.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
