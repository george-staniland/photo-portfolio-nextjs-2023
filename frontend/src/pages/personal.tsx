import React from 'react';
import Head from 'next/head';
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Project from 'components/Project';
import { getProjectsByCategory } from 'lib/getProjects';
import { Box, styled } from "@mui/material"
import { ProjectModel } from '../../models/project';

export const AllProjects = styled(Box, {
    label: 'all-projects',
})(({ theme }) => ({
    marginBottom: '100px',
    marginTop: '120px',
    minHeight: '81vh',
    [theme.breakpoints.up('md')]: {
        marginBottom: '0',
    },
}));

interface Props {
    commissionedProjects: ProjectModel[],
}

export default function Commisions(props: Props) {
    const { commissionedProjects } = props;

    return (
        <>
            <Head>
                <title>George Staniland - Projects</title>
                <meta name="description" content="George is focused on various long and short-term photography art projects, taking on commissioned work for selected clients." />
            </Head>
            <Navbar />
            <AllProjects>
                {commissionedProjects.map((project, index) => {
                    return (
                        <Project project={project} key={index} index={index} projectCategory='personal' />
                    )
                })}
            </AllProjects>
            <Footer showButton={false} />
        </>
    )
}

export async function getStaticProps() {
    const commissionedProjects = await getProjectsByCategory('personal');

    return {
        props: {
            commissionedProjects,
        },
    };
}
