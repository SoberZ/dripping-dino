import React, { useState, useEffect } from 'react';
import { Box, Snackbar, Alert } from '@mui/material';
import { ethers } from 'ethers';
import MHidden from '../../components/@mui-extend/MHidden';
import DesktopHeroSection from './heroSections/DesktopHeroSection';
import IPadHeroSection from './heroSections/IPadHeroSection';
import IPhoneHeroSection from './heroSections/IPhoneHeroSection';
import useWallet from '../../hooks/useWallet';
import { ABI, CONTRACT_ADDRESS, NFT_PRICE } from '../../constants';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

export default function HomePage() {
	const { mintAmount } = useWallet();

	const [isOpened, setIsOpened] = useState(false);
	const [severity, setSeverity] = useState('success');
	const [message, setMessage] = useState('');
	const [isConnected, setIsConnected] = useState(false);

	const openAlert = (severity, message) => {
		setSeverity(severity);
		setMessage(message);
		setIsOpened(true);
	};

	const getWeb3Modal = async () => {
		const web3Modal = new Web3Modal({
			network: 'rinkeby',
			cacheProvider: false,
			providerOptions: {
				walletconnect: {
					package: WalletConnectProvider,
					options: {
						// infuraId: '8cf3cad623da43f9a84ab5ac94230cf6'
						// infuraId: '716d0574cc4c423a9adc0f4e451076ee',
						infuraId: 'e9b534f52ce94481b7fa65aa461839c3'
					},
				},
			},
		});
		return web3Modal;
	};
	// console.log('web3modal deets' + getWeb3Modal);

	useEffect(() => {
		const init = async () => {
			await getWeb3Modal();
			setIsConnected(true);
		};
		init();
	}, []);

	const mint = async () => {
		try {
			if (isConnected) {
				const web3Modal = await getWeb3Modal();
				const connection = await web3Modal.connect();
				const provider = new ethers.providers.Web3Provider(connection);
				const signer = provider.getSigner();
				const { chainId } = await provider.getNetwork();
				// console.log('chain id: ' + chainId);
				// const chainId = await ethereum.request({ method: 'eth_chainId' });
				if (chainId) {
					// const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
					const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
					alert('chain id:' + chainId + 'contract passed');
					await contract.mint(mintAmount, {
						value: ethers.utils.parseEther(String(NFT_PRICE * mintAmount)),
					});
					alert('const: transaction passed');
					// await transaction.wait();
					alert('const: await passed');
					openAlert('success', 'Minted!');
				} else {
					openAlert('warning', 'Please choose Ethereum mainnet.');
				}
			} else {
				openAlert('error', "Ethereum object doesn't exist");
			}
		} catch (error) {
			openAlert(
				'error',
				error.message ? error.message : 'Transaction is failed.'
			);
		}
	};

	return (
		<Box height='100vh'>
			<MHidden width='mdDown'>
				<DesktopHeroSection mint={mint} />
			</MHidden>

			<MHidden width='mdUp'>
				<MHidden width='smDown'>
					<IPadHeroSection mint={mint} />
				</MHidden>
				<MHidden width='smUp'>
					<IPhoneHeroSection mint={mint} />
				</MHidden>
			</MHidden>

			<Snackbar
				open={isOpened}
				autoHideDuration={5000}
				onClose={() => setIsOpened(false)}
				anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
			>
				<Alert
					variant='filled'
					onClose={() => setIsOpened(false)}
					severity={severity}
					sx={{ width: '100%' }}
				>
					{message}
				</Alert>
			</Snackbar>
		</Box>
	);
}
