import { useEffect, useMemo, startTransition } from "react";
import debounce from "lodash.debounce";

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const useDebouncedSearch = (callback: (newSearch: string) => void) => {
  const onSearchDebounced = useMemo(
    () =>
      debounce((newSearch: string) => {
        scrollToTop();
        startTransition(() => {
          callback(newSearch);
        });
      }, 300),
    [callback]
  );

  useEffect(() => {
    return () => {
      onSearchDebounced.cancel();
    };
  }, [onSearchDebounced]);

  return onSearchDebounced;
};

export { useDebouncedSearch };
