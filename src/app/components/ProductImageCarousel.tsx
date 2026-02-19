import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Props {
  images: string[];
  alt?: string;
  className?: string; // forwarded to image
  showThumbnails?: boolean; // small thumbnails under main image
  autoPlay?: boolean;
  intervalMs?: number;
  small?: boolean; // compact mode for cards
}

export default function ProductImageCarousel({
  images,
  alt = '',
  className = 'w-full h-full object-cover',
  showThumbnails = false,
  autoPlay = false,
  intervalMs = 3500,
  small = false,
}: Props) {
  // filter out empty / null entries and dedupe so carousel skips them
  // normalize (trim) and filter empty values, then dedupe exact-duplicate URLs
  const imgsClean = (images || [])
    .map((s) => (typeof s === 'string' ? s.trim() : ''))
    .filter((s) => s !== '');
  const uniqueImgs = Array.from(new Set(imgsClean));
  const imgs = uniqueImgs.length > 0 ? uniqueImgs : [''];

  const [index, setIndex] = useState(0);
  const [failedIndices, setFailedIndices] = useState<Set<number>>(new Set());
  const failedRef = useRef<Set<number>>(new Set());
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverRef = useRef(false);

  const markFailed = (i: number) => {
    setFailedIndices((prev) => {
      const next = new Set(prev);
      next.add(i);
      failedRef.current = next;
      return next;
    });
  };

  const isFailed = (i: number) => failedRef.current.has(i);

  const findNextValidIndex = (start: number) => {
    if (imgs.length === 0) return -1;
    for (let k = 0; k < imgs.length; k++) {
      const idx = (start + k) % imgs.length;
      if (!failedRef.current.has(idx)) return idx;
    }
    return -1; // all failed
  };

  const findPrevValidIndex = (start: number) => {
    if (imgs.length === 0) return -1;
    for (let k = 0; k < imgs.length; k++) {
      const idx = (start - k + imgs.length) % imgs.length;
      if (!failedRef.current.has(idx)) return idx;
    }
    return -1;
  };

  const clearIntervalRef = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const startAutoPlay = () => {
    clearIntervalRef();
    if (!autoPlay || imgs.length <= 1) return;
    intervalRef.current = setInterval(() => {
      if (!hoverRef.current) {
        setIndex((i) => {
          const next = findNextValidIndex((i + 1) % imgs.length);
          return next === -1 ? i : next;
        });
      }
    }, intervalMs);
  };

  useEffect(() => {
    startAutoPlay();
    return () => clearIntervalRef();
  }, [autoPlay, imgs.length, intervalMs]);

  // if images list shrinks / changes, make sure current index stays valid
  useEffect(() => {
    if (index >= imgs.length) setIndex(0);
  }, [imgs.length]);

  // if current image later fails, advance to next valid
  useEffect(() => {
    if (isFailed(index)) {
      const next = findNextValidIndex((index + 1) % imgs.length);
      if (next !== -1) setIndex(next);
    }
  }, [failedIndices]);

  // compute number of valid images (skip failed ones) — used to decide whether to show arrows/thumbnails
  const validIndices = imgs.map((_, i) => i).filter((i) => !isFailed(i));
  const validCount = validIndices.length;

  const restartAutoPlay = () => {
    // restart timer after a manual interaction so auto-advance happens after full interval
    if (!autoPlay || imgs.length <= 1) return;
    clearIntervalRef();
    startAutoPlay();
  };

  function prev() {
    const candidate = (index - 1 + imgs.length) % imgs.length;
    const prevIndex = isFailed(candidate) ? findPrevValidIndex(candidate) : candidate;
    if (prevIndex !== -1) setIndex(prevIndex);
    restartAutoPlay();
  }
  function next() {
    const candidate = (index + 1) % imgs.length;
    const nextIndex = isFailed(candidate) ? findNextValidIndex(candidate) : candidate;
    if (nextIndex !== -1) setIndex(nextIndex);
    restartAutoPlay();
  }

  return (
    <div
      className={`relative ${small ? 'h-full' : ''}`}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div className="relative w-full h-full overflow-hidden rounded-md">
        <ImageWithFallback src={imgs[index]} alt={alt} className={className} onError={() => markFailed(index)} />

        {validCount > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Image précédente"
              className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/60 transition-opacity ${small ? 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto p-1' : 'p-2'}`}
            >
              <ChevronLeft className={`${small ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Image suivante"
              className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white rounded-full backdrop-blur-sm hover:bg-black/60 transition-opacity ${small ? 'opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto p-1' : 'p-2'}`}
            >
              <ChevronRight className={`${small ? 'w-4 h-4' : 'w-5 h-5'}`} />
            </button>
          </>
        )}
      </div>

      {showThumbnails && validCount > 1 && (
        <div className="mt-3 flex gap-3 justify-start">
          {imgs.map((src, i) => {
            if (isFailed(i)) return null; // don't show thumbnails for failed images
            return (
              <button
                key={i}
                onClick={() => { setIndex(i); restartAutoPlay(); }}
                className={`w-16 h-12 rounded-md overflow-hidden border ${i === index ? 'ring-2 ring-slate-900' : 'border-transparent'} transition-transform ${i === index ? 'scale-105' : ''}`}
              >
                <ImageWithFallback src={src} alt={`${alt} ${i + 1}`} className="w-full h-full object-cover" onError={() => markFailed(i)} />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
