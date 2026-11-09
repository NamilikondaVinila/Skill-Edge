import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading.jsx';
import { placements, storiesSettings } from '../data/stories.js';
import { useEnquiry } from '../components/EnquiryContext.js';

function displayName(name) {
  if (!name) return 'Name to be added';
  return storiesSettings.showNames ? name : `${name.charAt(0)}.`;
}

function initials(name) {
  if (!name) return '?';
  return name.split(' ').map((w) => w.charAt(0)).join('').slice(0, 2).toUpperCase();
}

// Best results first: sort by growth % (highest first)
const growthValue = (g) => parseFloat(String(g).replace('%', '')) || 0;
const rankedStories = [...placements].sort((a, b) => growthValue(b.growth) - growthValue(a.growth));

function StoryCircle({ story, rank }) {
  return (
    <li className="story-circle">
      {rank <= 3 && <span className="story-circle__badge">#{rank}</span>}
      <div className="story-circle__ring">
        <div className="story-circle__inner">
          <span className="story-circle__avatar">{initials(story.name)}</span>
          <span className="story-circle__growth">{story.growth}</span>
          <span className="story-circle__label">growth</span>
        </div>
      </div>
      <p className="story-circle__name">{displayName(story.name)}</p>
      <p className="story-circle__path">
        {story.previous} <ArrowRight size={12} aria-hidden="true" /> <strong>{story.offered}</strong>
      </p>
      <p className="story-circle__meta">{story.domain} → {story.company}</p>
    </li>
  );
}

export default function SuccessStories() {
  const { goToEnquiry } = useEnquiry();

  // Carousel: no free scrolling — only the arrows move it, one story per click (loops around).
  const viewportRef = useRef(null);
  const [perView, setPerView] = useState(5);
  const [index, setIndex] = useState(0);
  const total = rankedStories.length;
  const maxIndex = Math.max(0, total - perView);

  useEffect(() => {
    const fit = () => {
      const el = viewportRef.current;
      if (!el) return;
      const w = el.clientWidth;
      setPerView(w < 420 ? 1 : w < 640 ? 2 : w < 900 ? 3 : w < 1100 ? 4 : 5);
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const move = (dir) => {
    setIndex((i) => {
      const n = i + dir;
      if (n > maxIndex) return 0; // after the last one, go back to the best story
      if (n < 0) return maxIndex;
      return n;
    });
  };

  return (
    <section id="success" className="section" aria-labelledby="success-title">
      <div className="container">
        <SectionHeading
          id="success-title"
          eyebrow="Student success stories"
          title="Real Career Journeys. Inspiring Growth."
          intro="Learners from mainframes, content moderation, accounts, audit, Google mapping, AML-KYC and development backgrounds have moved into ITGC roles."
        />

        <div className="story-carousel reveal">
          <button
            type="button"
            className="story-carousel__arrow story-carousel__arrow--prev"
            onClick={() => move(-1)}
            aria-label="Previous success stories"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </button>

          <div className="story-carousel__viewport" ref={viewportRef}>
            <ul
              className="story-carousel__track"
              aria-label="Student placements, best results first"
              style={{ '--per-view': perView, transform: `translateX(calc(-${index} * (100% + var(--gap)) / var(--per-view)))` }}
            >
              {rankedStories.map((p, i) => (
                <StoryCircle key={p.name + p.company} story={p} rank={i + 1} />
              ))}
            </ul>
          </div>

          <button
            type="button"
            className="story-carousel__arrow story-carousel__arrow--next"
            onClick={() => move(1)}
            aria-label="Next success stories"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>
        <p className="story-carousel__count" aria-live="polite">
          Showing {index + 1}–{Math.min(index + perView, total)} of {total} success stories
        </p>

        <p className="note note--muted reveal">
          <Info size={16} aria-hidden="true" />
          These outcomes are reported by Skill Edge Institute from its own records and have not been independently
          verified. Individual results depend on experience, skills, effort and the job market. No job or salary
          increase is guaranteed.
        </p>

        <div className="center reveal">
          <button className="btn btn--primary btn--lg" onClick={() => goToEnquiry()}>
            Start Your Career Journey <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
