import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const useMediaQuery = (
  query: string,
  setIsMobile: Dispatch<SetStateAction<boolean>>
) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);

    if (matches === true) setIsMobile(true);
    else setIsMobile(false);

    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    const listener = () => setMatches(media.matches);

    window.addEventListener("resize", listener);

    return () => window.removeEventListener("resize", listener);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches, query]);

  return matches;
};
