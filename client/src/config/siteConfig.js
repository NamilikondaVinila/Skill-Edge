/**
 * ============================================================
 *  SITE CONFIGURATION — edit contact details in ONE place.
 * ============================================================
 *  Anything marked `null` is a placeholder: the website hides it
 *  automatically until you fill in a real value.
 */

export const siteConfig = {
  instituteName: 'Skill Edge Institute',
  shortName: 'Skill Edge',
  tagline: 'ITGC & IT Systems Audit Training',

  // Logo: leave null to use the built-in text logo.
  // To use your real logo, put the file in client/public/ (e.g. logo.png)
  // and set: logoUrl: '/logo.png'
  logoUrl: '/logo.png',

  // Phone / WhatsApp — digits only for `whatsappNumber` (country code + number, no + or spaces).
  phoneDisplay: '+91 88858 01601',
  phoneLink: '+918885801601',
  whatsappNumber: '918885801601',

  // Prefilled WhatsApp message used by all general "WhatsApp" buttons.
  whatsappMessage:
    'Hello Skill Edge Institute, I am interested in your ITGC / IT Systems Audit training program. Please share the course details, fee structure, upcoming batch information, and registration process.',

  // PLACEHOLDERS — add the institute's verified details when ready.
  email: null, // e.g. 'info@yourdomain.com'
  address: null, // e.g. 'Floor, Building, Area, City – PIN'
  social: {
    linkedin: null, // e.g. 'https://www.linkedin.com/company/...'
    instagram: null,
    youtube: null,
    facebook: null,
  },

  // Backend endpoint for the enquiry form.
  // In development Vite forwards /api to the Express server automatically.
  // If you host the backend on a different domain, set VITE_API_BASE_URL in client/.env
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || '',
};

/** Builds a wa.me link with an optional custom message. */
export function whatsappLink(message = siteConfig.whatsappMessage) {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export function planWhatsappMessage(planName) {
  return `Hello Skill Edge Institute, I would like to know the fees and details of the ${planName} for the ITGC / IT Systems Audit training program. Please share the fee structure, payment options, and upcoming batch information.`;
}
