import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set up dynamic viewport height for mobile
const setAppHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

// Set initial height
setAppHeight();

// Handle resize and orientation changes
window.addEventListener('resize', () => {
  setTimeout(setAppHeight, 100);
});

window.addEventListener('orientationchange', () => {
  setTimeout(setAppHeight, 300);
});

// Handle viewport changes on mobile
if ('visualViewport' in window) {
  window.visualViewport?.addEventListener('resize', setAppHeight);
}

createRoot(document.getElementById("root")!).render(<App />);
