import React from 'react';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { SanityImage } from 'models/models';

const MobileGalleryContainer = styled(Box, {
    label: 'homepage-gallery-container-mobile',
})(({ theme }) => ({
    padding: "0",
    marginTop: "110px",
    marginBottom: "100px",
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

const ImageWrap = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '40px',
    padding: '0 11px'
}));


interface Props {
    gallery: {
        images: {
            image: SanityImage;
        }[],
    };
}

export default function MobileHomePageGallery(props: Props) {
    const { gallery } = props;

    return (
        <MobileGallery gallery={gallery} />
    );
}


const MobileGallery = (props: Props) => {
    const { gallery } = props;
    const { images } = gallery;

    return (
        <MobileGalleryContainer>
            <ImageWrap>
                <MobileImage height="auto" width="92%" image={images[4].image} priority title="garden" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="90%" image={images[3].image} priority title="door" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="90%" image={images[2].image} title="castelhill" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="96%" image={images[0].image} title="jono" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="87%" image={images[1].image} title="ehan" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="90%" image={images[5].image} title="ampm-shoes" />
            </ImageWrap>
            <ImageWrap >
                <MobileImage height="auto" width="80%" image={images[6].image} title="blackcat" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="98%" image={images[8].image} title="flowerbed" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="99%" image={images[7].image} title="eves" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="100%" image={images[9].image} title="bottle" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="80%" image={images[10].image} title="carpark" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="96%" image={images[11].image} title="grannys" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="90%" image={images[12].image} title="xander" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="100%" image={images[14].image} title="orari" />
            </ImageWrap>
            <ImageWrap>
                <MobileImage height="auto" width="80%" image={images[13].image} title="single-flower" />
            </ImageWrap>

        </MobileGalleryContainer >
    )
}

interface MobileImageProps {
    width: string;
    height: string;
    image: SanityImage;
    title?: string;
    priority?: boolean;
}

const client = createClient({
    projectId: 'nimz3ndn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
});

const builder = imageUrlBuilder(client);

function urlFor(source: SanityImage) {
    return builder.image(source);
}

const MobileImage = (props: MobileImageProps) => {
    const { image, width, height, priority = false } = props;
    return (
        <Box sx={{ position: 'relative', width: '100%', aspectRatio: '4/3' }}>
            <Image
                src={urlFor(image).quality(100).url()}
                alt="image on gs website"
                fill
                sizes="100vw"
                priority={priority}
                placeholder="blur"
                blurDataURL={image.asset.metadata.lqip}
                style={{ objectFit: 'contain' }}
            />
        </Box>
    );
};