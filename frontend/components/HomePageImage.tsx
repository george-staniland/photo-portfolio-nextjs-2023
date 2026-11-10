import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity';
import { sanityImageLoader } from 'lib/sanityImageLoader';
import { useHover } from '@use-gesture/react';
import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import Missing from '../public/assets/missing.png';
import { SanityImage } from 'models/models';

const client = createClient({
    projectId: 'nimz3ndn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
});

const ImageContainer = styled(Box, {
    label: 'image-container',
})(({ theme }) => ({
    position: 'relative',
    flexGrow: '1',
}));

interface HomePageImageProps {
    setMetaData: React.Dispatch<React.SetStateAction<{}>>;
    setMetaVisible: React.Dispatch<React.SetStateAction<boolean>>;
    objectFit?: React.CSSProperties['objectFit'];
    objectPosition?: React.CSSProperties['objectPosition'];
    sizes?: string;
    priority?: boolean;
    paddingTop?: string;
    imageData: {
        altText?: string;
        imageMetaData?: {};
        image?: SanityImage,
    },
    title?: string;
}

export default function HomePageImage(homePageImageProps: HomePageImageProps) {


    const {
        objectFit = "contain",
        objectPosition = "center",
        priority = false,
        sizes = "(max-width: 768px) 100vw, (max-width: 1800px) 60vw, 47vw",
        paddingTop = "",
        setMetaData,
        setMetaVisible,
        imageData
    } = homePageImageProps;

    const theme = useTheme();
    const isXLarge = useMediaQuery(theme.breakpoints.up('xxl'));

    const { image, imageMetaData, altText = '' } = imageData;

    const bind = useHover(({ args, hovering }) => {
        setMetaData(args[0]);
        setMetaVisible(hovering ? true : false);
    });

    const builder = imageUrlBuilder(client);

    function urlFor(source: SanityImage) {
        return builder.image(source);
    }

    return (
        <ImageContainer {...bind(imageMetaData)} paddingTop={paddingTop}>

            <Image
                loader={image ? sanityImageLoader : undefined}
                src={image ? urlFor(image).url() : Missing}
                alt={altText}
                fill
                priority={priority}
                quality={100}
                style={{
                    objectFit: objectFit,
                    objectPosition: isXLarge ? "center" : objectPosition,
                }}
                sizes={sizes}
            />
        </ImageContainer>
    )
}