import React from 'react';
import { Box, Button, Stack, Typography, styled, Grid, IconButton, Link } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Icon } from '@iconify/react';
import Incrementer from '../../../components/Incrementor';
import { DISCORD_URL, INSTAGRAM_URL, TWITTER_URL } from '../../../constants';
import useWallet from '../../../hooks/useWallet';

/* ------------------------------------------------------------------------------ */

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(grey[100]),
  fontSize: 16,
  width: '10%',
  backgroundColor: grey[100],
  '&:hover': {
    backgroundColor: grey[400],
  },
}));

/* ------------------------------------------------------------------------------ */

export default function IPadHeroSection({ mint }) {
  const { currentAccount, connectWallet } = useWallet();
  return (
    <Box position="relative">
      <Box ml={6} pt={18} zIndex={99}>
        <Typography
          color="primary"
          textTransform="uppercase"
          fontSize={26}
          fontWeight={500}
          mb={5}
        >
          Welcome To The
        </Typography>
        <Typography
          color={grey[100]}
          textTransform="uppercase"
          fontSize={100}
          fontWeight={900}
          lineHeight={0.5}
        >
          Dripping <br />
          <Typography
            component="span"
            color="primary"
            textTransform="uppercase"
            fontSize={100}
            fontWeight={900}
          >Dino's</Typography>
        </Typography>
        <Stack direction="row" alignItems="center" spacing={5} ml={2}>
          <Incrementer available={3} />
          {
            currentAccount ? (
              <ColorButton onClick={mint}>Mint</ColorButton>
            ) : (
              <ColorButton onClick={connectWallet}>Connect wallet</ColorButton>
            )
          }
        </Stack>
      </Box>

      <Box zIndex={99}>
        <Grid container spacing={3} alignItems="flex-end">
          <Grid item sm={7}>
            <Box component="img" src="/assets/images/hero.png" width="100%" alt="" sx={{ zIndex: 99 }} position="relative" />
          </Grid>
          <Grid item sm={5}>
            <Stack direction="row" justifyContent="center" alignItems="center">
              <IconButton sx={{ color: '#F2F2F2', fontSize: 36 }} component={Link} href={INSTAGRAM_URL}>
                <Icon icon="ant-design:instagram-filled" />
              </IconButton>

              <IconButton sx={{ color: '#F2F2F2', fontSize: 36 }} component={Link} href={DISCORD_URL}>
                <Icon icon="akar-icons:discord-fill" />
              </IconButton>

              <IconButton sx={{ color: '#F2F2F2', fontSize: 36 }} component={Link} href={TWITTER_URL}>
                <Icon icon="akar-icons:twitter-fill" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Stack className="skewBar" sx={{ height: 60 }} justifyContent="center" zIndex={1}>
        <marquee>
          <Stack direction="row" spacing={5} alignItems="center">
            <Icon icon="emojione-monotone:eight-pointed-star" />
            <Typography
              textTransform="uppercase"
              color={grey[100]}
              fontSize={20}
              fontFamily="'Dela Gothic One', cursive"
              fontWeight={500}
            >
              Private Sale opens Friday the 4th of March at 6 PM UTC
            </Typography>
          </Stack>
        </marquee>
      </Stack>
    </Box>
  );
}