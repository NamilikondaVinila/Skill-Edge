import { whatsappLink } from '../config/siteConfig.js';
import WhatsAppIcon from './WhatsAppIcon.jsx';

export default function FloatingWhatsApp() {
  return (
    <a
      className="float-wa"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Skill Edge Institute on WhatsApp"
    >
      <WhatsAppIcon size={28} />
      <span className="float-wa__label">Chat with us</span>
    </a>
  );
}
