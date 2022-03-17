import cookies from 'js-cookie'
import Formsy from 'formsy-react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import api from '../services/api'
import events from '../services/events'
import history from '../services/history'
import notify from '../services/notify'
import useQuery from '../hooks/useQuery'
import useUtm from '../hooks/useUtm'
import { localStorage } from '../services/localstorage'
import { t } from '../locales'

import AuthenticationFooter from './AuthenticationFooter'
import AuthenticationOmniAuth from './AuthenticationOmniAuth'
import AuthenticationSeparator from './AuthenticationSeparator'
import Input from './Input'
import PageSubtitle from './PageSubtitle'
import { Btn } from './styled/Button'
import { media } from './styled/Grid'

const Actions = styled.section`
  display: flex;
  flex-direction: column-reverse;
  flex-wrap: wrap;

  margin: 16px 0 0;

  form {
    div {
      margin-bottom: 16px;
    }

    button {
      margin-top: 8px;
    }
  }

  ${media.md`
    display: block;
    margin: 40px 0 0;
  `}
`

const Submit = styled(Btn)`
  margin-top: 20px;
`

const Title = styled(PageSubtitle)`
  text-align: center;

  margin: 0px 23px 16px;

  ${media.md`
    font-size: 24px;
    line-height: 24px;
    letter-spacing: -0.5px;

    margin: 0px 23px 40px;
  `}
`

const AuthenticationSignup = () => {
  const query = useQuery()
  const { referrer } = query

  const locale = useSelector((state) => state.application.locale)

  const { getUtmSource, getUtmMedium, clearUtmSource, clearUtmMedium } = useUtm()

  const mobileApp = !!process.env.CORDOVA

  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const cvSample = localStorage.getItem('vcv_sample')

  const onSignedUp = (data) => {
    if (window.growsumo) {
      window.growsumo.data.name = data.full_name
      window.growsumo.data.email = data.email
      window.growsumo.data.customer_key = data.recurly_account_code
      window.growsumo.createSignup()
    }

    events.emit('SESSION::INIT', data)

    cookies.remove('vcv_referrer')

    clearUtmSource()
    clearUtmMedium()

    history.push('/?event=signup')
  }

  const onError = (error) => {
    setSubmitting(false)

    notify.error(t('signup_error'))

    setErrors(error?.response?.data)
  }

  const handleSubmit = ({ full_name: fullName, email, password }) => {
    setSubmitting(true)

    const nameParts = (fullName || '').split(/\s+/)

    const data = {
      first_name: nameParts.splice(0, 1)[0],
      last_name: nameParts.join(' '),
      email,
      password,
      client: process.env.CORDOVA ? 'mobile' : 'web',
      referrer: referrer || cookies.get('vcv_referrer') || '',
      utm_source: getUtmSource(),
      utm_medium: getUtmMedium(),
    }

    if (locale) {
      data.locale = locale
    }

    localStorage.setItem('vcv_login', data.email)

    api.signup(data).then(onSignedUp).catch(onError)
  }

  return (
    <>
      <Title>{cvSample ? t('sign_up_to_use_sample') : t('create_free_account')}</Title>

      <Actions>
        {!mobileApp && <AuthenticationOmniAuth action="signup" />}

        {!mobileApp && <AuthenticationSeparator>{t('or')}</AuthenticationSeparator>}

        <Formsy
          onSubmit={handleSubmit}
          validationErrors={errors}>
          <Input
            type="text"
            name="full_name"
            placeholder={t('full_name')}
            autoComplete="name"
            required={true}
            value=""
          />

          <Input
            type="email"
            name="email"
            placeholder={t('email')}
            autoComplete="email"
            required={true}
            value=""
          />

          <Input
            type="password"
            name="password"
            placeholder={t('password')}
            autoComplete="new-password"
            minLength="8"
            maxLength="255"
            required={true}
            value=""
          />

          <Submit
            type="submit"
            big
            fluid
            disabled={submitting}>
            {t('signup')}
          </Submit>
        </Formsy>
      </Actions>

      <AuthenticationFooter />
    </>
  )
}

export default AuthenticationSignup
