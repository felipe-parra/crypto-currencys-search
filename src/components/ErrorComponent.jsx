import React from 'react'
import styled from '@emotion/styled'
import PropTypes from 'prop-types'


const ErrorMessage = styled.p`
  background-color: var(--error-bg);
  padding: 1rem;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  font-weight: bold;
  text-align: center;
  font-family: 'Oxygen', Arial, Helvetica, sans-serif;
`



function ErrorComponent({message = "Error"}) {

  return (
    <ErrorMessage>
      {message}
    </ErrorMessage>
  )
}

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired
}

export default ErrorComponent