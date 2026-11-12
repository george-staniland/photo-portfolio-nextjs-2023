export interface SanityImage {
    _key: string;
    asset: {
        _ref: string;
        _id: string;
        metadata: {
            lqip: string;
        }
    }
}

/** Flat image shape projected by the homepage GROQ query. */
export interface GalleryImagePalette {
    /** Hex background colour of Sanity's "dominant" swatch. */
    dominant: string | null;
    /** Hex background colour of Sanity's "lightMuted" swatch. */
    lightMuted: string | null;
}

export interface GalleryImage {
    url: string;
    lqip: string;
    width: number;
    height: number;
    /** Only projected by the homepage query. */
    palette?: GalleryImagePalette;
}

export interface ProjectData {
    project_title?: string;
    images: (GalleryImage | null)[];
}

export interface GalleryEntry {
    altText?: string;
    imageMetaData?: {
        imageTitle?: string;
        seriesOrClient?: string;
        date?: string;
    };
    image?: GalleryImage;
}

export interface HomeGallery {
    images: GalleryEntry[];
}
