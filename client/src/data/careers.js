/**
 * CAREER ROLES + SALARY INFORMATION
 *
 * SALARY FIGURES ARE HIDDEN BY DEFAULT (`publishSalaryFigures: false`).
 * The ranges below were taken from the institute's promotional poster and
 * have NOT been verified against current market sources. Before switching
 * the flag to `true`, check each figure against reliable, recent sources
 * (salary surveys, job portals) and update the `source` text.
 */

export const careerRoles = [
  {
    title: 'ITGC Analyst',
    description: 'Tests IT general controls such as user access, change management and IT operations, and documents the results for audit teams.',
  },
  {
    title: 'IT Auditor',
    description: 'Plans and performs audits of IT systems and processes, evaluates controls and reports observations to management.',
  },
  {
    title: 'IT Risk and Controls Analyst',
    description: 'Identifies technology risks, maps them to controls and helps business teams monitor and improve those controls.',
  },
  {
    title: 'Technology Risk Consultant',
    description: 'Advises client organisations on IT risk, control design and audit readiness, often within consulting or advisory firms.',
  },
  {
    title: 'IT Compliance Analyst',
    description: 'Helps the organisation meet internal policies and external requirements by tracking controls, evidence and remediation.',
  },
  {
    title: 'IT Audit Associate',
    description: 'Supports senior auditors with walkthroughs, evidence collection, sample testing and workpaper documentation.',
  },
];

export const publishSalaryFigures = false;

export const salarySource = 'Source to be added before publishing (e.g. salary survey name and year).';

export const salaryFallbackMessage =
  'Compensation varies by experience, organization, role, and location. Contact us to learn more about relevant career paths.';

export const salaryProgression = [
  { role: 'ITGC Analyst / IT Auditor', experience: '0 – 2 years', range: '₹4 – ₹11 LPA', next: 'Senior Analyst' },
  { role: 'Senior Analyst', experience: '2 – 4 years', range: '₹7 – ₹13 LPA', next: 'Consultant / Senior Associate' },
  { role: 'Consultant / Senior Associate', experience: '3 – 5 years', range: '₹8 – ₹18 LPA', next: 'Assistant Manager / Manager' },
  { role: 'Assistant Manager / Manager', experience: '5 – 8 years', range: '₹18 – ₹30 LPA', next: 'Senior Manager / Director' },
  { role: 'Senior Manager / Director', experience: '8 – 12 years', range: '₹30 – ₹70 LPA', next: 'Partner / Principal' },
  { role: 'Partner / Principal', experience: '15+ years', range: '₹70 LPA+', next: 'Leadership' },
];
