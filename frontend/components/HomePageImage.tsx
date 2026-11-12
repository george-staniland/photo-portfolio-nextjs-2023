import { useHover } from '@use-gesture/react';
import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import Missing from '../public/assets/missing.png';
import { GalleryEntry } from 'models/models';
import BlurUpImage from './BlurUpImage';

const ImageContainer = styled(Box, {
    label: 'image-container',
})(() => ({
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
    imageData: GalleryEntry;
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
        imageData,
    } = homePageImageProps;

    const theme = useTheme();
    const isXLarge = useMediaQuery(theme.breakpoints.up('xxl'));

    const { image, imageMetaData, altText = '' } = imageData;
    const position = isXLarge ? "center" : objectPosition;

    const bind = useHover(({ args, hovering }) => {
        setMetaData(args[0]);
        setMetaVisible(hovering ? true : false);
    });

    return (
        <ImageContainer {...bind(imageMetaData)} paddingTop={paddingTop}>
            {image ? (
                <BlurUpImage
                    image={image}
                    alt={altText}
                    sizes={sizes}
                    priority={priority}
                    objectFit={objectFit}
                    objectPosition={position}
                />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={Missing.src}
                    alt={altText}
                    style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit,
                        objectPosition: position,
                    }}
                />
            )}
        </ImageContainer>
    )
}
