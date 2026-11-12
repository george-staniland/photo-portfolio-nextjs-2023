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
export interface GalleryImage {
    url: string;
    lqip: string;
    width: number;
    height: number;
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
