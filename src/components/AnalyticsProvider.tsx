import { useEffect, createContext, useContext, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '@/hooks/useAnalytics';

const AnalyticsContext = createContext<ReturnType<typeof useAnalytics> | null>(null);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider = ({ children }: AnalyticsProviderProps) => {
  const analytics = useAnalytics();
  const location = useLocation();

  useEffect(() => {
    analytics.trackPageView(location.pathname);
  }, [location.pathname, analytics]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      analytics.trackTimeSpent(location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname, analytics]);

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalyticsContext = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalyticsContext must be used within an AnalyticsProvider');
  }
  return context;
};