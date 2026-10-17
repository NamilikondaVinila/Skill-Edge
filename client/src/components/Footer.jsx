import { Phone, Mail, MapPin, Linkedin, Instagram, Youtube, Facebook } from 'lucide-react';
import Logo from './Logo.jsx';
import WhatsAppIcon from './WhatsAppIcon.jsx';
import { siteConfig, whatsappLink } from '../config/siteConfig.js';

const socialIcons = { linkedin: Linkedin, instagram: Instagram, youtube: Youtube, facebook: Facebook };

export default function Footer() {
  const socials = Object.entries(siteConfig.social).filter(([, url]) => url);
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo light />
          <p>
            Structured, practical ITGC and IT Systems Audit training for working professionals from technical and
            non-technical backgrounds.
          </p>
          {socials.length > 0 && (
            <div className="footer__social">
              {socials.map(([key, url]) => {
                const Icon = socialIcons[key];
                return (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer" aria-label={key}>
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          )}
        </div>

        <div>
          <h3 className="footer__title">Program</h3>
          <ul className="footer__links">
            <li><a href="#course">Course overview</a></li>
            <li><a href="#curriculum">Curriculum</a></li>
            <li><a href="#fees">Fee plans</a></li>
            <li><a href="#batches">Upcoming batches</a></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Explore</h3>
          <ul className="footer__links">
            <li><a href="#success">Success stories</a></li>
            <li><a href="#careers">Career paths</a></li>
            <li><a href="#eligibility">Eligibility</a></li>
            <li><a href="#faq">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h3 className="footer__title">Contact</h3>
          <ul className="footer__contact">
            <li>
              <Phone size={16} aria-hidden="true" />
              <a href={`tel:${siteConfig.phoneLink}`}>{siteConfig.phoneDisplay}</a>
            </li>
            <li>
              <WhatsAppIcon size={16} />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
            </li>
            {siteConfig.email && (
              <li>
                <Mail size={16} aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
              </li>
            )}
            {siteConfig.address && (
              <li>
                <MapPin size={16} aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
            )}
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <p>© {year} {siteConfig.instituteName}. All rights reserved.</p>
        <p className="footer__disclaimer">
          Training does not guarantee employment or specific salary outcomes. Results vary by individual.
        </p>
      </div>
    </footer>
  );
}
