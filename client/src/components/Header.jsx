import { useEffect, useRef, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import Logo from './Logo.jsx';
import { siteConfig } from '../config/siteConfig.js';
import { useEnquiry } from './EnquiryContext.js';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#course', label: 'Course' },
  { href: '#curriculum', label: 'Curriculum' },
  { href: '#success', label: 'Success Stories' },
  { href: '#fees', label: 'Fees' },
  { href: '#careers', label: 'Careers' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const [menuTop, setMenuTop] = useState(72);
  const headerRef = useRef(null);
  const { goToEnquiry } = useEnquiry();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (!open) return;
    // Mobile menu starts right below the header (the announcement bar may push the header down).
    const place = () => setMenuTop(headerRef.current?.getBoundingClientRect().bottom ?? 72);
    place();
    window.addEventListener('resize', place);
    return () => window.removeEventListener('resize', place);
  }, [open]);

  return (
    <header ref={headerRef} className={`header ${scrolled ? 'header--scrolled' : ''}`}>
      <div className="container header__inner">
        <a href="#top" className="header__brand" aria-label={`${siteConfig.instituteName} – home`} onClick={() => setOpen(false)}>
          <Logo />
        </a>

        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main navigation" style={{ '--menu-top': `${menuTop}px` }}>
          <ul className="nav__list">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`nav__link ${active === l.href.slice(1) ? 'is-active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="nav__mobile-cta">
            <a className="btn btn--outline-dark btn--block" href={`tel:${siteConfig.phoneLink}`}>
              <Phone size={18} /> {siteConfig.phoneDisplay}
            </a>
            <button
              className="btn btn--primary btn--block"
              onClick={() => {
                setOpen(false);
                goToEnquiry();
              }}
            >
              Enroll Now
            </button>
          </div>
        </nav>

        <div className="header__actions">
          <a className="header__phone" href={`tel:${siteConfig.phoneLink}`}>
            <Phone size={16} aria-hidden="true" />
            <span>{siteConfig.phoneDisplay}</span>
          </a>
          <button className="btn btn--primary btn--sm header__cta" onClick={() => goToEnquiry()}>
            Enroll Now
          </button>
          <button
            className="header__toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}
