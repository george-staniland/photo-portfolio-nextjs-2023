import React from 'react';
import { Box, styled, useTheme, useMediaQuery } from '@mui/material';
import HomePageImage from './HomePageImage';
import { HomeGallery } from 'models/models';

const GalleryContainer = styled(Box, {
    label: 'homepage-gallery-container',
})(({ theme }) => ({
    padding: "0 8px",
    marginTop: "110px",
    minHeight: '300px',
    [theme.breakpoints.up('sm')]: {
        padding: "0 60px 0 30px",
        marginTop: "150px",
    },
    // Mobile gallery is shown below `md`; keep this one out of the layout (and out of lazy image loading).
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

const GallerySection = styled(Box, {
    label: 'gallery-section',
})(({ theme }) => ({
    display: 'grid',
    minHeight: '650px',
    height: '100vh',
    overflow: 'hidden',
    gridTemplateColumns: '1fr',
    gap: '20px',
    [theme.breakpoints.up('sm')]: {
        height: 'unset',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridAutoRows: 'clamp(400px, 40vh, 3000px)',
        gap: '40px',
    },
    [theme.breakpoints.up('xl')]: {
        gridAutoRows: 'clamp(400px, 60vh, 3000px)',
    },
}));

const GallerySection1Flex = styled(Box)(({ theme }) => ({
    display: 'flex',
}));

const GallerySection2 = styled(GallerySection)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        columnGap: '40px',
        rowGap: '60px'
    },
}));

const GallerySection3 = styled(GallerySection)(({ theme }) => ({
    [theme.breakpoints.up('xl')]: {
        gridAutoRows: 'clamp(400px, 85vh, 3000px)',
    },
}));

const GallerySection5 = styled(GallerySection)(({ theme }) => ({
    [theme.breakpoints.up('xl')]: {
        gridAutoRows: 'clamp(400px, 68vh, 3000px)',
    },
}));

const SectionChild = styled(Box, {
    label: 'section-child',
})(({ theme }) => ({
    position: 'relative',
    display: 'flex',
    overflow: 'hidden',
}));

const Section4Child1 = styled(SectionChild)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        gridRowStart: '1',
        gridRowEnd: '3',
        gridColumnStart: '1',
    },
}));

const Section5Child2 = styled(SectionChild)(({ theme }) => ({
    [theme.breakpoints.up('sm')]: {
        gridRowStart: '1',
        gridRowEnd: '3',
        gridColumnStart: '2',
    },
}));

interface Props {
    setMetaData: React.Dispatch<React.SetStateAction<{}>>;
    setMetaVisible: React.Dispatch<React.SetStateAction<boolean>>;
    gallery: HomeGallery;
}

export default function HomePageGallery(props: Props) {
    const { setMetaData, setMetaVisible, gallery } = props;

    return (
        <DesktopGallery gallery={gallery} setMetaData={setMetaData} setMetaVisible={setMetaVisible} />
    );
}

const DesktopGallery = (props: Props) => {
    const { gallery, setMetaData, setMetaVisible } = props;
    const { images } = gallery;
    return (
        <GalleryContainer >
            <GallerySection1Flex >
                <Box
                    width="50%"
                    display="flex"
                    alignItems="center"
                    flexDirection="column"
                >
                    <Box
                        minHeight={{ xs: "300px", xl: "610px" }}
                        paddingRight={{ xs: "15px", xl: "0" }}
                        width="100%"
                        display="flex"
                    >
                        <HomePageImage
                            title="jono in field"
                            imageData={images[0]}
                            setMetaData={setMetaData}
                            setMetaVisible={setMetaVisible}
                            sizes="(max-width: 768px) 100vw, 50vw"
                            paddingTop='85.7%'
                            priority
                        />
                    </Box>
                    <Box
                        height={{ xs: "40vh", xl: "65vh" }}
                        minHeight={{ xs: "300px", xl: "550px" }}
                        marginTop={{ xs: "50px", lg: '10px', xl: "8vh" }}
                        width="88%"
                        display="flex"
                    >
                        <HomePageImage
                            title="castlehill"
                            imageData={images[2]}
                            setMetaData={setMetaData}
                            setMetaVisible={setMetaVisible}
                            sizes="(max-width: 768px) 100vw, 45vw"
                        />
                    </Box>
                </Box>
                <Box width="50%" paddingTop="20%" paddingLeft={{ xs: '20px', xl: '4vw' }} >
                    <Box
                        height={{ xs: "50vh", md: '61vh', xl: "80vh" }}
                        minHeight={{ xs: "300px", xl: "550px" }}
                        display="flex"
                    >
                        <HomePageImage
                            title="eugene"
                            imageData={images[1]}
                            setMetaData={setMetaData}
                            setMetaVisible={setMetaVisible}
                            sizes="(max-width: 768px) 100vw, 40vw"
                            objectPosition="right"
                            priority
                        />
                    </Box>
                </Box>
            </GallerySection1Flex>
            <GallerySection2>
                <SectionChild padding="7% 0 0% 24%">
                    <HomePageImage
                        title="nicholson st door"
                        imageData={images[3]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        objectPosition="left"
                        sizes="(max-width: 768px) 100vw, 36vw"
                    />
                </SectionChild>
                <SectionChild padding="4% 0">
                    <HomePageImage
                        title="toni in garden"
                        imageData={images[4]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        sizes="(max-width: 768px) 100vw, 51vw"
                    />
                </SectionChild>
                <SectionChild paddingLeft="28%">
                    <HomePageImage
                        title="goodsport shoes"
                        imageData={images[5]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        sizes="(max-width: 768px) 100vw, 45vw"
                    />
                </SectionChild>
                <SectionChild padding="1% 25% 20%">
                    <HomePageImage
                        title="Blackcat"
                        imageData={images[6]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </SectionChild>
            </GallerySection2>
            <GallerySection3>
                <SectionChild padding={{ xs: '16% 10% 0 0', xl: '30% 10% 0 0' }}>
                    <HomePageImage
                        title="Eve's fireplace"
                        imageData={images[7]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        objectPosition="right"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </SectionChild>
                <SectionChild padding="0 6%">
                    <HomePageImage
                        title="Flowerbed"
                        imageData={images[8]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        objectPosition="top"
                        sizes="(max-width: 768px) 100vw, 55vw"
                    />
                </SectionChild>
            </GallerySection3>
            <GallerySection marginTop="-7vh">
                <Section4Child1 paddingLeft="10%">
                    <HomePageImage
                        title="Goodsport carpark"
                        imageData={images[10]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        sizes="(max-width: 768px) 100vw, 55vw"
                    />
                </Section4Child1>
                <SectionChild padding="0 0 0 30%">
                    <HomePageImage
                        title="bottle"
                        imageData={images[9]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        objectPosition="top"
                        sizes="(max-width: 768px) 100vw, 46vw"
                    />

                </SectionChild>
                <SectionChild paddingLeft="11%">
                    <HomePageImage
                        title="grannys table"
                        imageData={images[11]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                </SectionChild>
            </GallerySection>
            <GallerySection5 marginBottom="160px">
                <SectionChild padding="0 5% 0 22%">
                    <HomePageImage
                        title="xander and alba"
                        imageData={images[12]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        objectPosition='top'
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />

                </SectionChild>
                <Section5Child2 padding="35% 6%">
                    <HomePageImage
                        title="Flower at parliament st"
                        imageData={images[13]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        objectPosition="top"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </Section5Child2>
                <SectionChild padding="0 2% 0 6%">
                    <HomePageImage
                        title="Orari river"
                        imageData={images[14]}
                        setMetaData={setMetaData}
                        setMetaVisible={setMetaVisible}
                        objectPosition="right"
                        sizes="(max-width: 768px) 100vw, 40vw"
                    />
                </SectionChild>
            </GallerySection5>
        </GalleryContainer >
    )
}