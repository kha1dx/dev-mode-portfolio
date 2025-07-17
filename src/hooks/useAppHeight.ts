import { useEffect } from 'react';

const useAppHeight = () => {
  useEffect(() => {
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    // Set the height on initial load
    setAppHeight();

    // Optional: Update on orientation change for mobile devices
    window.addEventListener('orientationchange', () => {
      setTimeout(setAppHeight, 100); // Small delay to ensure proper measurement
    });

    return () => {
      window.removeEventListener('orientationchange', setAppHeight);
    };
  }, []);
};

export default useAppHeight;
