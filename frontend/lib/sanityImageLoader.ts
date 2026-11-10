import type { ImageLoaderProps } from 'next/image';

/** Sizes Sanity CDN URLs for next/image (avoids fetching full-res through the Next optimizer). */
export function sanityImageLoader({ src, width, quality }: ImageLoaderProps): string {
  const url = new URL(src);
  url.searchParams.set('auto', 'format');
  if (!url.searchParams.has('fit')) {
    url.searchParams.set('fit', url.searchParams.has('h') ? 'min' : 'max');
  }
  if (url.searchParams.has('h') && url.searchParams.has('w')) {
    const originalHeight = parseInt(url.searchParams.get('h')!, 10);
    const originalWidth = parseInt(url.searchParams.get('w')!, 10);
    url.searchParams.set('h', Math.round((originalHeight / originalWidth) * width).toString());
  }
  url.searchParams.set('w', width.toString());
  if (quality) url.searchParams.set('q', quality.toString());
  return url.href;
}
