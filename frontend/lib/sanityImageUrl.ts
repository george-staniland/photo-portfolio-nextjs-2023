export const DEFAULT_QUALITY = 90;

/** Candidate widths for responsive srcSets. */
export const SRC_SET_WIDTHS = [640, 960, 1280, 1600, 2000, 2560, 3200];

/** Sized Sanity CDN URL. `fit=max` never upscales; `auto=format` serves WebP where supported. */
export function sanityUrl(url: string, width: number, quality: number = DEFAULT_QUALITY): string {
  return `${url}?w=${width}&q=${quality}&fit=max&auto=format`;
}

/**
 * Builds a `srcSet` straight against cdn.sanity.io. Widths larger than the original
 * are collapsed into a single entry at the original width.
 */
export function sanitySrcSet(
  url: string,
  originalWidth?: number,
  quality: number = DEFAULT_QUALITY,
  widths: number[] = SRC_SET_WIDTHS,
): string {
  const usable = originalWidth ? widths.filter((w) => w < originalWidth) : widths;
  const all = originalWidth ? [...usable, originalWidth] : usable;
  return all.map((w) => `${sanityUrl(url, w, quality)} ${w}w`).join(', ');
}
