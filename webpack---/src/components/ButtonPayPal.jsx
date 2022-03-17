import PropTypes from 'prop-types'
import { useLayoutEffect, useState } from 'react'
import styled from 'styled-components'

import LogoPayPal from '../assets/images/billing/paypal.png'
import { Btn } from './styled/Button'

const Button = styled(Btn)`
  background-color: #ffc439;
  border-color: #ffc439;
  border-radius: 4px;

  height: 56px;
  width: 100%;

  &:hover {
    background-color: #f3b82f;
    border-color: #f3b82f;
  }

  img {
    height: 24px;
  }
`

const ButtonPayPal = ({ recurlyReady, submitting, onRequestStarted, onError, onSuccess }) => {
  const [payPal, setPayPal] = useState(null)

  useLayoutEffect(() => {
    if (!recurlyReady) {
      return
    }

    // Configure Recurly
    const recurlyPayPal = recurly.PayPal({
      display: {
        displayName: 'VisualCV',
      },
    })

    recurlyPayPal.on('error', onError)
    recurlyPayPal.on('token', onSuccess)

    setPayPal(recurlyPayPal)
  }, [recurlyReady, onSuccess, onError])

  if (!recurlyReady) {
    return null
  }

  const handlePayPal = () => {
    onRequestStarted()

    payPal.start()
  }

  return (
    <Button
      big
      hollow
      fluid
      onClick={handlePayPal}
      disabled={!recurlyReady || submitting}>
      <img
        src={LogoPayPal}
        alt="PayPal"
      />
    </Button>
  )
}

ButtonPayPal.propTypes = {
  recurlyReady: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  onRequestStarted: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default ButtonPayPal
