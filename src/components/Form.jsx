import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import useCurrency from '../hooks/useCurrency';
import useCryptoCurrency from '../hooks/useCryptoCurrency';
import axios from 'axios';
import ErrorComponent from './ErrorComponent';
import PropTypes from 'prop-types'


const API_CRYPTOS_CURRENCYS = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;

const Button = styled.input`
	margin-top: 20px;
	font-weight: bold;
	font-size: 20px;
	padding: 10px;
	background-color: var(--primary);
	border: none;
	width: 100%;
	border-radius: 10px;
	color: #fff;

	&:hover {
		background-color: var(--primary-accent);
		cursor: pointer;
	}
`;

const CURRENCYS = [
	{
		code: 'MXN',
		name: 'Mexican Peso'
	},
	{
		code: 'USD',
		name: 'US Dollar'
	},
	{
		code: 'EUR',
		name: 'Euro'
	},
	{
		code: 'GBP',
		name: 'Pound Sterling'
	},
	{
		code: 'COP',
		name: 'Colombian Peso'
	}
];

function Form({ setCurrency, setCryptoCurrency }) {
	// state list of crypto currencys
	const [ cryptoList, setCryptoList ] = useState([]);
	// error state
	const [ error, setError ] = useState(false);

	// use useCurrency hook
	const [ state, SelectCurrency ] = useCurrency('Choose your currency', '', CURRENCYS);
	const [ crypto, SelectCrypto ] = useCryptoCurrency('Choose crypto currency', '', cryptoList);

	// call to API
	useEffect(() => {
		const fetchData = async () => {
			const { data } = await axios.get(API_CRYPTOS_CURRENCYS);
			setCryptoList(data.Data);
		};
		fetchData();
	}, []);
	// handle submit of form to search qouation
	const HandleSubmit = (e) => {
		e.preventDefault();

		console.log(state, crypto, error);

		// validation
		if (state === '' || crypto === '') {
			setError(true);

			return;
		}
		// reset
		setError(false);

		// pass to main component
		setCurrency(state);
		setCryptoCurrency(crypto);
	};

	return (
		<form onSubmit={HandleSubmit}>
			{error ? <ErrorComponent message="All fields are required" /> : null}

			<SelectCurrency />
			<SelectCrypto />
			<Button value="Search" type="submit" />
		</form>
	);
}

Form.propTypes = {
	setCurrency: PropTypes.func.isRequired, 
	setCryptoCurrency: PropTypes.func.isRequired
}

export default Form;
