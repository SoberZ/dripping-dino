import React, { createContext, useEffect, useReducer } from 'react';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';
// ----------------------------------------------------------------------

const initialState = {
	walletConnected: false,
	currentAccount: '',
	mintAmount: 1,
};

const handlers = {
	SET_WALLET_CONNECTED: (state, action) => {
		return {
			...state,
			walletConnected: action.payload,
		};
	},
	SET_CURRENT_ACCOUNT: (state, action) => {
		return {
			...state,
			currentAccount: action.payload,
		};
	},
	SET_MINT_AMOUNT: (state, action) => {
		return {
			...state,
			mintAmount: action.payload,
		};
	},
};

const reducer = (state, action) =>
	handlers[action.type] ? handlers[action.type](state, action) : state;

//  Context
const WalletContext = createContext({
	...initialState,
	setMintAmount: () => Promise.resolve(),
	connectWallet: () => Promise.resolve(),
});

//  Provider
function WalletProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	const getWeb3Modal = async () => {
		const web3Modal = new Web3Modal({
			network: 'mainnet',
			cacheProvider: false,
			providerOptions: {
				walletconnect: {
					package: WalletConnectProvider,
					options: {
						// infuraId: '8cf3cad623da43f9a84ab5ac94230cf6'
						infuraId: '716d0574cc4c423a9adc0f4e451076ee',
					},
				},
			},
		});
		return web3Modal;
	};

	const connectWallet = async () => {
		const web3Modal = await getWeb3Modal();
		const connection = await web3Modal.connect();
		const provider = new ethers.providers.Web3Provider(connection);
		const accounts = await provider.listAccounts();
		dispatch({
			type: 'SET_WALLET_CONNECTED',
			payload: connection,
		});

		dispatch({
			type: 'SET_CURRENT_ACCOUNT',
			payload: accounts[0],
		});
	};

	const setMintAmount = (newMintAmount) => {
		dispatch({
			type: 'SET_MINT_AMOUNT',
			payload: newMintAmount,
		});
	};

	useEffect(() => {
		connectWallet();
	}, []);

	return (
		<WalletContext.Provider
			value={{
				...state,
				setMintAmount,
				connectWallet,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
}

export { WalletContext, WalletProvider };
