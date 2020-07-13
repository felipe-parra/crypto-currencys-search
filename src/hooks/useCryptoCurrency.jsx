import React, { useState } from 'react';
import styled from '@emotion/styled';

const Label = styled.label`
	font-family: 'Oxygen', Arial, Helvetica, sans-serif;
	color: #fff;
	text-transform: uppercase;
	font-weight: bold;
	font-size: 1.4rem;
	margin-top: 2rem;
	display: block;
`;

const Select = styled.select`
  font-family: 'Oxygen', Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
	width: 100%;
	display: block;
	padding: 1rem;
	--webkit-appearance: none;
	border-radius: 10px;
	border: none;
`;

const useCryptoCurrency = (label, initialState, options) => {
	// State of custom hook
	const [ state, setState ] = useState(initialState);

	const handleChange = (e) => {
		setState(e.target.value);
	};

	const SelectCrypto = () => (
		<React.Fragment>
			<Label htmlFor="currency">{label} </Label>
			<Select onChange={handleChange} value={state} name="currency" id="currency">
				<option value="">-- Choose ---</option>
				{options.map(({ CoinInfo }, i) => (
					<option key={CoinInfo.Id} value={CoinInfo.Name}>
						{CoinInfo.FullName}
					</option>
				))} 
			</Select>
		</React.Fragment>
	);
	// return state, interface and function to change state
	return [ state, SelectCrypto, setState ];
};

export default useCryptoCurrency;
