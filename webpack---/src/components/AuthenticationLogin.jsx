import Formsy from 'formsy-react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useState } from 'react'

import api from '../services/api'
import events from '../services/events'
import useQuery from '../hooks/useQuery'
import history from '../services/history'
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

const LinkResetPassword = styled(Link)`
  font-size: 15px;

  float: right;
  margin: 8px 0 16px;

  ${media.md`
    margin: 0 0 20px;
  `}
`

const Title = styled(PageSubtitle)`
  text-align: center;

  margin: 0px 23px 40px;

  ${media.md`
    font-size: 24px;
    line-height: 24px;
    letter-spacing: -0.5px;
  `}
`

const FormContent = styled.div``

const AuthenticationLogin = () => {
  const query = useQuery()

  // OmniAuth errors: backend will redirect here with "?error=..." query string
  const initialErrors = query.error ? { password: query.error } : {}

  const [errors, setErrors] = useState(initialErrors)

  const [submitting, setSubmitting] = useState(false)

  const mobileApp = !!process.env.CORDOVA

  const onLoggedIn = (data) => {
    events.emit('SESSION::INIT', data)

    history.push('/?event=signin')
  }

  const onError = (error) => {
    setSubmitting(false)

    setErrors(error?.response?.data)
  }

  const handleSubmit = (formData) => {
    setSubmitting(true)

    localStorage.setItem('vcv_login', formData.email)

    api.login(formData).then(onLoggedIn).catch(onError)
  }

  const initialEmail = localStorage.getItem('vcv_login') || ''

  return (
    <>
      <Title>{t('log_in_to')}</Title>

      <Actions>
        {!mobileApp && <AuthenticationOmniAuth action="signin" />}

        {!mobileApp && <AuthenticationSeparator>{t('or_log_in_with_email')}</AuthenticationSeparator>}

        <FormContent>
          <Formsy
            onSubmit={handleSubmit}
            validationErrors={errors}>
            <Input
              type="email"
              name="email"
              placeholder={t('email')}
              autoComplete="email"
              required
              value={initialEmail}
              showError={false}
            />

            <Input
              type="password"
              name="password"
              placeholder={t('password')}
              autoComplete="current-password"
              required
              value=""
            />

            <LinkResetPassword to="/reset-password">{t('forgot_password_prompt')}</LinkResetPassword>

            <Btn
              type="submit"
              big
              fluid
              disabled={submitting}>
              {t('login')}
            </Btn>
          </Formsy>
        </FormContent>
      </Actions>

      <AuthenticationFooter />
    </>
  )
}

export default AuthenticationLogin
