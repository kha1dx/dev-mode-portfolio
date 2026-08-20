import { useEffect } from 'react';

/**
 * Keeps --app-height equal to the *visible* viewport.
 *
 * Two problems this solves on phones:
 *  - 100vh includes the browser's collapsing chrome, so a 100vh app is taller
 *    than the screen and its bottom row sits off-screen.
 *  - When the on-screen keyboard opens, window.innerHeight does not change on
 *    iOS. visualViewport.height does, so the chat composer would otherwise be
 *    hidden behind the keyboard.
 */
const useAppHeight = () => {
  useEffect(() => {
    const vv = window.visualViewport;

    const setAppHeight = () => {
      const h = vv?.height ?? window.innerHeight;
      document.documentElement.style.setProperty('--app-height', `${Math.round(h)}px`);
    };

    setAppHeight();

    // Named handlers so they can actually be removed again.
    const onResize = () => setAppHeight();
    const onOrientation = () => window.setTimeout(setAppHeight, 120);

    vv?.addEventListener('resize', onResize);
    vv?.addEventListener('scroll', onResize);
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onOrientation);

    return () => {
      vv?.removeEventListener('resize', onResize);
      vv?.removeEventListener('scroll', onResize);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onOrientation);
    };
  }, []);
};

export default useAppHeight;
