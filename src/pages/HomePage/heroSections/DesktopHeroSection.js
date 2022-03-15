import React from 'react';
import { Box, Button, Stack, Typography, styled } from '@mui/material';
import { grey, purple } from '@mui/material/colors';
import { Icon } from '@iconify/react';
import Incrementer from '../../../components/Incrementor';
import useWallet from '../../../hooks/useWallet';

/* ------------------------------------------------------------------------------ */

const ColorButton = styled(Button)(({ theme }) => ({
	color: theme.palette.getContrastText(grey[100]),
	fontSize: 20,
	px: 3,
	minWidth: '20%',
	backgroundColor: grey[100],
	'&:hover': {
		backgroundColor: grey[400],
	},
}));

/* ------------------------------------------------------------------------------ */

export default function DesktopHeroSection({ mint }) {
	const { currentAccount, connectWallet } = useWallet();

	return (
		<Stack
			height='100vh'
			maxWidth='2xl'
			position='relative'
			justifyContent='center'
		>
			{/* <Typography
        fontSize={{ xl: 200, lg: 120, md: 80, sm: 60, xs: 30 }}
        fontWeight={900}
        textTransform="uppercase"
        color={grey[800]}
        textAlign="center"
        mt={20}
      >DRIPPING dino`s</Typography> */}

			<Box position='absolute' bottom={16} width='100%'>
				<Box
					component='img'
					alt='hero'
					src='/assets/images/hero.png'
					sx={{ width: '40%' }}
				/>
			</Box>

			<Box position='absolute' right='15%'>
				<Typography
					color={purple['A400']}
					textTransform='uppercase'
					fontSize={{ xl: 28, lg: 24, md: 18, sm: 14, xs: 12 }}
					fontWeight={500}
					mb={{ xl: 5, lg: 5, md: 3, sm: 3, xs: 1 }}
					ml={1.5}
				>
					Welcome To The
				</Typography>
				<Typography
					color={grey[100]}
					textTransform='uppercase'
					fontSize={{ xl: 120, lg: 100, md: 70, sm: 50, xs: 20 }}
					fontWeight={900}
					lineHeight={0.5}
				>
					Dripping <br />
					<Typography
						component='span'
						color={purple['A400']}
						textTransform='uppercase'
						fontSize={{ xl: 120, lg: 100, md: 70, sm: 50, xs: 20 }}
						fontWeight={900}
					>
						Dino's
					</Typography>
				</Typography>
				<Stack direction='row' alignItems='center' spacing={5} ml={2}>
					<Incrementer available={3} />
					{currentAccount ? (
						<ColorButton onClick={mint}>Mint!</ColorButton>
					) : (
						<ColorButton onClick={connectWallet}>Connect wallet</ColorButton>
					)}
				</Stack>
			</Box>
			<Stack
				className='skewBar'
				sx={{ height: { xl: 60, lg: 60, md: 40, sm: 30 } }}
				justifyContent='center'
				position='absolute'
				bottom={0}
			>
				<marquee>
					<Stack direction='row' spacing={5} alignItems='center'>
						<Icon icon='emojione-monotone:eight-pointed-star' />
						<Typography
							textTransform='uppercase'
							color={grey[100]}
							fontSize={{ xl: 16, lg: 16, md: 12, sm: 10, xs: 8 }}
							fontFamily="'Dela Gothic One', cursive"
						>
							Private Sale opens Friday the 4th of March at 6 PM UTC
						</Typography>
					</Stack>
				</marquee>
			</Stack>
		</Stack>
	);
}
