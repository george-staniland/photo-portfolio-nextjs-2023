import React from "react";
import { Box, styled, Typography } from "@mui/material"
import Image from "next/image";
import Link from "next/link";
import Missing from '../public/assets/missing.png'
import { ProjectModel } from "models/project";

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
    // Details are always visible below `lg`; from `lg` up they reveal on hover/focus.
    [theme.breakpoints.up('lg')]: {
        '&:hover .project-left, &:focus-within .project-left': {
            opacity: 1,
        },
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
    opacity: 1,
    [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        marginTop: '-2px',
    },
    [theme.breakpoints.up('lg')]: {
        opacity: 0,
        transition: 'opacity 300ms ease',
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
    const { project, projectCategory, index } = props;
    const { project_title, project_year, cover_image, description, project_slug, client_or_type } = project;
    const displayIndex = index + 1;

    return (
        <Link href={`/${projectCategory}/${project_slug}`}>
            <SingleProject>
                <LeftSection className="project-left">
                    <Box marginRight={{ xs: "0", sm: "20px", md: "80px" }} paddingBottom={{ xs: "20px", sm: "0" }} position={'relative'} >
                        <Typography variant="spaceGroteskSmall" position={'relative'} top={{ xs: "0px", md: "-3px" }} left={0} >(0{displayIndex})</Typography>
                    </Box>
                    <Box maxWidth="700px" display="flex" flexDirection="column" paddingRight={{ xs: "0", sm: "40px" }}>
                        <Typography variant="monoSmaller" paddingBottom={{ xs: "10px", sm: "50px" }} >{project_title}</Typography>
                        <Typography variant="monoSmaller">{client_or_type}</Typography>
                        <Typography variant="monoSmaller" paddingBottom={{ xs: "25px", sm: "50px" }} >{project_year}</Typography>
                        <Typography variant="monoSmaller" >{description}</Typography>
                    </Box>
                </LeftSection>
                <RightSection>
                    <Typography variant="spaceGroteskSmall" paddingBottom="6px" display={{ xs: 'none', sm: 'block' }}>(0{displayIndex})</Typography>
                
                    <Box position="relative" sx={{ width: { xs: '100%', sm: '300px' }, aspectRatio: '7/6' }}>
                        <Image
                            src={cover_image?.url ?? Missing}
                            alt={project_title ? `${project_title} cover photo` : 'a photo on gs website'}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'center' }}
                            sizes="(max-width: 599px) 100vw, 300px"
                        />
                    </Box>
                </RightSection>
            </SingleProject>
        </Link>
    )
}
