import { createClient } from 'next-sanity';
import Head from 'next/head';
import { useTheme } from '@mui/material';
import React from 'react';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import ScrollProgress from 'components/ScrollProgress';
import HomePageGallery from 'components/HomePageGallery';
import { HomeGallery } from 'models/models';
import MobileHomePageGallery from 'components/MobileHomePageGallery';

export interface NavMetaData {
  imageTitle?: string;
  seriesOrClient?: string;
  date?: string;
}

interface Props {
  homeGallery: HomeGallery;
}

export default function Home(props: Props) {
  const { homeGallery } = props;
  const [navMetaData, setMetaData] = React.useState<NavMetaData>({});
  const [metaVisible, setMetaVisible] = React.useState(false);
  const theme = useTheme();
  
  return (
    <>
      <Head>
        <title>GS - Photography</title>
        <meta name="description" content="Focused on various long and short-term photography art projects, taking on commissioned work for selected clients." />
      </Head>
      <ScrollProgress>
        <Navbar navMetaData={navMetaData} metaVisible={metaVisible} hasMetadata />
        <MobileHomePageGallery gallery={homeGallery} />
        <HomePageGallery gallery={homeGallery} setMetaData={setMetaData} setMetaVisible={setMetaVisible} />
        <Footer />
      </ScrollProgress>
    </>
  );
}

const client = createClient({
  projectId: 'nimz3ndn',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
});

const HOME_GALLERY_QUERY = `*[_type=="image_galleries" && _id=="25debf56-bfaa-47a2-8671-a85f0c1a094e"][0]{
  images[]{
    altText,
    imageMetaData,
    "image": {
      "url": image.asset->url,
      "lqip": image.asset->metadata.lqip,
      "width": image.asset->metadata.dimensions.width,
      "height": image.asset->metadata.dimensions.height,
      "palette": {
        "dominant": image.asset->metadata.palette.dominant.background,
        "lightMuted": image.asset->metadata.palette.lightMuted.background
      }
    }
  }
}`;

export async function getStaticProps() {
  const homeGallery = await client.fetch<HomeGallery>(HOME_GALLERY_QUERY);
  return {
    props: {
      homeGallery,
    },
  };
}
