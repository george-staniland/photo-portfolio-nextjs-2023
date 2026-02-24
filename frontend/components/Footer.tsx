import React from 'react';
import Link from 'next/link';
import { Box, styled, Typography } from '@mui/material';
import LinkHoverAnimation from './LinkHoverAnimation';
import MenuIcon from '../public/assets/menu-icon.svg';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated, config } from '@react-spring/web';

const FooterContainer = styled(Box, {
    label: 'footer-container',
})(({ theme }) => ({
    padding: "0 14px 19px",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    [theme.breakpoints.up('sm')]: {
        padding: "0 8px",
        height: '200px',
        flexDirection: 'row',
    },
    [theme.breakpoints.up('md')]: {
        padding: "0 60px 30px 30px",
    },
}));

const LeftSection = styled(Box, {
    label: 'footer-left',
})(({ theme }) => ({
    flexGrow: '1',
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
}));

const RightSection = styled(Box, {
    label: 'footer-right',
})(({ theme }) => ({
    flexGrow: '1',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
}));

const IconWrap = styled(Box)(({ theme }) => ({
    width: '40px',
    position: 'relative',
    [theme.breakpoints.up('md')]: {
        width: '42px',
    },
}));

const IconWrapSmall = styled(Box)(({ theme }) => ({
    width: '16px',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
        width: '17px',
    },
}));

const FooterLink = styled(Link)(({ theme }) => ({
    paddingBottom: '7px',
    [theme.breakpoints.up('sm')]: {
        paddingBottom: '7px',
    },
}));

const ToTopButton = () => {
    const [isHovered, setHovered] = React.useState(false);
    const spring = useSpring({
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    })

    const iconSpring = useSpring({
        transform: isHovered ? 'rotate(90deg)' : 'rotate(0deg)',
    })

    const bind = useGesture({
        onHover: ({ hovering }) => {
            setHovered(hovering ?? false);
        },
    })

    const Button = styled(Box)(({ theme }) => ({
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: '1',
        width: '100%',
        paddingBottom: '35px',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            marginTop: '-3px',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '-3px',
        },
    }));

    const AButton = animated(Button);
    const AnimatedIconWrap = animated(IconWrap);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }

    return (
        <AButton {...bind()} onClick={scrollToTop} style={spring}>
            <AnimatedIconWrap>
                <MenuIcon />
            </AnimatedIconWrap>
            <Typography variant="spaceGrotesk" >
                back to top
            </Typography>
        </AButton>
    )
}

interface BackButtonProps {
    backLink: string;
    linkTitle: string;
}

const BackButton = (props: BackButtonProps) => {
    const [isHovered, setHovered] = React.useState(false);
    const { backLink, linkTitle } = props;

    const spring = useSpring({
        transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    })

    const bind = useGesture({
        onHover: ({ hovering }) => {
            setHovered(hovering ?? false);
        },
    })

    const Button = styled(Box)(({ theme }) => ({
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        flexGrow: '1',
        width: '100%',
        paddingBottom: '35px',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            marginTop: '-3px',
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '-4px',
        },
    }));

    const AButton = animated(Button);

    return (
        <AButton {...bind()} style={spring}>
            <Link href={backLink} style={{ width: '100%', display: 'flex', alignItems: 'center' }}>
                <IconWrap>
                    <MenuIcon />
                </IconWrap>
                <Typography variant="spaceGrotesk" >
                    {linkTitle}
                </Typography>
            </Link>
        </AButton>
    )
}

interface Props {
    showButton?: boolean;
    showBackButton?: boolean;
    backLink?: string;
    linkTitle?: string;
}

export default function Footer(props: Props) {
    const { showButton = true, showBackButton = false, backLink = '/commissions', linkTitle = 'Back' } = props;
    return (
        <FooterContainer>
            <LeftSection>
                {showButton && <ToTopButton />}
                {showBackButton && <BackButton backLink={backLink} linkTitle={linkTitle} />}
                <Box display="flex" flexGrow="1" flexDirection="column" paddingBottom={{ xs: "30px", sm: "0" }}>
                    <FooterLink href="/personal">
                        <Typography variant="spaceGrotesk" >
                            <LinkHoverAnimation>
                                Personal
                            </LinkHoverAnimation>
                        </Typography>
                    </FooterLink>
                    <FooterLink href="/commissions">
                        <Typography variant="spaceGrotesk" >
                            <LinkHoverAnimation>
                                Commissions
                            </LinkHoverAnimation>
                        </Typography>
                    </FooterLink>
                    <FooterLink href="/about">
                        <Typography variant="spaceGrotesk" >
                            <LinkHoverAnimation>
                                About
                            </LinkHoverAnimation>
                        </Typography>
                    </FooterLink>
                </Box>
                <Box display="flex" flexDirection="column" flexGrow="1" >
                    <a href="https://www.instagram.com/george.staniland/?hl=en" target="_blank" rel="noreferrer" >
                        <Typography variant="spaceGrotesk" >
                            <LinkHoverAnimation>
                                Instagram
                            </LinkHoverAnimation>
                        </Typography>
                    </a>
                </Box>
            </LeftSection>
            <RightSection>
                <Typography variant="spaceGroteskSmall" >
                    © George Staniland Photography 2026
                </Typography>
            </RightSection>
        </FooterContainer>
    )
}