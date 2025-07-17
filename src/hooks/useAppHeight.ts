import { useEffect } from 'react';

export const useAppHeight = () => {
  useEffect(() => {
    const setAppHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    // Set initial height
    setAppHeight();

    // Handle resize and orientation changes
    const handleResize = () => {
      // Debounce to avoid excessive calls
      setTimeout(setAppHeight, 100);
    };

    const handleOrientationChange = () => {
      // Wait for orientation change to complete
      setTimeout(setAppHeight, 300);
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleOrientationChange);
    
    // Handle viewport changes on mobile (keyboard, address bar, etc.)
    if ('visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', setAppHeight);
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleOrientationChange);
      if ('visualViewport' in window) {
        window.visualViewport?.removeEventListener('resize', setAppHeight);
      }
    };
  }, []);
};
