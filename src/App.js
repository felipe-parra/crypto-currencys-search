import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import image from './img/cryptomonedas.png';
import Form from './components/Form';
import Quotation from './components/Quotation';
import SpinnerComponent from './components/Spinner';


const Container = styled.div`
	max-width: 900px;
	margin: 0 auto;
	@media (min-width: 992px) {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		column-gap: 2rem;
	}
`;

const Image = styled.img`
	max-width: 100%;
	margin-top: 5rem;
`;
const Heading = styled.h1`
	font-family: 'Josefin Sans', Arial, Helvetica, sans-serif;
	color: #fff;
	text-align: left;
	font-weight: 700;
	font-size: 50px;
	margin-top: 80px;
	margin-bottom: 50px;

	&::after {
		content: '';
		width: 100px;
		height: 6px;
		background-color: var(--primary);
		display: block;
	}
`;

function App() {
	const [ quotation, setQuotation ] = useState({});
	const [ currency, setCurrency ] = useState('');
	const [ cryptCurrency, setCryptoCurrency ] = useState('');
	const [ isLoading, setIsLoading ] = useState(false);
	
	useEffect(
		() => {
			// request data from API
			const fetchData = async () => {
				// prevent run with empty fields
				if (currency === '') return;
				setIsLoading(true)
				const urlAPI = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${cryptCurrency}&tsyms=${currency}`;

				const { data } = await axios.get(urlAPI);
				// save quotation to state
				setQuotation(data.DISPLAY[cryptCurrency][currency]);
				setIsLoading(false)
			};
			fetchData();
		},
		[ currency, cryptCurrency ]
	);
	// render conditional component
	const Component = (isLoading) ? <SpinnerComponent /> : <Quotation quotation={quotation}/>

	return (
		<Container>
			<div>
				<Image src={image} alt="crypto-currency" />
			</div>
			<div>
				<Heading>Crypto Currency Search</Heading>
				<Form setIsLoading={setIsLoading} setCurrency={setCurrency} setCryptoCurrency={setCryptoCurrency} />
			{Component}
			</div>
		</Container>
	);
}

export default App;
