'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface IncentiveWorkspaceState {
  calculatorDraft: Record<string, string>;
  setCalculatorDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  roiInputsDraft: Record<string, string>;
  setRoiInputsDraft: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  businessId: string;
}

const IncentiveWorkspaceContext = createContext<IncentiveWorkspaceState | undefined>(undefined);

export function IncentiveWorkspaceProvider({ children, businessId }: { children: ReactNode; businessId: string }) {
  const [calculatorDraft, setCalculatorDraft] = useState<Record<string, string>>({});
  const [roiInputsDraft, setRoiInputsDraft] = useState<Record<string, string>>({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const calcKey = `incentive_calc_${businessId}`;
      const roiKey = `incentive_roi_${businessId}`;
      const savedCalc = sessionStorage.getItem(calcKey);
      const savedRoi = sessionStorage.getItem(roiKey);
      if (savedCalc) setCalculatorDraft(JSON.parse(savedCalc));
      if (savedRoi) setRoiInputsDraft(JSON.parse(savedRoi));
    } catch (e) {
      console.warn('Failed to load incentive workspace state', e);
    }
  }, [businessId]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      sessionStorage.setItem(`incentive_calc_${businessId}`, JSON.stringify(calculatorDraft));
    } catch (e) {
      // ignore
    }
  }, [calculatorDraft, businessId, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    try {
      sessionStorage.setItem(`incentive_roi_${businessId}`, JSON.stringify(roiInputsDraft));
    } catch (e) {
      // ignore
    }
  }, [roiInputsDraft, businessId, isMounted]);

  return (
    <IncentiveWorkspaceContext.Provider value={{
      calculatorDraft, setCalculatorDraft,
      roiInputsDraft, setRoiInputsDraft,
      businessId
    }}>
      {children}
    </IncentiveWorkspaceContext.Provider>
  );
}

export function useIncentiveWorkspace() {
  const ctx = useContext(IncentiveWorkspaceContext);
  if (!ctx) {
    throw new Error('useIncentiveWorkspace must be used within an IncentiveWorkspaceProvider');
  }
  return ctx;
}
