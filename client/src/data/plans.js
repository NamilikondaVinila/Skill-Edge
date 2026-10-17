/**
 * FEE PLANS
 * Replace `null` values with confirmed details. Anything left as `null`
 * shows "Contact us" on the website — no prices are invented.
 *
 *  fee:            e.g. '₹25,000'  (shown as the plan price)
 *  classes:        e.g. '30 live classes'
 *  resources:      e.g. 'Class recordings, notes, templates'
 *  interviewPrep:  e.g. '2 mock interviews'
 *  mentoring:      e.g. 'WhatsApp doubt-clearing group'
 *  extras:         array of strings, e.g. ['Resume review']
 *  paymentOptions: e.g. 'Full payment or 2 instalments'
 *  recommended:    set true ONLY after the institute confirms it
 */

export const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    description: 'Core ITGC training for professionals getting started.',
    fee: null,
    classes: null,
    resources: null,
    interviewPrep: null,
    mentoring: null,
    extras: [],
    paymentOptions: null,
    recommended: false,
  },
  {
    id: 'standard',
    name: 'Standard Plan',
    description: 'Training plus additional preparation support.',
    fee: null,
    classes: null,
    resources: null,
    interviewPrep: null,
    mentoring: null,
    extras: [],
    paymentOptions: null,
    recommended: false,
  },
  {
    id: 'premium',
    name: 'Premium Plan',
    description: 'The most complete level of training and guidance.',
    fee: null,
    classes: null,
    resources: null,
    interviewPrep: null,
    mentoring: null,
    extras: [],
    paymentOptions: null,
    recommended: false,
  },
];
