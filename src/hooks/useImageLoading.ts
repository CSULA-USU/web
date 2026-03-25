import { useEffect, useState } from 'react';

export function useImageLoading(src: string) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const img = new window.Image();
    img.src = src;

    if (img.complete) {
      if (isMounted) setLoading(false);
      return;
    }

    img.onload = () => {
      if (isMounted) setLoading(false);
    };

    img.onerror = () => {
      if (isMounted) setLoading(false);
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return loading;
}
