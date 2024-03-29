import React from 'react';
import Link from 'next/link';
import LinkHoverAnimation from './LinkHoverAnimation';
import { NavMetaData } from '@/pages';
import { Box, styled, Typography, useTheme, useMediaQuery } from '@mui/material';
import { animated, useSpring, config } from '@react-spring/web';
import { useGesture } from '@use-gesture/react';
import Wordmark from '../public/assets/wordmark.svg';
import MenuIcon from '../public/assets/menu-icon.svg';
import MenuIconOpen from '../public/assets/menu-icon-open.svg';

const MenuContents = () => {
    return (
        <>
            <MenuItemWrap padding="14px 0 8px" >
                <LinkHoverAnimation>
                    <Link href="/personal">
                        <Typography variant="monoSmall">Personal</Typography>
                    </Link>
                </LinkHoverAnimation>
            </MenuItemWrap>
            <MenuItemWrap padding="8px 0" >
                <LinkHoverAnimation>
                    <Link href="/commissions">
                        <Typography variant="monoSmall">Commissions</Typography>
                    </Link>
                </LinkHoverAnimation>
            </MenuItemWrap>
            <MenuItemWrap padding="8px 0" >
                <LinkHoverAnimation>
                    <Link href="/about">
                        <Typography variant="monoSmall">About</Typography>
                    </Link>
                </LinkHoverAnimation>
            </MenuItemWrap>
        </>
    )
}

interface Props {
    navMetaData?: NavMetaData;
    hasMetadata?: boolean;
    metaVisible?: boolean;
}

const MetaDataPanel = (props: Props) => {
    const { navMetaData, metaVisible } = props;

    const spring = useSpring({
        opacity: metaVisible ? 1 : 0,
        config: config.stiff,
    });

    const ABox = animated(Box);
    return (
        <ABox display="flex" style={spring} >
            <Typography variant="monoSmaller" padding="0 100px">{navMetaData?.imageTitle}</Typography>
            <Typography variant="monoSmaller" paddingRight="50px">{navMetaData?.seriesOrClient}</Typography>
            <Typography variant="monoSmaller" paddingRight="100px">{navMetaData?.date}</Typography>
        </ABox>
    )
}

const NavBarContainer = styled(Box, {
    label: 'navbar-container',
})(({ theme }) => ({
    display: "flex",
    position: "fixed",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100px",
    width: "100%",
    top: "0",
    zIndex: '10',
    padding: "0 11px",
    [theme.breakpoints.up('md')]: {
        padding: "0 60px 0 30px",
    },
}));

const WordMarkWrap = styled(Box, {
    label: 'wordmark-wrap',
})(({ theme }) => ({
    width: '65%',
    maxWidth: '330px',
    position: 'relative',
    zIndex: 1,
    [theme.breakpoints.up('md')]: {
        width: '325px',
    },
}));

const MenuRightWrap = styled(Box, {
    label: 'menu-right-wrap',
})(({ theme }) => ({
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
}));

const MenuItemsWrap = styled(Box, {
    label: 'menu-items-wrap',
})(({ theme }) => ({
    width: '40px',
    paddingLeft: '20px',
    position: 'relative',
    overflow: 'visible',
    height: '17px',
    [theme.breakpoints.up('md')]: {
        width: '40px',
        paddingLeft: '16px',
    },
}));

const MenuItemWrap = styled(Box)(({ theme }) => ({
    textAlign: 'right',
    paddingRight: '20px',
    [theme.breakpoints.up('md')]: {
        textAlign: 'center',
        paddingRight: '0',
    },
}));

const IconWrap = styled(Box, {
    label: 'icon-wrap',
})(({ theme }) => ({
    zIndex: 5,
    cursor: 'pointer',
    position: 'absolute',
    top: '-2px',
    transformOrigin: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

export default function Navbar(props: Props) {
    const { navMetaData, metaVisible, hasMetadata } = props;
    const [showMenu, setShowMenu] = React.useState(false);
    const [iconHovered, setIconHovered] = React.useState(false);
    const [wordHovered, setWordHovered] = React.useState(false);

    const theme = useTheme();
    const isTablet = useMediaQuery(theme.breakpoints.up('md'));

    const menuSpring = useSpring({
        opacity: showMenu ? 1 : 0,
        config: config.stiff,
    });

    const mobMenuSpring = useSpring({
        right: showMenu ? '0' : '-75%',
        config: config.default,
    });

    const iconSpring = useSpring({
        transform: iconHovered ? 'rotate(90deg)' : 'rotate(0deg)',
        opacity: iconHovered ? '0.9' : '1',
        config: config.wobbly,
    });

    const wordSpring = useSpring({
        opacity: wordHovered ? '0.7' : '1',
        transform: wordHovered ? 'rotate(0.3deg)' : 'rotate(0deg)',
        config: config.wobbly,
    });

    const MenuContainer = styled(Box)(({ theme }) => ({
        position: 'absolute',
        top: '39px',
        right: '0',
        height: '360px',
        backgroundColor: '#FFFEFB',
        width: '280px',
        border: '2px #323232',
        borderStyle: 'dashed',
        pointerEvents: showMenu ? 'auto' : 'none',
        [theme.breakpoints.up('md')]: {
            right: '-92%',
            height: 'unset',
            width: 'unset',
            backgroundColor: 'unset',
            border: 'none',
        },
    }));

    const MobileMenuContainer = styled(Box)(({ theme }) => ({
        position: 'fixed',
        height: '100vh',
        width: '72vw',
        minWidth: '150px',
        maxWidth: '400px',
        paddingTop: '95px',
        top: 0,
        right: 0,
        backgroundColor: '#FFFEFB',
        pointerEvents: showMenu ? 'auto' : 'none',
        boxShadow: 'rgba(17, 12, 46, 0.15) 0px 48px 100px 0px',
    }));

    const bind = useGesture({
        onHover: ({ hovering }) => {
            setIconHovered(hovering ?? false);
        },
    });

    const bindWord = useGesture({
        onHover: ({ hovering }) => {
            setWordHovered(hovering ?? false);
        },
    });

    const AnimatedMenuContainer = animated(MenuContainer);
    const AMobileMenuContainer = animated(MobileMenuContainer);
    const AnimatedIconWrap = animated(IconWrap);
    const AnimatedWordWrap = animated(WordMarkWrap);

    const toggleMenu = () => setShowMenu(!showMenu);

    return (
        <NavBarContainer>
            <AnimatedWordWrap {...bindWord()} style={wordSpring}>
                <Link href="/">
                    <Wordmark />
                </Link>
            </AnimatedWordWrap>
            <MenuRightWrap>
                {hasMetadata && isTablet && <MetaDataPanel navMetaData={navMetaData} metaVisible={metaVisible} />}
                <MenuItemsWrap onClick={toggleMenu} >
                    <AnimatedIconWrap {...bind()} style={iconSpring}>
                        {showMenu ? <MenuIconOpen /> : <MenuIcon />}
                    </AnimatedIconWrap>
                    {isTablet ?
                        <AnimatedMenuContainer style={menuSpring}>
                            <MenuContents />
                        </AnimatedMenuContainer>
                        :
                        <AMobileMenuContainer
                            style={mobMenuSpring}
                        >
                            <MenuContents />
                        </AMobileMenuContainer>
                    }
                </MenuItemsWrap>
            </MenuRightWrap>
        </NavBarContainer>
    );
}
