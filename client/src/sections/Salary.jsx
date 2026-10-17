import { Info, MessageCircle } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import {
  salaryProgression,
  publishSalaryFigures,
  salaryFallbackMessage,
  salarySource,
} from '../data/careers.js';
import { useEnquiry } from '../components/EnquiryContext.js';

export default function Salary() {
  const { goToEnquiry } = useEnquiry();

  return (
    <section id="salary" className="section section--dark section--salary" aria-labelledby="salary-title">
      <div className="container">
        <SectionHeading
          light
          id="salary-title"
          eyebrow="Career progression"
          title={<>How an <span className="text-cyan">ITGC / IT Audit</span> career typically grows</>}
          intro="A common progression path in IT audit and technology risk. Timelines vary by person and organisation."
        />

        <div className="salary-table reveal">
          <div className="table-wrap">
            <table className="table table--dark">
              <thead>
                <tr>
                  <th scope="col">Job role</th>
                  <th scope="col">Typical experience</th>
                  {publishSalaryFigures && <th scope="col" className="th-accent">Indicative salary (India)</th>}
                  <th scope="col">Next step</th>
                </tr>
              </thead>
              <tbody>
                {salaryProgression.map((r, i) => (
                  <tr key={r.role}>
                    <th scope="row">
                      <span className="level">{i + 1}</span>
                      {r.role}
                    </th>
                    <td>{r.experience}</td>
                    {publishSalaryFigures && <td className="td-accent">{r.range}</td>}
                    <td>{r.next}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {publishSalaryFigures ? (
            <p className="note note--dark">
              <Info size={16} aria-hidden="true" />
              Approximate general market ranges, not outcomes of Skill Edge students. {salarySource}
            </p>
          ) : (
            <div className="salary-fallback">
              <p>
                <Info size={18} aria-hidden="true" /> {salaryFallbackMessage}
              </p>
              <button className="btn btn--accent" onClick={() => goToEnquiry()}>
                <MessageCircle size={18} aria-hidden="true" /> Talk to us
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
