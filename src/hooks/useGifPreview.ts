import { useEffect, useState } from "react";
import { gifToImage } from "@/lib/gifToImage";

export function useGifPreview(gifUrl?: string, cacheKey?: string) {
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!gifUrl) return;

    const key = cacheKey || `gif-preview:${gifUrl}`;
    const cached = localStorage.getItem(key);
    if (cached) {
      setImage(cached);
      return;
    }

    gifToImage(gifUrl)
      .then((dataUrl) => {
        localStorage.setItem(key, dataUrl);
        setImage(dataUrl);
      })
      .catch(() => setImage(gifUrl));
  }, [gifUrl, cacheKey]);

  return image;
}
