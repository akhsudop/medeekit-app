import { useEffect, useState } from "react";

const useDebounce = (val, delay) => {
  const [debouncedVal, setDebouncedVal] = useState(val);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedVal(val);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [val, delay]);

  return debouncedVal;
};

export default useDebounce;
