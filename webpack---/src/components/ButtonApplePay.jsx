import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { t } from '../locales'

const Button = styled.button`
  cursor: pointer;
  height: 56px;

  @supports (-webkit-appearance: -apple-pay-button) {
    -webkit-appearance: -apple-pay-button;
    -apple-pay-button-style: black;
    -apple-pay-button-type: subscribe;
  }

  @supports not (-webkit-appearance: -apple-pay-button) {
    background-image: -webkit-named-image(apple-pay-logo-white);
    background-color: black;
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: 100% 60%;
    border-radius: 4px;
  }
`

const ButtonApplePay = ({ total, recurlyReady, onRequestStarted, onError, onSuccess, setHideApplePay }) => {
  const [applePay, setApplePay] = useState(null)
  const [applePayReady, setApplePayReady] = useState(false)

  const locale = useSelector((state) => state.application.locale)

  const browserEnv = typeof window !== 'undefined'
  const canMakePayments = window.ApplePaySession && ApplePaySession.canMakePayments()

  const applePayAvailable = browserEnv && canMakePayments

  useEffect(() => {
    if (!recurlyReady || !applePayAvailable) {
      return
    }

    // Configure Apple Pay
    const totalApplePay = Number(total / 100).toFixed(2)

    const recurlyApplePay = recurly.ApplePay({
      country: 'CA',
      currency: 'USD',
      label: 'VisualCV',
      total: totalApplePay,
    })

    recurlyApplePay.ready(() => setApplePayReady(true))

    recurlyApplePay.on('cancel', () => onError({ message: t('payment_canceled') }))
    recurlyApplePay.on('error', onError)
    recurlyApplePay.on('token', onSuccess)

    setApplePay(recurlyApplePay)
  }, [recurlyReady, applePayAvailable, total, onSuccess, onError])

  if (!recurlyReady || !applePayAvailable || !applePayReady) {
    return null
  }

  if (recurlyReady && applePayAvailable && applePayReady) {
    setHideApplePay(false)
  }

  const handleApplePay = () => {
    onRequestStarted()

    applePay.begin()
  }

  return (
    <Button
      lang={locale}
      onClick={handleApplePay}
      title="Apple Pay"
    />
  )
}

ButtonApplePay.propTypes = {
  total: PropTypes.number.isRequired,
  recurlyReady: PropTypes.bool.isRequired,
  setHideApplePay: PropTypes.func,
  onRequestStarted: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
}

export default ButtonApplePay
