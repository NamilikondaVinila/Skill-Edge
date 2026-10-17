import { useEffect, useRef, useState } from 'react';
import { Phone, Mail, MapPin, Send, Loader2, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import WhatsAppIcon from '../components/WhatsAppIcon.jsx';
import { siteConfig, whatsappLink } from '../config/siteConfig.js';
import { plans } from '../data/plans.js';
import { useEnquiry } from '../components/EnquiryContext.js';
import {
  countryCodes,
  experienceOptions,
  initialForm,
  validateEnquiry,
  enquiryToWhatsappText,
} from '../utils/validation.js';

function Field({ id, label, error, required, hint, children }) {
  return (
    <div className={`field ${error ? 'field--error' : ''}`}>
      <label htmlFor={id}>
        {label} {required && <span className="req" aria-hidden="true">*</span>}
      </label>
      {children}
      {hint && !error && <p className="field__hint">{hint}</p>}
      {error && (
        <p className="field__error" id={`${id}-error`} role="alert">
          <AlertCircle size={14} aria-hidden="true" /> {error}
        </p>
      )}
    </div>
  );
}

export default function Enquiry() {
  const { selectedPlan } = useEnquiry();
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [serverMessage, setServerMessage] = useState('');
  const startedAt = useRef(Date.now());
  const formRef = useRef(null);

  useEffect(() => {
    if (selectedPlan) setValues((v) => ({ ...v, plan: selectedPlan }));
  }, [selectedPlan]);

  const update = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((v) => ({ ...v, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const aria = (name) => ({
    'aria-invalid': errors[name] ? 'true' : 'false',
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  });

  const focusFirstError = (errs) => {
    const first = Object.keys(errs)[0];
    if (first) formRef.current?.querySelector(`[name="${first}"]`)?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }

    setStatus('submitting');
    setServerMessage('');
    try {
      const res = await fetch(`${siteConfig.apiBaseUrl}/api/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, elapsedMs: Date.now() - startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        if (data.errors) setErrors(data.errors);
        throw new Error(data.message || 'We could not submit your enquiry right now.');
      }
      setStatus('success');
      setServerMessage(data.message || 'Thank you! Your enquiry has been received.');
    } catch (err) {
      setStatus('error');
      setServerMessage(
        err instanceof TypeError
          ? 'We could not reach our server. Please check your connection, or send your enquiry on WhatsApp instead.'
          : err.message
      );
    }
  };

  const sendOnWhatsapp = () => {
    const errs = validateEnquiry(values);
    setErrors(errs);
    if (Object.keys(errs).length) {
      focusFirstError(errs);
      return;
    }
    window.open(whatsappLink(enquiryToWhatsappText(values)), '_blank', 'noopener,noreferrer');
  };

  const resetForm = () => {
    setValues(initialForm);
    setErrors({});
    setStatus('idle');
    setServerMessage('');
    startedAt.current = Date.now();
  };

  const lowExperience = values.experience === 'Less than 2 years';

  return (
    <section id="enquiry" className="section section--dark section--enquiry" aria-labelledby="enquiry-title">
      <div className="container enquiry">
        <div id="contact" className="enquiry__side reveal">
          <p className="eyebrow eyebrow--light">Enquiry &amp; registration</p>
          <h2 id="enquiry-title">Take the first step towards an ITGC career</h2>
          <p className="enquiry__lead">
            Share a few details and our team will get back to you with course details, fee plans, upcoming batch dates
            and the registration process.
          </p>

          <ul className="contact-list">
            <li>
              <a className="contact-item" href={`tel:${siteConfig.phoneLink}`}>
                <span className="contact-item__icon"><Phone size={20} aria-hidden="true" /></span>
                <span>
                  <small>Call us</small>
                  {siteConfig.phoneDisplay}
                </span>
              </a>
            </li>
            <li>
              <a className="contact-item contact-item--wa" href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <span className="contact-item__icon"><WhatsAppIcon size={20} /></span>
                <span>
                  <small>WhatsApp</small>
                  Chat with our team
                </span>
              </a>
            </li>
            {siteConfig.email && (
              <li>
                <a className="contact-item" href={`mailto:${siteConfig.email}`}>
                  <span className="contact-item__icon"><Mail size={20} aria-hidden="true" /></span>
                  <span>
                    <small>Email</small>
                    {siteConfig.email}
                  </span>
                </a>
              </li>
            )}
            {siteConfig.address && (
              <li>
                <div className="contact-item">
                  <span className="contact-item__icon"><MapPin size={20} aria-hidden="true" /></span>
                  <span>
                    <small>Address</small>
                    {siteConfig.address}
                  </span>
                </div>
              </li>
            )}
          </ul>
        </div>

        <div className="form-card reveal">
          {status === 'success' ? (
            <div className="form-result form-result--success" role="status">
              <CheckCircle2 size={48} aria-hidden="true" />
              <h3>Enquiry received</h3>
              <p>{serverMessage}</p>
              <p className="muted">For a faster response, you can also message us on WhatsApp.</p>
              <div className="form-result__actions">
                <a className="btn btn--wa" href={whatsappLink(enquiryToWhatsappText(values))} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon size={18} /> Continue on WhatsApp
                </a>
                <button className="btn btn--outline" onClick={resetForm}>Submit another enquiry</button>
              </div>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit} noValidate aria-describedby="form-note">
              <h3 className="form-card__title">Course enquiry form</h3>

              <div className="form-grid">
                <Field id="fullName" label="Full name" required error={errors.fullName}>
                  <input id="fullName" name="fullName" type="text" autoComplete="name" value={values.fullName} onChange={update} {...aria('fullName')} />
                </Field>

                <Field id="mobile" label="Mobile number" required error={errors.mobile}>
                  <div className="phone-input">
                    <select name="countryCode" aria-label="Country code" value={values.countryCode} onChange={update}>
                      {countryCodes.map((c) => (
                        <option key={c.code} value={c.code}>{c.code}</option>
                      ))}
                    </select>
                    <input id="mobile" name="mobile" type="tel" inputMode="numeric" autoComplete="tel-national" placeholder="10-digit number" value={values.mobile} onChange={update} {...aria('mobile')} />
                  </div>
                </Field>

                <Field id="email" label="Email address" required error={errors.email}>
                  <input id="email" name="email" type="email" autoComplete="email" value={values.email} onChange={update} {...aria('email')} />
                </Field>

                <Field id="currentRole" label="Current job role" required error={errors.currentRole}>
                  <input id="currentRole" name="currentRole" type="text" autoComplete="organization-title" placeholder="e.g. Accounts Executive" value={values.currentRole} onChange={update} {...aria('currentRole')} />
                </Field>

                <Field id="experience" label="Total work experience" required error={errors.experience}>
                  <select id="experience" name="experience" value={values.experience} onChange={update} {...aria('experience')}>
                    <option value="">Select experience</option>
                    {experienceOptions.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </Field>

                <Field id="plan" label="Preferred fee plan" error={errors.plan}>
                  <select id="plan" name="plan" value={values.plan} onChange={update}>
                    <option value="">Not sure yet</option>
                    {plans.map((p) => (
                      <option key={p.id} value={p.name}>{p.name}</option>
                    ))}
                  </select>
                </Field>
              </div>

              {lowExperience && (
                <p className="note note--info">
                  <Info size={16} aria-hidden="true" /> The program is designed for professionals with 2+ years of
                  experience. You are still welcome to enquire — our team will advise you.
                </p>
              )}

              <fieldset className={`field ${errors.background ? 'field--error' : ''}`}>
                <legend>Background <span className="req" aria-hidden="true">*</span></legend>
                <div className="radio-group">
                  {['Technical', 'Non-technical'].map((opt) => (
                    <label key={opt} className={`radio ${values.background === opt ? 'is-checked' : ''}`}>
                      <input type="radio" name="background" value={opt} checked={values.background === opt} onChange={update} />
                      {opt}
                    </label>
                  ))}
                </div>
                {errors.background && (
                  <p className="field__error" id="background-error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" /> {errors.background}
                  </p>
                )}
              </fieldset>

              <Field id="message" label="Questions or additional information" error={errors.message} hint={`${values.message.length}/1000`}>
                <textarea id="message" name="message" rows={4} value={values.message} onChange={update} {...aria('message')} />
              </Field>

              {/* Honeypot field for spam bots — hidden from people and screen readers */}
              <div className="hp" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={update} />
              </div>

              <div className={`field ${errors.consent ? 'field--error' : ''}`}>
                <label className="checkbox">
                  <input type="checkbox" name="consent" checked={values.consent} onChange={update} {...aria('consent')} />
                  <span>I agree to be contacted by {siteConfig.instituteName} by phone, WhatsApp or email about this enquiry.</span>
                </label>
                {errors.consent && (
                  <p className="field__error" id="consent-error" role="alert">
                    <AlertCircle size={14} aria-hidden="true" /> {errors.consent}
                  </p>
                )}
              </div>

              {status === 'error' && (
                <div className="form-result form-result--error" role="alert">
                  <AlertCircle size={20} aria-hidden="true" />
                  <div>
                    <p>{serverMessage}</p>
                    <button type="button" className="btn btn--wa btn--sm" onClick={sendOnWhatsapp}>
                      <WhatsAppIcon size={16} /> Send these details on WhatsApp
                    </button>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <button type="submit" className="btn btn--primary btn--lg" disabled={status === 'submitting'}>
                  {status === 'submitting' ? (
                    <><Loader2 size={18} className="spin" aria-hidden="true" /> Submitting…</>
                  ) : (
                    <><Send size={18} aria-hidden="true" /> Submit Enquiry</>
                  )}
                </button>
                <button type="button" className="btn btn--wa btn--lg" onClick={sendOnWhatsapp}>
                  <WhatsAppIcon size={18} /> Send via WhatsApp
                </button>
              </div>
              <p id="form-note" className="form-note">
                Fields marked <span className="req">*</span> are required. Your details are used only to respond to
                your enquiry.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
