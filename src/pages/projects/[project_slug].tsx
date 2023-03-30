import React from 'react';
import { Box, styled, useMediaQuery, useTheme } from "@mui/material"
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import { createClient } from 'next-sanity';
import { useNextSanityImage } from 'next-sanity-image';
import Image from 'next/image';

const ImageContainer = styled(Box, {
    label: 'project-img-container',
})(({ theme }) => ({
    height: '50vh',
    width: '100%',
    overflow: 'hidden',
    marginBottom: '35px',
    padding: '0 18px',
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.up('md')]: {
        minHeight: '700px',
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

const ProjectSingleImage = (props: ImgProps) => {
    const [isFirst, setIsFirst] = React.useState(false);
    const { image, index } = props;
    const imageProps = useNextSanityImage(client, image);
    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));

    React.useEffect(() => {
        if (index === 0) {
            setIsFirst(true);
        }
    }, [index]);

    return (
        <>
            {isFirst ?
                <ImageContainerFirstImage>
                    {isTablet ?
                        <Image
                            {...imageProps}
                            style={{ height: '100%', width: 'auto' }}
                            alt="test"
                            sizes="(max-width: 1200px) 70vw, 97vw"
                        />
                        :
                        <Image
                            {...imageProps}
                            style={{
                                height: 'auto',
                                width: '100%',
                                objectFit: 'contain',
                            }}
                            alt="test"
                            sizes="100vw"
                        />}
                </ImageContainerFirstImage>
                :
                <ImageContainer>
                    {isTablet ?
                        <Image
                            {...imageProps}
                            style={{ height: '100%', width: 'auto' }}
                            alt="test"
                            sizes="(max-width: 1200px) 70vw, 97vw"
                        />
                        :
                        <Image
                            {...imageProps}
                            style={{
                                height: 'auto',
                                width: '100%',
                                objectFit: 'contain',
                            }}
                            alt="test"
                            sizes="100vw"
                        />}
                </ImageContainer>
            }
        </>
    )
}

interface SanityImage {
    _key: string;
    asset: {
        _ref: string;
    }
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
            <Navbar />
            <Box marginTop="120px" marginBottom={{ xs: "30px", md: "120px" }}>
                {images.map((image, index) => <ProjectSingleImage image={image} key={index} index={index} />)}
            </Box>
            <Footer />
        </>
    )
}

const client = createClient({
    projectId: 'nimz3ndn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
});

interface ProjectContext {
    params: {
        project_slug: string;
    }
}

export async function getStaticProps(context: ProjectContext) {
    const { params } = context;
    const { project_slug } = params;

    const data = await client.fetch(`*[_type == "projects" && project_slug.current == "${project_slug}"]{images}`);
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

