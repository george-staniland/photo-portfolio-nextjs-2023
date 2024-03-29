import React from 'react';
import Head from 'next/head';
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Project from 'components/Project';
import { createClient } from 'next-sanity';
import { Box, styled } from "@mui/material"
import { ProjectModel } from '../../models/project';
import { AllProjects } from './personal';

interface Props {
    commissionedProjects: ProjectModel[],
}


export default function Commisions(props: Props) {
    const { commissionedProjects } = props;

    return (
        <>
            <Head>
                <title>George Staniland - Commissioned</title>
                <meta name="description" content="George is focused on various long and short-term photography art projects, taking on commissioned work for selected clients." />
            </Head>
            <Navbar />
            <AllProjects>
                {commissionedProjects.map((project, index) => {
                    return (
                        <Project project={project} key={index} index={index} projectCategory='commissions' />
                    )
                })}
            </AllProjects>
            <Footer showButton={false} />
        </>
    )
}

const client = createClient({
    projectId: 'nimz3ndn',
    dataset: 'production',
    apiVersion: '2023-01-01',
    useCdn: false,
});

export async function getStaticProps() {
    const commissionedProjects = await client.fetch('*[_type == "projects" && project_category in ["commissioned"]] | order(orderRank)');

    return {
        props: {
            commissionedProjects,
        },
    };
}
