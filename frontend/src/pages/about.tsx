import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Head from 'next/head';
import LinkHoverAnimation from "components/LinkHoverAnimation";
import { Box, styled, Typography, useMediaQuery, useTheme } from "@mui/material";
import Image from "next/image";
import Jono from '../../public/assets/jono.jpg';

const AboutTextContainer = styled(Box, {
    label: 'about-text-container',
})(({ theme }) => ({
    display: "flex",
    padding: "0 8px",
    marginTop: '200px',
    [theme.breakpoints.up('md')]: {
        padding: "0 60px 0 30px",
        marginTop: '240px',
    },
}));

const AboutImageContainer = styled(Box, {
    label: 'about-image-container',
})(({ theme }) => ({
    padding: "0 8px",
    overflow: 'hidden',
    margin: '30px 0 100px',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        padding: "0 60px 0 30px",
    },
}));

const LargeText = styled('a')(({ theme }) => ({
    fontFamily: '"Space Grotesk", sans-serif',
    fontSize: '18px',
    display: 'block',
    [theme.breakpoints.up('md')]: {
        fontSize: '24px',
    },
}));

const Bio = () => {
    return (
        <Typography variant="body1">George Staniland is a photographer based in Sydney, Australia. His work has been shown in galleries across New Zealand and Australia.</Typography>
    )
}

const AboutDesktop = () => {
    return (
        <>
            <AboutTextContainer >
                <Box display="flex" flexDirection="column">
                    <LinkHoverAnimation>
                        <LargeText href="tel:+62225109709">
                            +64 22 510 9709
                        </LargeText>
                    </LinkHoverAnimation>
                    <LinkHoverAnimation>
                        <LargeText
                            href="mailto:georgestaniland@gmail.com"
                            target="_blank"
                            sx={{ marginTop: '8px' }}
                        >
                            georgestaniland@gmail.com
                        </LargeText>
                    </LinkHoverAnimation>
                </Box>
                <Box maxWidth="511px" marginLeft={{ xs: '0', md: '170px' }}>
                    <Bio />
                </Box>
            </AboutTextContainer>
            <AboutImageContainer>
                <Box
                    position="relative"
                    sx={{ aspectRatio: '7/6' }}
                    maxHeight="1500px"
                    margin="0 auto"
                >
                    <Image
                        src={Jono}
                        fill
                        quality={100}
                        alt="an image on gs photo"
                        style={{
                            objectFit: 'contain',
                        }}
                        placeholder="blur"
                        sizes="91vw"
                        priority
                    />

                </Box>
            </AboutImageContainer>
        </>
    )
}

const AboutMobile = () => {
    return (

        <Box mt="120px" padding="0 8px">
            <Box paddingRight={{ xs: '4%', sm: '7%' }} >
                <Bio />
            </Box>
            <Box mt="40px">
                <Image
                    src={Jono}
                    quality={100}
                    alt="an image on gs photo"
                    style={{
                        objectFit: 'contain',
                        width: '100%',
                        height: 'auto'
                    }}
                />
            </Box>
            <Box mb="40px" mt="40px">
                <LargeText href="tel:+62225109709">
                    +64 22 510 9709
                </LargeText>
                <LargeText
                    href="mailto:georgestaniland@gmail.com"
                    target="_blank"
                    sx={{ marginTop: '8px' }}
                >
                    georgestaniland@gmail.com
                </LargeText>
            </Box>
        </Box>

    )
}

export default function About() {
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));
    return (
        <>
            <Head>
                <title>George Staniland - About</title>
                <meta name="description" content="George is focused on various long and short-term photography art projects, additionally taking on commissioned work for selected clients." />
            </Head>
            <Navbar />
            {isTablet ? <AboutDesktop /> : <AboutMobile />}
            <Footer showButton={false} />
        </>
    )
}