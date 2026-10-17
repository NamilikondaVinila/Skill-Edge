import { useCallback, useState } from 'react';
import { EnquiryContext } from './components/EnquiryContext.js';
import { useReveal } from './utils/useReveal.js';

import AnnouncementBar from './components/AnnouncementBar.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import FloatingWhatsApp from './components/FloatingWhatsApp.jsx';

import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import CourseOverview from './sections/CourseOverview.jsx';
import Curriculum from './sections/Curriculum.jsx';
import WhyChoose from './sections/WhyChoose.jsx';
import SuccessStories from './sections/SuccessStories.jsx';
import Pricing from './sections/Pricing.jsx';
import Careers from './sections/Careers.jsx';
import Salary from './sections/Salary.jsx';
import Eligibility from './sections/Eligibility.jsx';
import Batches from './sections/Batches.jsx';
import FAQ from './sections/FAQ.jsx';
import Enquiry from './sections/Enquiry.jsx';

export default function App() {
  const [selectedPlan, setSelectedPlan] = useState('');
  useReveal();

  // Any "Enquire" button can call this to jump to the form (optionally preselecting a plan).
  const goToEnquiry = useCallback((plan) => {
    if (plan) setSelectedPlan(plan);
    document.getElementById('enquiry')?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => document.getElementById('fullName')?.focus({ preventScroll: true }), 700);
  }, []);

  return (
    <EnquiryContext.Provider value={{ selectedPlan, setSelectedPlan, goToEnquiry }}>
      <a className="skip-link" href="#main">Skip to content</a>
      <AnnouncementBar />
      <Header />
      <main id="main">
        <Hero />
        <About />
        <CourseOverview />
        <Curriculum />
        <WhyChoose />
        <SuccessStories />
        <Pricing />
        <Careers />
        <Salary />
        <Eligibility />
        <Batches />
        <FAQ />
        <Enquiry />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </EnquiryContext.Provider>
  );
}
