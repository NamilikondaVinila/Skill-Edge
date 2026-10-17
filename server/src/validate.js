// Server-side validation — mirrors the frontend rules so bad data can never be stored.

const EXPERIENCE = ['Less than 2 years', '2 – 4 years', '4 – 7 years', '7 – 10 years', '10+ years'];
const BACKGROUNDS = ['Technical', 'Non-technical'];
const PLANS = ['', 'Basic Plan', 'Standard Plan', 'Premium Plan'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clean = (v, max = 200) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

export function validateEnquiry(body = {}) {
  const data = {
    fullName: clean(body.fullName, 80),
    countryCode: clean(body.countryCode, 5),
    mobile: clean(body.mobile, 20).replace(/[\s-]/g, ''),
    email: clean(body.email, 120).toLowerCase(),
    currentRole: clean(body.currentRole, 100),
    experience: clean(body.experience, 40),
    background: clean(body.background, 20),
    plan: clean(body.plan, 40),
    message: clean(body.message, 1000),
    consent: body.consent === true,
  };

  const errors = {};
  if (!data.fullName || data.fullName.length < 2 || !/^[\p{L} .'-]+$/u.test(data.fullName))
    errors.fullName = 'Please enter a valid full name.';
  if (!/^\+\d{1,4}$/.test(data.countryCode)) errors.mobile = 'Please select a valid country code.';
  else if (data.countryCode === '+91' ? !/^[6-9]\d{9}$/.test(data.mobile) : !/^\d{6,14}$/.test(data.mobile))
    errors.mobile = 'Please enter a valid mobile number.';
  if (!EMAIL_RE.test(data.email)) errors.email = 'Please enter a valid email address.';
  if (!data.currentRole) errors.currentRole = 'Please enter your current job role.';
  if (!EXPERIENCE.includes(data.experience)) errors.experience = 'Please select your total work experience.';
  if (!BACKGROUNDS.includes(data.background)) errors.background = 'Please select your background.';
  if (!PLANS.includes(data.plan)) data.plan = '';
  if (!data.consent) errors.consent = 'Consent is required so we can contact you.';

  return { data, errors };
}

/** Basic spam checks: honeypot field filled, or form submitted impossibly fast. */
export function looksLikeSpam(body = {}) {
  if (typeof body.website === 'string' && body.website.trim() !== '') return true;
  const elapsed = Number(body.elapsedMs);
  if (Number.isFinite(elapsed) && elapsed < 3000) return true;
  return false;
}
