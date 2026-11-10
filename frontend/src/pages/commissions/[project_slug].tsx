import React from 'react';
import { Box, styled, useMediaQuery, useTheme } from "@mui/material"
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import ScrollProgress from 'components/ScrollProgress';
import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/image';
import { SanityImage } from 'models/models';

//To Do: Both dynamic routes should use the same components

const ImageContainer = styled(Box, {
    label: 'project-img-container',
})(({ theme }) => ({
    width: '100%',
    overflow: 'hidden',
    marginBottom: '12vh',
    padding: '0 10px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        minHeight: '700px',
        padding: '0 18px',
        height: '81vh',
        marginBottom: '100px',
    },
}));

const ImageContainerFirstImage = styled(ImageContainer, {
    label: 'first',
})(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        marginBottom: '42px',
    },
}));

interface ImgProps {
    image: SanityImage;
    index: number;
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

const ProjectSingleImage = (props: ImgProps) => {
    const { image, index } = props;
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));
    const imageUrl = urlFor(image).quality(100).url();

    return (
        <>
            {index === 0 ?
                <ImageContainerFirstImage>
                    <Box sx={{ position: 'relative', width: '100%', ...(isTablet ? { height: '100%' } : { aspectRatio: '4/3' }) }}>
                        <Image
                            src={imageUrl}
                            alt="test"
                            fill
                            sizes={isTablet ? "(max-width: 1200px) 70vw, 97vw" : "100vw"}
                            placeholder="blur"
                            blurDataURL={image.asset.metadata.lqip}
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                </ImageContainerFirstImage>
                :
                <ImageContainer>
                    <Box sx={{ position: 'relative', width: '100%', ...(isTablet ? { height: '100%' } : { aspectRatio: '4/3' }) }}>
                        <Image
                            src={imageUrl}
                            alt="test"
                            fill
                            sizes={isTablet ? "(max-width: 1200px) 70vw, 97vw" : "100vw"}
                            placeholder="blur"
                            blurDataURL={image.asset.metadata.lqip}
                            style={{ objectFit: 'contain' }}
                        />
                    </Box>
                </ImageContainer>
            }
        </>
    )
}

interface Props {
    project: {
        images: SanityImage[];
    }
}

const Project = (props: Props) => {
    const { project } = props;
    const { images } = project;
    return (
        <>
            <ScrollProgress>
                <Navbar />
                <Box marginTop="120px" marginBottom={{ xs: "30px", md: "120px" }}>
                    {images.map((image, index) => <ProjectSingleImage image={image} key={index} index={index} />)}
                </Box>
                <Footer showButton={false} showBackButton={true} linkTitle='back to commissions' backLink='/commissions' />
            </ScrollProgress>
        </>
    )
}

interface ProjectContext {
    params: {
        project_slug: string;
    }
}

export async function getStaticProps(context: ProjectContext) {
    const { params } = context;
    const { project_slug } = params;

    const data = await client.fetch(`*[_type == "projects" && project_slug.current == "${project_slug}"]{images[]{ ..., asset->{ ..., metadata } }}`);
    const project = data[0];

    return {
        props: {
            project,
        },
    }
}

export const getStaticPaths = async () => ({
    paths: [],
    fallback: 'blocking',
});

export default Project

