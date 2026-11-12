import React from 'react';
import Head from 'next/head';
import { GalleryImage } from 'models/models';
import { sanitySrcSet, sanityUrl } from 'lib/sanityImageUrl';

interface BlurUpImageProps {
    image: GalleryImage;
    alt?: string;
    sizes: string;
    priority?: boolean;
    objectFit?: React.CSSProperties['objectFit'];
    objectPosition?: React.CSSProperties['objectPosition'];
}

const FADE = 'opacity 500ms ease';

/**
 * Fills its (positioned) parent. Shows the inline LQIP instantly, then fades in the
 * full-quality image served directly from the Sanity CDN (no Next image optimizer/loader).
 */
export default function BlurUpImage(props: BlurUpImageProps) {
    const {
        image,
        alt = '',
        sizes,
        priority = false,
        objectFit = 'contain',
        objectPosition = 'center',
    } = props;

    const [loaded, setLoaded] = React.useState(false);

    const srcSet = sanitySrcSet(image.url, image.width);
    // Fallback src for browsers/crawlers that ignore srcSet.
    const src = sanityUrl(image.url, Math.min(image.width || 1600, 1600));

    // Covers images that finished loading before hydration attached onLoad.
    const imgRef = React.useCallback((node: HTMLImageElement | null) => {
        if (node && node.complete && node.naturalWidth > 0) setLoaded(true);
    }, []);

    const layer: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        objectFit,
        objectPosition,
    };

    return (
        <>
            {priority && (
                <Head>
                    <link
                        key={`preload-${image.url}`}
                        rel="preload"
                        as="image"
                        imageSrcSet={srcSet}
                        imageSizes={sizes}
                        fetchPriority="high"
                    />
                </Head>
            )}
            {/* Inline base64 LQIP: paints with the HTML, no network request. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={image.lqip}
                alt=""
                aria-hidden
                style={{
                    ...layer,
                    filter: 'blur(3px)',
                    opacity: loaded ? 0 : 1,
                    transition: FADE,
                    pointerEvents: 'none',
                }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                ref={imgRef}
                src={src}
                srcSet={srcSet}
                sizes={sizes}
                width={image.width}
                height={image.height}
                alt={alt}
                loading={priority ? 'eager' : 'lazy'}
                fetchPriority={priority ? 'high' : 'auto'}
                decoding="async"
                onLoad={() => setLoaded(true)}
                style={{
                    ...layer,
                    opacity: loaded ? 1 : 0,
                    transition: FADE,
                }}
            />
        </>
    );
}
