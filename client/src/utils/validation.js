export const countryCodes = [
  { code: '+91', label: 'India (+91)' },
  { code: '+1', label: 'USA / Canada (+1)' },
  { code: '+44', label: 'UK (+44)' },
  { code: '+971', label: 'UAE (+971)' },
  { code: '+65', label: 'Singapore (+65)' },
  { code: '+61', label: 'Australia (+61)' },
  { code: '+974', label: 'Qatar (+974)' },
  { code: '+966', label: 'Saudi Arabia (+966)' },
];

export const experienceOptions = ['Less than 2 years', '2 – 4 years', '4 – 7 years', '7 – 10 years', '10+ years'];

export const initialForm = {
  fullName: '',
  countryCode: '+91',
  mobile: '',
  email: '',
  currentRole: '',
  experience: '',
  background: '',
  plan: '',
  message: '',
  consent: false,
  website: '', // honeypot — real visitors never see or fill this
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateEnquiry(values) {
  const errors = {};
  const name = values.fullName.trim();
  if (!name) errors.fullName = 'Please enter your full name.';
  else if (name.length < 2 || name.length > 80 || !/^[\p{L} .'-]+$/u.test(name))
    errors.fullName = 'Please use letters only (2–80 characters).';

  const mobile = values.mobile.replace(/[\s-]/g, '');
  if (!mobile) errors.mobile = 'Please enter your mobile number.';
  else if (!/^\d+$/.test(mobile)) errors.mobile = 'Use digits only.';
  else if (values.countryCode === '+91' && !/^[6-9]\d{9}$/.test(mobile))
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  else if (mobile.length < 6 || mobile.length > 14) errors.mobile = 'Enter a valid mobile number.';

  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_RE.test(values.email.trim())) errors.email = 'Enter a valid email address (e.g. name@example.com).';

  if (!values.currentRole.trim()) errors.currentRole = 'Please tell us your current job role.';
  else if (values.currentRole.trim().length > 100) errors.currentRole = 'Please keep this under 100 characters.';

  if (!values.experience) errors.experience = 'Please select your total work experience.';
  if (!values.background) errors.background = 'Please select your background.';
  if (values.message.length > 1000) errors.message = 'Please keep your message under 1000 characters.';
  if (!values.consent) errors.consent = 'Please agree so we can contact you about your enquiry.';

  return errors;
}

/** Builds a readable WhatsApp message from the form values. */
export function enquiryToWhatsappText(v) {
  const lines = [
    'Hello Skill Edge Institute, I am interested in your ITGC / IT Systems Audit training program.',
    '',
    `Name: ${v.fullName.trim()}`,
    `Mobile: ${v.countryCode} ${v.mobile.trim()}`,
    `Email: ${v.email.trim()}`,
    `Current role: ${v.currentRole.trim()}`,
    `Experience: ${v.experience}`,
    `Background: ${v.background}`,
    `Preferred plan: ${v.plan || 'Not sure yet'}`,
  ];
  if (v.message.trim()) lines.push(`Question: ${v.message.trim()}`);
  lines.push('', 'Please share the course details, fee structure, upcoming batch information, and registration process.');
  return lines.join('\n');
}
