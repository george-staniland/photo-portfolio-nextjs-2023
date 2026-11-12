import { Box, styled } from '@mui/material';
import Image from 'next/image';
import { GalleryImage } from 'models/models';

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

// Static (CSS-media based) so server HTML and client agree; md = 900px, matching the layout below.
const SIZES = '(max-width: 899px) 100vw, (max-width: 1200px) 70vw, 97vw';

interface Props {
    image: GalleryImage;
    index: number;
    alt?: string;
}

export default function ProjectSingleImage({ image, index, alt = '' }: Props) {
    const isFirst = index === 0;
    const Container = isFirst ? ImageContainerFirstImage : ImageContainer;

    return (
        <Container>
            <Box
                sx={{
                    position: 'relative',
                    width: '100%',
                    height: { xs: 'auto', md: '100%' },
                    aspectRatio: { xs: '4/3', md: 'auto' },
                }}
            >
                <Image
                    src={image.url}
                    alt={alt}
                    fill
                    sizes={SIZES}
                    quality={95}
                    preload={isFirst}
                    placeholder="blur"
                    blurDataURL={image.lqip}
                    style={{ objectFit: 'contain' }}
                />
            </Box>
        </Container>
    );
}
