import { useEffect } from 'react';
import { useRouter } from 'next/router';
// next
import Head from 'next/head';
// @mui
import { Box, Switch, Container, Typography, Stack, Button } from '@mui/material';
// _mock_
import { _pricingPlans } from '../_mock/arrays';
// sections
import { PricingPlanCard } from '../sections/pricing';
import MainLayout from 'src/layouts/main/MainLayout';

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => <MainLayout> {page} </MainLayout>;

// ----------------------------------------------------------------------


export default function HomePage() {

  return (
    <>
      <Head>
        <title> Pricing | Minimal UI</title>
      </Head>
      <HomeHero />
      <HomeMinimal />
              {/* <Header/> */}
      <Container
        sx={{
          pt: 15,
          pb: 10,
          minHeight: 1,
        }}
      >
        <Typography variant="h3" align="center" paragraph>
          Flexible plans for your
          <br /> community&apos;s size and needs
        </Typography>

        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Choose your plan and make modern online conversation magic
        </Typography>

        <Box sx={{ my: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <Typography variant="overline" sx={{ mr: 1.5 }}>
              MONTHLY
            </Typography>

            <Switch />
            <Typography variant="overline" sx={{ ml: 1.5 }}>
              YEARLY (save 10%)
            </Typography>
          </Stack>

          <Typography
            variant="caption"
            align="right"
            sx={{ color: 'text.secondary', display: 'block' }}
          >
            * Plus applicable taxes
          </Typography>
        </Box>

        <Box gap={3} display="grid" gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}>
          {_pricingPlans.map((card, index) => (
            <PricingPlanCard key={card.subscription} card={card} index={index} />
          ))}
        </Box>
      </Container>
    </>
  )
}

// Assets
import HeaderImage from "../assets/img/header-img.png";



export function Header() {
  return (
    <>
      <LeftSide className="flexCenter">
        <div>
          <h1 className="extraBold font60">We are Digital Agency.</h1>
          <HeaderP className="font13 semiBold">
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
            voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
          </HeaderP>
          <Button>
            get started
          </Button>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Image className="radius8" src={HeaderImage} alt="office" style={{zIndex: 9}} />
          <DotsWrapper>
            <SvgComponent />
          </DotsWrapper>
        </ImageWrapper>
        <GreyDiv className="lightBg"></GreyDiv>
      </RightSide>
    </>
  );
}

function SvgComponent(props:any) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={186.223} height={249.21} viewBox="0 0 186.223 249.21" {...props}>
      <g data-name="Group 102" fill="#bebdce">
        <g data-name="Group 59" transform="translate(-.09 .208)">
          <ellipse data-name="Ellipse 1" cx={4} cy={5} rx={4} ry={5} transform="translate(.228 -.08)" />
          <circle data-name="Ellipse 2" cx={4.565} cy={4.565} r={4.565} transform="translate(.09 39.806)" />
          <circle data-name="Ellipse 3" cx={4.565} cy={4.565} r={4.565} transform="translate(.09 79.819)" />
          <circle data-name="Ellipse 4" cx={4.565} cy={4.565} r={4.565} transform="translate(.09 119.833)" />
          <circle data-name="Ellipse 5" cx={4.565} cy={4.565} r={4.565} transform="translate(.09 159.846)" />
          <circle data-name="Ellipse 6" cx={4.565} cy={4.565} r={4.565} transform="translate(.09 199.859)" />
          <circle data-name="Ellipse 7" cx={4.565} cy={4.565} r={4.565} transform="translate(.09 239.873)" />
        </g>
        <g data-name="Group 60" transform="translate(35.419)">
          <circle data-name="Ellipse 8" cx={4.565} cy={4.565} r={4.565} />
          <circle data-name="Ellipse 9" cx={4.565} cy={4.565} r={4.565} transform="translate(0 40.014)" />
          <circle data-name="Ellipse 10" cx={4.565} cy={4.565} r={4.565} transform="translate(0 80.027)" />
          <circle data-name="Ellipse 11" cx={4.565} cy={4.565} r={4.565} transform="translate(0 120.041)" />
          <circle data-name="Ellipse 12" cx={4.565} cy={4.565} r={4.565} transform="translate(0 160.054)" />
          <circle data-name="Ellipse 13" cx={4.565} cy={4.565} r={4.565} transform="translate(0 200.067)" />
          <circle data-name="Ellipse 14" cx={4.565} cy={4.565} r={4.565} transform="translate(0 240.081)" />
        </g>
        <g data-name="Group 61" transform="translate(70.838)">
          <circle data-name="Ellipse 15" cx={4.565} cy={4.565} r={4.565} />
          <circle data-name="Ellipse 16" cx={4.565} cy={4.565} r={4.565} transform="translate(0 40.014)" />
          <circle data-name="Ellipse 17" cx={4.565} cy={4.565} r={4.565} transform="translate(0 80.027)" />
          <circle data-name="Ellipse 18" cx={4.565} cy={4.565} r={4.565} transform="translate(0 120.041)" />
          <circle data-name="Ellipse 19" cx={4.565} cy={4.565} r={4.565} transform="translate(0 160.054)" />
          <circle data-name="Ellipse 20" cx={4.565} cy={4.565} r={4.565} transform="translate(0 200.067)" />
          <circle data-name="Ellipse 21" cx={4.565} cy={4.565} r={4.565} transform="translate(0 240.081)" />
        </g>
        <g data-name="Group 62" transform="translate(106.256)">
          <circle data-name="Ellipse 22" cx={4.565} cy={4.565} r={4.565} />
          <circle data-name="Ellipse 23" cx={4.565} cy={4.565} r={4.565} transform="translate(0 40.014)" />
          <circle data-name="Ellipse 24" cx={4.565} cy={4.565} r={4.565} transform="translate(0 80.027)" />
          <circle data-name="Ellipse 25" cx={4.565} cy={4.565} r={4.565} transform="translate(0 120.041)" />
          <circle data-name="Ellipse 26" cx={4.565} cy={4.565} r={4.565} transform="translate(0 160.054)" />
          <circle data-name="Ellipse 27" cx={4.565} cy={4.565} r={4.565} transform="translate(0 200.067)" />
          <circle data-name="Ellipse 28" cx={4.565} cy={4.565} r={4.565} transform="translate(0 240.081)" />
        </g>
        <g data-name="Group 63" transform="translate(141.675)">
          <circle data-name="Ellipse 29" cx={4.565} cy={4.565} r={4.565} />
          <circle data-name="Ellipse 30" cx={4.565} cy={4.565} r={4.565} transform="translate(0 40.014)" />
          <circle data-name="Ellipse 31" cx={4.565} cy={4.565} r={4.565} transform="translate(0 80.027)" />
          <circle data-name="Ellipse 32" cx={4.565} cy={4.565} r={4.565} transform="translate(0 120.041)" />
          <circle data-name="Ellipse 33" cx={4.565} cy={4.565} r={4.565} transform="translate(0 160.054)" />
          <circle data-name="Ellipse 34" cx={4.565} cy={4.565} r={4.565} transform="translate(0 200.067)" />
          <circle data-name="Ellipse 35" cx={4.565} cy={4.565} r={4.565} transform="translate(0 240.081)" />
        </g>
        <g data-name="Group 64" transform="translate(177.094)">
          <circle data-name="Ellipse 36" cx={4.565} cy={4.565} r={4.565} />
          <circle data-name="Ellipse 37" cx={4.565} cy={4.565} r={4.565} transform="translate(0 40.014)" />
          <circle data-name="Ellipse 38" cx={4.565} cy={4.565} r={4.565} transform="translate(0 80.027)" />
          <circle data-name="Ellipse 39" cx={4.565} cy={4.565} r={4.565} transform="translate(0 120.041)" />
          <circle data-name="Ellipse 40" cx={4.565} cy={4.565} r={4.565} transform="translate(0 160.054)" />
          <circle data-name="Ellipse 41" cx={4.565} cy={4.565} r={4.565} transform="translate(0 200.067)" />
          <circle data-name="Ellipse 42" cx={4.565} cy={4.565} r={4.565} transform="translate(0 240.081)" />
        </g>
      </g>
    </svg>
  );
}

import { styled } from '@mui/material/styles';
import Image from 'next/image';
import HomeHero from 'src/sections/home/Hero';
import HomeMinimal from 'src/sections/home/HomeMinimal';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  overflow: 'hidden',
  position: 'relative',
  color: theme.palette.primary.darker,
  borderRadius: Number(theme.shape.borderRadius) * 2,
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}));

const Wrapper = styled('section')(({ theme }) => ({
  paddingTop: '80px',
  width: '100%',
  minHeight: '840px',
  [theme.breakpoints.down(960)]: {
    flexDirection: "column",
  },
}));

const LeftSide = styled('div')(({ theme }) => ({
  width: '50%',
  height: '100%',
  minHeight: '840px',
  [theme.breakpoints.down(960)]: {
    width: '100%',
    order: 2,
    margin: '50px 0',
    textAlign: "center",
  },
  [theme.breakpoints.down(560)]: {
    margin: '80px 0 50px 0',
  },
}));


const RightSide = styled('div')(({ theme })=>({
  width: '50%',
  height: '100%',
  [theme.breakpoints.down(960)]: {
    width: '100%',
    order: 1,
    marginTop: '30px',
  }
}))

const HeaderP = styled('div')(({ theme }) =>({
  maxWidth: '470px',
  padding: '15px 0 50px 0',
  lineHeight: '1.5rem',
  [theme.breakpoints.down(960)]: {
    padding: "15px 0 50px 0",
    textAlign: "center",
    maxWidth: "100%",
  },
}))

const BtnWrapper = styled('div')(({ theme }) =>({
  maxWidth: "190px",
  [theme.breakpoints.down(960)]: {
    margin: "0 auto",
  }
}))

const GreyDiv = styled('div')(({ theme }) =>({
  width: "30%",
  height: "700px",
  position: "absolute",
  top: 0,
  right: 0,
  zIndex: 0,
  [theme.breakpoints.down(960)]: {
    display: "none",
  }
}))

const ImageWrapper = styled('div')(({ theme }) =>({
  display: "flex",
  justifyContent: "flex-end",
  position: "relative",
  zIndex: 9,
  [theme.breakpoints.down(960)]: {
    width: "100%",
    justifyContent: "center",
  }
}))

const Img = styled('img')(({ theme }) =>({
  [theme.breakpoints.down(560)]: {
    width: "80%",
    height: "auto",
  }
}))


const QuoteWrapper = styled('div')(({ theme }) =>({
  position: "absolute",
  left: 0,
  bottom: "50px",
  maxWidth: "330px",
  padding: "30px",
  zIndex: "99",
  [theme.breakpoints.down(960)]: {
    left: "20px",
  },
  [theme.breakpoints.down(560)]: {
    bottom: "-50px",
  }
}))

const QuotesWrapper = styled('div')(({ theme }) =>({
  position: "absolute",
  left: "-20px",
  top: "-10px",
}))

const DotsWrapper = styled('div')(({ theme }) =>({
  position: "absolute",
  right: "-100px",
  bottom: "100px",
  zIndex: 2,
  [theme.breakpoints.down(960)]: {
    right: "100px",
  },
  [theme.breakpoints.down(560)]: {
    display: "none",
  }
}))

