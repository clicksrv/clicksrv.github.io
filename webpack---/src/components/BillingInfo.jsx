import cookies from 'js-cookie'
import NProgress from 'nprogress'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

import api from '../services/api'
import countries from '../constants/countries'
import history from '../services/history'
import notify from '../services/notify'
import provinces from '../constants/provinces'
import states from '../constants/states'
import useOnboarding from '../hooks/useOnboarding'
import { greenSuccess, greyLightest, primary, redDanger, redErrorLighter } from '../colors'
import { configureRecurly } from '../helpers/payments'
import { media } from './styled/Grid'
import { t } from '../locales'
import { trackEvent, trackTransaction } from '../helpers/analytics'

import visaLogo from '../assets/images/logos/visa.svg'
import mastercardLogo from '../assets/images/logos/mastercard.svg'
import amex from '../assets/images/logos/amex.svg'
import LogoPayPal from '../assets/images/billing/paypal.png'
import CheckoutOrderSummary from './CheckoutOrderSummary'
import CheckoutSecurePayment from './CheckoutSecurePayment'
import CheckoutRecurlyPayment from './CheckoutRecurlyPayment.jsx'

import BillingInputCreditCard from './BillingInputCreditCard'
import BillingInputFirstName from './BillingInputFirstName'
import BillingInputLastName from './BillingInputLastName'
import BillingInputPostalCode from './BillingInputPostalCode'
import ButtonApplePay from './ButtonApplePay'
import ButtonPayPal from './ButtonPayPal'
import Select from './forms/Select'
import { Btn } from './styled/Button'

const featuredCountries = ['US', 'GB', 'CA', 'AU', 'IN', 'CN']

const Logo = styled.img`
  margin-left: 8px;
`

const Logos = styled.div`
  display: flex;
  margin-left: auto;
`

const SecurityBox = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: max(calc(100% - 360px), 16px);
  justify-content: space-between;
`

const PaymentRadio = styled.input`
  margin-right: 8px;
  pointer-events: none;
`

const PaymentLabel = styled.label`
  color: black;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  pointer-events: none;
`

const CCForm = styled.form`
  opacity: 0;
  overflow: visible;
  transition: all 0.5s;

  margin-top: -40px;
  max-height: 0px;
  width: 100%;
`

const AddressCountryPostalCode = styled.div`
  display: grid;
  gap: 0 16px;
  grid-template-columns: calc(50% - 8px) calc(50% - 8px);
  margin-top: 20px;

  && {
    // represents <select>'s container
    > div {
      margin-bottom: 20px;
      width: 100%;

      ${(props) =>
        props.checkoutFlow &&
        media.sm`
        margin-right: 15px;
      `}

      &::after {
        right: 19px;
        top: 11px;
      }
    }

    // country
    select {
      width: 100%;
    }

    // postal code
    input {
      margin-bottom: 20px;
      width: 100%;
    }
  }
`

const Error = styled.p`
  color: ${redDanger};
  font-size: 13px;
`

const updateBillingStyles = css`
  ${PaymentRadio},
  ${PaymentLabel},
  ${Logos} {
    display: none;
  }

  &&& ${CCForm} {
    border-top: unset;
    margin-top: unset;
  }

  ${AddressCountryPostalCode} {
    grid-template-columns: unset;
  }

  ${SecurityBox} {
    display: none;
  }
`

const Accordion = styled.div`
  animation: fadeIn 0.3s;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 1px 1px rgb(62 148 228 / 25%);
  cursor: ${({ checked }) => (checked ? 'initial' : 'pointer')};

  align-items: center;
  display: ${({ hideApplePay }) => (hideApplePay ? 'none' : 'flex')};
  flex-wrap: wrap;

  margin-bottom: 14px;
  overflow: hidden;
  padding: 24px;

  ${PaymentRadio}:checked ~ ${PaymentLabel} {
    color: grey;
  }

  ${PaymentRadio}:checked ~ ${CCForm} {
    border-top: 1px solid ${greyLightest};
    opacity: 1;

    margin-top: 15px;
    max-height: 800px;
    padding-top: 12px;
  }

  ${({ updateBillingFlow }) => updateBillingFlow && updateBillingStyles}
`

const Container = styled.div`
  .recurly-hosted-field {
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);

    height: 50px;
    padding-left: 12px;
    padding-right: 7px;
  }

  input[type='text'] {
    appearance: none;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    color: black;
    font-family: Helvetica;
    font-size: 15px;
    font-weight: 500;
    line-height: 140%;

    display: block;
    padding: 13px 18px;
    margin-bottom: 20px;
    width: 100%;

    // Style inputs to match Recurly's CC input
    -webkit-font-smoothing: auto;

    ::placeholder {
      color: #999;
      font-weight: 300;
    }
  }

  select {
    border-radius: 4px;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);
    color: black;
    font-family: Helvetica;
    font-size: 15px;
    font-weight: 500;

    &:hover {
      border-color: #9b9b9b;
    }

    &:focus {
      background-color: white;
      border-color: ${primary};
    }

    &:valid {
      border-color: ${greenSuccess};
    }
  }

  .recurly-hosted-field:hover,
  input[type='text']:hover {
    border-color: #9b9b9b;
  }

  && .recurly-hosted-field-focus,
  input[type='text']:focus,
  input[type='text'].has-error:focus {
    background-color: white;
    border-color: ${primary};
    color: black;
  }

  && .recurly-hosted-field-invalid,
  input[type='text'].has-error {
    background-color: ${redErrorLighter};
    border-color: ${redDanger};
    color: ${redDanger};
  }

  && .recurly-hosted-field-valid,
  input[type='text']:valid {
    border-color: ${greenSuccess};
  }
`

const BillingName = styled.div`
  display: grid;
  gap: 0 16px;
  grid-template-columns: auto;

  ${media.sm`
    grid-template-columns: auto auto;
  `}
`

const AddressStreet = styled.div``

const AddressPostalCodeCity = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  input[type='text'] {
    flex: 1 1 auto;
  }

  // postal code
  input[type='text']:first-child {
    flex: none;
    margin-right: 18px;
    width: 130px;
  }

  // city
  input[type='text']:last-child {
    min-width: 120px;
    width: 0;
  }
`

const AddressRegion = styled.div`
  margin-bottom: 20px;
`

const ActionsMain = styled.div`
  button {
    margin-bottom: 15px;
    margin-top: 15px;
    box-shadow: 0px 2px 4px rgba(98, 54, 255, 0.5), 0px 6px 6px 2px rgba(98, 54, 255, 0.15);
  }
`

const ActionsAlternative = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;

  button {
    flex: 1 1 auto;
    padding: 15px 20px;
    width: auto;
  }
`

const BillingInfo = ({ billingInfo, cart, couponCode, loading, planCode, setUpgraded, total }) => {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const [recurlyReady, setRecurlyReady] = useState(false)

  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  const [firstName, setFirstName] = useState(billingInfo?.first_name || '')
  const [firstNameInvalid, setFirstNameInvalid] = useState(false)

  const [lastName, setLastName] = useState(billingInfo?.last_name || '')
  const [lastNameInvalid, setLastNameInvalid] = useState(false)

  const [postalCode, setPostalCode] = useState(billingInfo?.address?.postal_code || '')
  const [postalCodeInvalid, setPostalCodeInvalid] = useState(false)

  const [city, setCity] = useState(billingInfo?.address?.city || '')
  const [street1, setStreet1] = useState(billingInfo?.address?.street1 || '')
  const [street2, setStreet2] = useState(billingInfo?.address?.street2 || '')

  const [hideApplePay, setHideApplePay] = useState(true)

  const dispatch = useDispatch()

  const { onboarding, nextOnboardingStep } = useOnboarding()

  const initialCountry = billingInfo?.address?.country_code || 'US'
  const initialState = billingInfo?.address?.region || Object.keys(states)[0]
  const initialProvince = billingInfo?.address?.region || Object.keys(provinces)[0]

  const [country, setCountry] = useState(initialCountry)
  const [state, setState] = useState(initialCountry === 'CA' ? initialProvince : initialState || '')

  const formRef = useRef(null)

  const updateBillingFlow = !planCode
  const checkoutFlow = !updateBillingFlow

  useEffect(() => {
    if (loading) {
      return
    }

    // configure payment gateway
    configureRecurly()

    setRecurlyReady(true)
  }, [loading])

  const creditCard = paymentMethod === 'credit-card'
  const payPal = paymentMethod === 'paypal'
  const applePay = paymentMethod === 'apple-pay'

  const applePayRequestStarted = () => {
    setError(null)
  }

  const requestStarted = () => {
    setSubmitting(true)
    setError(null)

    NProgress.start()
  }

  const fieldsErrorHandlers = {
    first_name: setFirstNameInvalid,
    last_name: setLastNameInvalid,
    postal_code: setPostalCodeInvalid,
  }

  const setErrorFields = (fields) => fields.forEach((field) => fieldsErrorHandlers[field]?.(true))

  const onError = (error) => {
    console.error(error)

    setSubmitting(false)

    NProgress.done()

    setError(error.message)

    const { fields } = error

    if (fields) {
      setErrorFields(fields)
    }
  }

  const onCreateSubscriptionError = (error) => {
    onError(error)

    notify.error(t('checkout_generic'))
  }

  const onUpdateBillingError = (error) => {
    onError(error)

    notify.error(t('update_billing_error'))
  }

  const onSubscriptionApiError = (error) => {
    if (error?.response?.data) {
      // most likely a handled 422 error
      onError(error.response.data)
    } else {
      // generic error
      onError(error)
    }

    notify.error(t('checkout_generic'))
  }

  const onBillingApiError = (error) => {
    if (error?.response?.data) {
      // most likely a handled 422 error
      onError(error.response.data)
    } else {
      // generic error
      onError(error)
    }

    notify.error(t('update_billing_error'))
  }

  const onSubscriptionCreated = (data) => {
    setUpgraded(true)
    setSubmitting(false)

    NProgress.done()

    trackTransaction(data.transaction_data)

    // remove any stored plans/coupons as user upgraded
    cookies.remove('vcv_plan')
    cookies.remove('vcv_coupon')

    const { user } = data

    // set updated `user` in store
    dispatch({
      type: 'SETTINGS::PATCH',
      data: user,
    })

    if (onboarding) {
      nextOnboardingStep()
    } else {
      history.push('/upload')
    }
  }

  const createSubscription = (token) => {
    NProgress.inc(0.3)

    const data = {
      token_id: token.id,
      plan_code: planCode,
      coupon_code: couponCode,
    }

    api.createSubscription(data).then(onSubscriptionCreated).catch(onSubscriptionApiError)
  }

  const onBillingUpdated = () => {
    setSubmitting(false)

    notify.success(t('billing_info_updated'))

    history.push('/account')
  }

  const updateBilling = (token) => {
    trackEvent('updated-billing-info', 'interaction')

    api.updateBillingInfo(token.id).then(onBillingUpdated).catch(onBillingApiError)
  }

  const handleUpgrade = (e) => {
    e.preventDefault()
    requestStarted()

    recurly.token(formRef.current, (recurlyError, token) =>
      recurlyError ? onCreateSubscriptionError(recurlyError) : createSubscription(token)
    )
  }

  const handleBillingUpdate = (e) => {
    e.preventDefault()
    requestStarted()

    recurly.token(formRef.current, (recurlyError, token) =>
      recurlyError ? onUpdateBillingError(recurlyError) : updateBilling(token)
    )
  }

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value

    const selectedState = selectedCountry === 'US' ? initialState : country === 'CA' ? initialProvince : ''

    setCountry(selectedCountry)
    setState(selectedState)
  }

  const handleStateChange = (e) => setState(e.target.value)
  const handleCityChange = (e) => setCity(e.target.value)
  const handleStreet1Change = (e) => setStreet1(e.target.value)
  const handleStreet2Change = (e) => setStreet2(e.target.value)

  const choosePaymentMethod = (method) => () => {
    if (method !== paymentMethod) {
      setError(null)
      setPaymentMethod(method)
    }
  }

  return (
    <Container>
      <Accordion
        checked={creditCard}
        onClick={choosePaymentMethod('credit-card')}
        updateBillingFlow={updateBillingFlow}>
        <PaymentRadio
          checked={creditCard}
          name="paymentType"
          readOnly
          type="radio"
          value="credit-card"
        />

        <PaymentLabel>{t('pay_with_card')}</PaymentLabel>

        <Logos>
          <Logo
            alt="Visa"
            src={visaLogo}
          />

          <Logo
            alt="Mastercard"
            src={mastercardLogo}
          />

          <Logo
            alt="Amex"
            src={amex}
          />
        </Logos>

        <CCForm ref={formRef}>
          <input
            data-recurly="token"
            name="recurly-token"
            type="hidden"
          />

          {cart && <CheckoutOrderSummary cart={cart} />}

          <BillingName>
            <BillingInputFirstName
              invalid={firstNameInvalid}
              setInvalid={setFirstNameInvalid}
              setValue={setFirstName}
              value={firstName}
            />

            <BillingInputLastName
              invalid={lastNameInvalid}
              setInvalid={setLastNameInvalid}
              setValue={setLastName}
              value={lastName}
            />
          </BillingName>

          <BillingInputCreditCard />

          <AddressCountryPostalCode checkoutFlow={checkoutFlow}>
            <Select
              autoComplete="country"
              data-recurly="country"
              onChange={handleCountryChange}
              required
              value={country}>
              {featuredCountries.map((countryCode) => (
                <option
                  key={countryCode}
                  value={countryCode}>
                  {countries[countryCode]}
                </option>
              ))}

              <option
                value=""
                disabled="disabled">
                ---------------
              </option>

              {Object.keys(countries).map((countryCode) => (
                <option
                  key={countryCode}
                  value={countryCode}>
                  {countries[countryCode]}
                </option>
              ))}
            </Select>

            {checkoutFlow && (
              <BillingInputPostalCode
                country={country}
                invalid={postalCodeInvalid}
                setInvalid={setPostalCodeInvalid}
                setValue={setPostalCode}
                value={postalCode}
              />
            )}
          </AddressCountryPostalCode>

          {updateBillingFlow && (
            <AddressRegion>
              {['US', 'CA'].includes(country) ? (
                <Select
                  autoComplete="address-level1"
                  data-recurly="state"
                  onChange={handleStateChange}
                  value={state}>
                  {Object.entries(country === 'US' ? states : provinces).map(([regionCode, region]) => (
                    <option
                      key={regionCode}
                      value={regionCode}>
                      {region}
                    </option>
                  ))}
                </Select>
              ) : (
                <input
                  autoComplete="address-level1"
                  data-recurly="state"
                  onChange={handleStateChange}
                  placeholder={t('region')}
                  type="text"
                  value={state}
                />
              )}
            </AddressRegion>
          )}

          {updateBillingFlow && (
            <AddressPostalCodeCity>
              <BillingInputPostalCode
                country={country}
                invalid={postalCodeInvalid}
                setInvalid={setPostalCodeInvalid}
                setValue={setPostalCode}
                value={postalCode}
              />

              <input
                autoComplete="address-level2"
                data-recurly="city"
                onChange={handleCityChange}
                placeholder={t('municipality')}
                type="text"
                value={city}
              />
            </AddressPostalCodeCity>
          )}

          {updateBillingFlow && (
            <AddressStreet>
              <input
                autoComplete="street-address"
                data-recurly="address1"
                onChange={handleStreet1Change}
                placeholder={t('address_line_1')}
                type="text"
                value={street1}
              />

              <input
                autoComplete="address-line2"
                data-recurly="address2"
                onChange={handleStreet2Change}
                placeholder={t('address_line_2')}
                type="text"
                value={street2}
              />
            </AddressStreet>
          )}

          {error && creditCard && <Error>{error}</Error>}

          <ActionsMain>
            {checkoutFlow && (
              <Btn
                cta
                big
                fluid
                type="submit"
                onClick={handleUpgrade}
                disabled={!recurlyReady || submitting}>
                {t('upgrade_now')}
              </Btn>
            )}

            {updateBillingFlow && (
              <Btn
                cta
                big
                fluid
                type="submit"
                onClick={handleBillingUpdate}
                disabled={!recurlyReady || submitting}>
                {t('submit')}
              </Btn>
            )}
          </ActionsMain>

          <SecurityBox>
            <CheckoutRecurlyPayment />
            <CheckoutSecurePayment />
          </SecurityBox>
        </CCForm>
      </Accordion>

      {checkoutFlow && (
        <>
          <Accordion
            checked={payPal}
            onClick={choosePaymentMethod('paypal')}>
            <PaymentRadio
              type="radio"
              name="paymentType"
              checked={payPal}
              value="paypal"
              readOnly
            />

            <PaymentLabel>{t('pay_with_paypal')}</PaymentLabel>

            <Logos>
              <Logo
                src={LogoPayPal}
                alt="Paypal"
                height="20"
              />
            </Logos>

            <CCForm as="div">
              {cart && <CheckoutOrderSummary cart={cart} />}

              {error && payPal && <Error>{error}</Error>}

              <ButtonPayPal
                recurlyReady={recurlyReady}
                submitting={submitting}
                onRequestStarted={requestStarted}
                onError={onError}
                onSuccess={createSubscription}
              />
            </CCForm>
          </Accordion>

          <Accordion
            hideApplePay={hideApplePay}
            checked={applePay}
            onClick={choosePaymentMethod('apple-pay')}
            fadeIn>
            <PaymentRadio
              type="radio"
              name="paymentType"
              checked={applePay}
              value="apple-pay"
              readOnly
            />

            <PaymentLabel>{t('pay_with_apple_pay')}</PaymentLabel>

            <CCForm as="div">
              {cart && <CheckoutOrderSummary cart={cart} />}

              {error && applePay && <Error>{error}</Error>}

              <ActionsAlternative>
                <ButtonApplePay
                  total={total}
                  recurlyReady={recurlyReady}
                  onRequestStarted={applePayRequestStarted}
                  onError={onError}
                  onSuccess={createSubscription}
                  setHideApplePay={setHideApplePay}
                />
              </ActionsAlternative>
            </CCForm>
          </Accordion>
        </>
      )}
    </Container>
  )
}

BillingInfo.propTypes = {
  billingInfo: PropTypes.object,
  cart: PropTypes.object,
  couponCode: PropTypes.string,
  loading: PropTypes.bool,
  planCode: PropTypes.string,
  setUpgraded: PropTypes.func,
  total: PropTypes.number,
}

export default BillingInfo
