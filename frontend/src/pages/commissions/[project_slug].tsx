import React from 'react';
import { Box } from "@mui/material"
import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import ScrollProgress from 'components/ScrollProgress';
import ProjectSingleImage from 'components/ProjectSingleImage';
import { getProject } from 'lib/getProject';
import { ProjectData } from 'models/models';

//To Do: Both dynamic routes should use the same components

interface Props {
    project: ProjectData;
}

const Project = (props: Props) => {
    const { project } = props;
    const { images, project_title } = project;
    return (
        <>
            <ScrollProgress>
                <Navbar />
                <Box marginTop="120px" marginBottom={{ xs: "30px", md: "120px" }}>
                    {images.map((image, index) => image && (
                        <ProjectSingleImage
                            image={image}
                            key={`${image.url}-${index}`}
                            index={index}
                            alt={project_title ? `${project_title} - photo ${index + 1}` : ''}
                        />
                    ))}
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
    const { project_slug } = context.params;
    const project = await getProject(project_slug);

    if (!project || !project.images) {
        return { notFound: true };
    }

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
