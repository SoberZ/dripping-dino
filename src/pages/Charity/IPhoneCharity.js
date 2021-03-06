import React from 'react';
import { Typography, Box, Stack } from '@mui/material';

export default function IPhoneCharity() {
  return (
    <Box>
      <Box position="relative">
        {/* earth */}
        <Box
          component="img"
          src="/assets/images/earth.png"
          alt="earth"
          width={1200}
          position="absolute"
          right={0}
          top={80}
          zIndex={1}
        />
        {/* dinosaurs */}
        <Stack direction="row" justifyContent="center" pt={18}>
          <Box
            component="img"
            src="/assets/images/twin_dinos.png"
            alt="twin_dinos"
            zIndex={2}
            width={300}
          />
        </Stack>
        {/* pink_shadow */}
        <Box
          component="img"
          src="/assets/images/pink_shadow.png"
          alt="pink_shadow"
          width={1200}
          position="absolute"
          right={20}
          top={80}
          zIndex={3}
          sx={{ opacity: 0.5 }}
        />
        {/* blur_black_bar */}
        <Box
          width="100%"
          height={50}
          position="absolute"
          right={0}
          top={330}
          zIndex={4}
          sx={{ background: '#0F1011', filter: 'blur(5px)' }}
        />
      </Box>

      <Box mt={6} mx={3}>
        <Typography fontSize={20} fontWeight={700} textTransform="uppercase">
          Charity&volunteering
        </Typography>
        <Typography fontSize={16} mt={3} sx={{ color: '#E0E0E0' }}>
          We are creating a charity to provide a helping hand to people in need without compromising the needs of our holders. We want to give back in a sustainable way and make an impact in the world while using this incredible technology. Dripping Dino’s will pledge to donate 100.000 USD worth of clothing to our own charity in the first week of minting. We will continue to donate meaningful amounts (generated by our DAO) every quarter of the year. These charity donations will be broadcasted and shown to our community, to document the legitimacy of our promises.
        </Typography>
      </Box>
    </Box>
  );
}