import { useEffect, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';

const generateSessionId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

const getDeviceType = () => {
  const userAgent = navigator.userAgent;
  if (/tablet|ipad|playbook|silk/i.test(userAgent)) return 'tablet';
  if (/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile/i.test(userAgent)) return 'mobile';
  return 'desktop';
};

export const useAnalytics = () => {
  const sessionId = useRef(sessionStorage.getItem('portfolio_session') || generateSessionId());
  const startTime = useRef(Date.now());

  useEffect(() => {
    if (!sessionStorage.getItem('portfolio_session')) {
      sessionStorage.setItem('portfolio_session', sessionId.current);
    }
  }, []);

  const trackPageView = async (pagePath: string, pageTitle?: string) => {
    try {
      await supabase.functions.invoke('track-analytics', {
        body: {
          sessionId: sessionId.current,
          pagePath,
          pageTitle: pageTitle || document.title,
          referrer: document.referrer,
          userAgent: navigator.userAgent,
          deviceType: getDeviceType()
        }
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const trackTimeSpent = async (pagePath: string) => {
    const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
    try {
      await supabase.functions.invoke('track-analytics', {
        body: {
          sessionId: sessionId.current,
          pagePath,
          timeSpent,
          exitPage: true,
          userAgent: navigator.userAgent,
          deviceType: getDeviceType()
        }
      });
    } catch (error) {
      console.error('Time tracking error:', error);
    }
  };

  return { trackPageView, trackTimeSpent, sessionId: sessionId.current };
};