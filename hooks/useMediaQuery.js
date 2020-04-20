import { useEffect, useState } from "react";
import mediaQuery from "../lib/mediaQuery";

const noop = () => {};

export const useMediaQuery = (query) => {
  const matchMedia =
    globalThis.matchMedia ||
    (() => ({ addListener: noop, removeListener: noop }));

  query = matchMedia(query);

  const [matches, setMatches] = useState(query.matches);

  useEffect(() => {
    const handleMatch = (q) => setMatches(q.matches);

    query.addListener(handleMatch);

    return () => {
      query.removeListener(handleMatch);
    };
  }, [query]);

  return matches;
};

export const useScreenQuery = (cond) => {
  if (!mediaQuery[cond + `Js`]) {
    throw new TypeError(`incorrect useMediaQuery condition`);
  }

  return useMediaQuery(mediaQuery[cond + `Js`]);
};
