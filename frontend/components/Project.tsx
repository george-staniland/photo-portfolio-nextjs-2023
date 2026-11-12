import React from "react";
import { Box, styled, Typography, useMediaQuery, useTheme } from "@mui/material"
import { useGesture } from "@use-gesture/react";
import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from 'next-sanity';
import { useSpring, animated } from "@react-spring/web";
import Missing from '../public/assets/missing.png'
import { ProjectModel } from "models/project";

const client = createClient({
    projectId: 'nimz3ndn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
});

const SingleProject = styled(Box, {
    label: 'single-project',
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column-reverse',
    padding: '0 8px',
    marginBottom: '60px',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: '30px',
    },
    [theme.breakpoints.up('md')]: {
        padding: '0 100px 0 50px',
    },
    [theme.breakpoints.up('xxl')]: {
        padding: '0 6vw 0 8vw',
    },
}));

const LeftSection = styled(Box, {
    label: 'left-section',
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        marginTop: '-2px',
    },
}));

const RightSection = styled(Box, {
    label: 'right-section',
})(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    paddingBottom: '10px',
    [theme.breakpoints.up('sm')]: {
        paddingBottom: '0',
    },
}));

interface Props {
    project: ProjectModel,
    index: number;
    projectCategory: string;
}

export default function Project(props: Props) {
    let { index } = props;
    const { project, projectCategory } = props;
    const { project_title, project_year, cover_image, description, project_slug, client_or_type } = project;
    const [isHovered, setHovered] = React.useState(false);
    const theme = useTheme();
    const smallerThanTablet = useMediaQuery(theme.breakpoints.down('lg'));
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    index = index + 1;

    const bind = useGesture({
        onHover: ({ hovering }) => {
            setHovered(hovering ?? false);
        },
    });

    const style = useSpring({
        opacity: isHovered || smallerThanTablet ? '1' : '0',
    });

    const AnimatedLeftSection = animated(LeftSection);

    const builder = imageUrlBuilder(client);

    function urlFor(source: String) {
        return builder.image(source);
    }

    return (
        <Link href={`/${projectCategory}/${project_slug.current}`}>
            <SingleProject {...bind()}>
                <AnimatedLeftSection style={style}>
                    <Box marginRight={{ xs: "0", sm: "20px", md: "80px" }} paddingBottom={{ xs: "20px", sm: "0" }} position={'relative'} >
                        <Typography variant="spaceGroteskSmall" position={'relative'} top={{ xs: "0px", md: "-3px" }} left={0} >(0{index})</Typography>
                    </Box>
                    <Box maxWidth="700px" display="flex" flexDirection="column" paddingRight={{ xs: "0", sm: "40px" }}>
                        <Typography variant="monoSmaller" paddingBottom={{ xs: "10px", sm: "50px" }} >{project_title}</Typography>
                        <Typography variant="monoSmaller">{client_or_type}</Typography>
                        <Typography variant="monoSmaller" paddingBottom={{ xs: "25px", sm: "50px" }} >{project_year}</Typography>
                        <Typography variant="monoSmaller" >{description}</Typography>
                    </Box>
                </AnimatedLeftSection>
                <RightSection >
                    {!isMobile && <Typography variant="spaceGroteskSmall" paddingBottom="6px">(0{index})</Typography>}
                    {isMobile &&
                        <Box position="relative" sx={{ aspectRatio: "7/6" }}>
                            <Image
                                src={cover_image ? urlFor(cover_image.asset._ref).quality(100).url() : Missing}
                                fill
                                alt="a photo on gs website"
                                style={{
                                    objectFit: 'cover',
                                }}
                                sizes="(max-width: 800px) 100vw, 320px"
                            />
                        </Box>
                    }
                    {!isMobile &&
                        <Box position="relative" sx={{ width: '300px', aspectRatio: '7/6' }}>
                            <Image
                                src={cover_image ? urlFor(cover_image.asset._ref).quality(85).url() : Missing}
                                alt="a photo on gs website"
                                fill
                                style={{
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                }}
                                sizes="(max-width: 600px) 100vw, 300px"
                            />
                        </Box>

                    }
                </RightSection>
            </SingleProject>
        </Link>
    )
}