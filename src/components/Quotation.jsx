import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';

const QuotationDiv = styled.div`
  color: white;
  span{
    font-weight: bold;
  }

`

const Info = styled.p`
  font-size: 18px;
  span{
    font-weight: bold;
  }
`

const Price = styled.p`
  font-size: 25px;
`

function Quotation({ quotation }) {
	if (Object.keys(quotation).length === 0) return null;
	return (
		<QuotationDiv>
			<Price>
				Price is: <span>{quotation.PRICE}</span>
			</Price>
			<Info>
				High Price: <span>{quotation.HIGHDAY}</span>
			</Info>
			<Info>
				Low Price: <span>{quotation.LOWDAY}</span>
			</Info>
			<Info>
				Change Variation: <span>{quotation.CHANGEPCT24HOUR}</span>
			</Info>
			<Info>
				Last update: <span>{quotation.LASTUPDATE}</span>
			</Info>
		</QuotationDiv>
	);
}

Quotation.propTypes = {
	quotation: PropTypes.object.isRequired
};

export default Quotation;
