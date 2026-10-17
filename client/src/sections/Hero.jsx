import { ArrowRight, BookOpenCheck, CalendarClock, BriefcaseBusiness, UsersRound, MessagesSquare, CodeXml, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/hero-professionals.webp';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import { whatsappLink } from '../config/siteConfig.js';
import { useEnquiry } from '../components/EnquiryContext.js';

const benefits = [
  { icon: BookOpenCheck, text: '30 structured classes' },
  { icon: CalendarClock, text: 'Approx. 2 months of training' },
  { icon: BriefcaseBusiness, text: 'For professionals with 2+ years of experience' },
  { icon: UsersRound, text: 'Technical & non-technical backgrounds welcome' },
  { icon: MessagesSquare, text: 'Interview preparation & career guidance' },
  { icon: CodeXml, text: 'No advanced coding for core ITGC concepts' },
];

export default function Hero() {
  const { goToEnquiry } = useEnquiry();

  return (
    <section id="top" className="hero" aria-labelledby="hero-title">
      <div className="hero__bg" aria-hidden="true">
        <span className="hero__orb hero__orb--1" />
        <span className="hero__orb hero__orb--2" />
        <span className="hero__grid" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="hero__badge">
            <ShieldCheck size={16} aria-hidden="true" /> ITGC &amp; IT Systems Audit Training
          </p>
          <h1 id="hero-title">
            Upgrade Your Career with <span className="text-gradient">ITGC &amp; IT Systems Audit</span> Training
          </h1>
          <p className="hero__lead">
            Turn your professional experience into new career opportunities. Learn ITGC and IT Systems Audit through
            structured, practical, career-focused training designed for professionals with 2+ years of experience.
          </p>

          <div className="hero__actions">
            <button className="btn btn--primary btn--lg" onClick={() => goToEnquiry()}>
              Enroll Now <ArrowRight size={18} aria-hidden="true" />
            </button>
            <a className="btn btn--ghost btn--lg" href="#course">
              Explore the Course
            </a>
          </div>
          <a className="hero__wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon size={18} /> Have a question? Enquire on WhatsApp
          </a>
        </div>

        <div className="hero__visual">
          <figure className="hero__image-card">
            <img
              src={heroImg}
              alt="Two professionals working on laptops in an IT audit and compliance environment"
              width="408"
              height="285"
              fetchpriority="high"
            />
          </figure>
          <div className="hero__float hero__float--a">
            <strong>30</strong>
            <span>structured classes</span>
          </div>
          <div className="hero__float hero__float--b">
            <strong>~2</strong>
            <span>months program</span>
          </div>
        </div>
      </div>

      <div className="container">
        <ul className="hero__benefits">
          {benefits.map(({ icon: Icon, text }) => (
            <li key={text} className="hero__benefit">
              <span className="hero__benefit-icon"><Icon size={20} aria-hidden="true" /></span>
              <span>{text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
