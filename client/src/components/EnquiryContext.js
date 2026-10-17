import { createContext, useContext } from 'react';

export const EnquiryContext = createContext({
  selectedPlan: '',
  setSelectedPlan: () => {},
  goToEnquiry: () => {},
});

export const useEnquiry = () => useContext(EnquiryContext);
