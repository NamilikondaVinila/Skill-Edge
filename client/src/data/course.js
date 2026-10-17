/**
 * COURSE OVERVIEW + CURRICULUM
 * The curriculum below is a PROPOSED 30-class plan built from the topic list
 * supplied by the institute. Edit module titles, class ranges and topics freely.
 * Set `curriculumConfirmed: true` once the institute has finalised it — this
 * removes the "proposed curriculum" note on the website.
 */

export const courseOverview = {
  title: 'ITGC / IT Systems Audit – Complete Training Program',
  facts: [
    { label: 'Duration', value: 'Approximately 2 months' },
    { label: 'Total classes', value: '30 structured classes' },
    { label: 'Eligibility', value: 'Professionals with 2+ years of experience (subject to the institute’s final policy)' },
    { label: 'Background', value: 'Technical and non-technical professionals' },
    // Learning format is not confirmed yet — update when decided (e.g. 'Live online via Microsoft Teams').
    { label: 'Learning format', value: 'Contact us for the current batch format' },
    { label: 'Course level', value: 'Beginner-friendly for professionals entering the ITGC domain' },
  ],
};

export const curriculumConfirmed = false;

export const curriculum = [
  {
    id: 'm1',
    title: 'Foundations of ITGC & IT Audit',
    classes: '1 – 3',
    summary: 'Build the base: what IT general controls are, why organisations are audited, and how an audit runs from start to finish.',
    topics: [
      'Introduction to ITGC and IT Systems Audit',
      'IT audit fundamentals and the audit lifecycle',
      'Where ITGC fits in financial and compliance audits',
    ],
  },
  {
    id: 'm2',
    title: 'IT General Controls & Control Objectives',
    classes: '4 – 5',
    summary: 'Understand the main ITGC domains and the control objectives auditors test against.',
    topics: [
      'IT general controls and control objectives',
      'Control design vs. operating effectiveness',
    ],
  },
  {
    id: 'm3',
    title: 'Access Management',
    classes: '6 – 11',
    summary: 'The most tested ITGC area — who gets access, how it is approved, reviewed and removed.',
    topics: [
      'User access management and access reviews',
      'Joiner, mover and leaver processes',
      'Privileged access management',
      'Segregation of duties',
    ],
  },
  {
    id: 'm4',
    title: 'Change Management Controls',
    classes: '12 – 14',
    summary: 'How changes to systems are requested, tested, approved and moved to production — and what auditors look for.',
    topics: ['Change management controls', 'Emergency changes and developer access to production'],
  },
  {
    id: 'm5',
    title: 'IT Operations',
    classes: '15 – 18',
    summary: 'Day-to-day IT processes that keep systems reliable and recoverable.',
    topics: [
      'IT operations and backup controls',
      'Job scheduling and monitoring',
      'Incident management and IT service processes',
    ],
  },
  {
    id: 'm6',
    title: 'Audit Execution & Documentation',
    classes: '19 – 24',
    summary: 'Do the work of an IT auditor: assess risk, test controls, collect evidence and write it up.',
    topics: [
      'Risk assessment and control testing',
      'Audit evidence collection and documentation',
      'Walkthroughs and audit observations',
      'Remediation tracking',
    ],
  },
  {
    id: 'm7',
    title: 'Practical Scenarios & Case Studies',
    classes: '25 – 27',
    summary: 'Apply everything to realistic audit situations and practise thinking like an auditor.',
    topics: ['Audit scenarios and practical case studies', 'Common control gaps and how they are reported'],
  },
  {
    id: 'm8',
    title: 'Interview Preparation & Career Guidance',
    classes: '28 – 30',
    summary: 'Get ready for ITGC interviews and plan your move into the domain.',
    topics: ['Interview preparation and commonly asked questions', 'Resume positioning and career guidance'],
  },
];
