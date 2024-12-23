import * as React from 'react';

enum MediaScreen {
  MOBILE = '(min-width: 10px)',
  TABLET = '(min-width: 768px)',
  DESKTOP = '(min-width: 1024px)',
}

//? This hook is used to query matchmedia
//? args: It takes one of MediaScreen (MOBILE,TABLET,DESKTOP) as an argument
//? returns: It returns boolean according to multimedia match

const useMediaQuery = (mediaQuery: MediaScreen): boolean => {
  const [matches, setMatches] = React.useState<boolean>(false);

  function handleChange() {
    setMatches(getMatches(mediaQuery));
  }

  const getMatches = (mediaQuery: MediaScreen): boolean => {
    // Prevents SSR issues
    if (typeof window !== 'undefined') {
      return window.matchMedia(mediaQuery).matches;
    }
    return false;
  };

  React.useEffect(() => {
    const matchMedia = window.matchMedia(mediaQuery);

    // Triggered at the first client-side load and if query changes
    handleChange();

    // Listen matchMedia
    matchMedia.addEventListener('change', handleChange);

    return () => {
      matchMedia.removeEventListener('change', handleChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaQuery]);

  return matches;
};

export { MediaScreen };
export default useMediaQuery;
