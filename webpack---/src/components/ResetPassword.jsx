import Formsy from 'formsy-react'
import styled from 'styled-components'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import events from '../services/events'
import history from '../services/history'
import http from '../helpers/http'
import notify from '../services/notify'
import useQuery from '../hooks/useQuery'
import { grey } from '../colors'
import { localStorage } from '../services/localstorage'
import { media } from './styled/Grid'
import { t } from '../locales'

import successIcon from '../assets/images/successIcon.gif'

import Input from './Input'
import PageSubtitle from './PageSubtitle'
import { Btn } from './styled/Button'

const Content = styled.section`
  margin: 40px auto 20px;
  width: 100%;

  form {
    text-align: left;

    div {
      margin-bottom: 16px;
    }
    button {
      margin-top: 8px;
    }
  }
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

const Wrapper = styled.div`
  text-align: center;
`

const SubText = styled.span`
  color: ${grey};
  font-size: 16px;
  line-height: 24px;
`

const SuccessGif = styled.img`
  max-width: 300px;
`

const ResetPassword = () => {
  const { token } = useQuery()

  const [passwordInput, setPasswordInput] = useState({})
  const [requestResetLinkErrors, setRequestResetLinkErrors] = useState({})
  const [resetPasswordErrors, setResetPasswordErrors] = useState({})
  const [resetPasswordSuccessful, setResetPasswordSuccessful] = useState(false)

  const initialEmail = localStorage.getItem('vcv_login') || ''

  const passwordProps = {
    label: t('new_password'),
    placeholder: t('new_password'),
    type: 'password',
    autoComplete: 'new-password',
    required: true,
    name: 'password',
  }

  const passwordConfirmationProps = {
    label: t('confirm_password'),
    placeholder: t('confirm_password'),
    type: 'password',
    autoComplete: 'new-password',
    required: true,
    name: 'password_confirmation',
  }

  const requestResetLink = (formData) => {
    setRequestResetLinkErrors({})

    http.post('user/request_password_reset', { user: formData }, (err, res) => {
      if (err) {
        const errors = {
          ...res.body,
          email: res.body?.email.map((err) => (err === 'not found' ? 'Email not found' : err)),
        }
        setRequestResetLinkErrors(errors)
      } else {
        notify.success(t('password_reset_instructions'))
        setResetPasswordSuccessful(true)

        setTimeout(() => {
          history.push('/login')
        }, 4000)
      }
    })
  }

  const resetPassword = (formData) => {
    setResetPasswordErrors({})

    http.post('user/reset_password', { user: { ...formData, reset_password_token: token } }, (err, res) => {
      if (err) {
        setResetPasswordErrors(res.body)
      } else {
        events.emit('SESSION::INIT', res.body)

        notify.success(t('password_reset_success'))
        setResetPasswordSuccessful(true)

        setTimeout(() => {
          history.push('/?event=signin')
        }, 4000)
      }
    })
  }

  const inputChange = (input) => {
    const passData = Object.assign(passwordInput, input)
    setPasswordInput(passData)

    if (passwordInput?.password?.length) {
      const invalidLength = passwordInput?.password?.length < 8
      const invalidMatch =
        passwordInput?.password_confirmation?.length && passwordInput?.password_confirmation !== passwordInput?.password

      const errors = {
        ...(invalidLength && { password: t('password_too_short') }),
        ...(invalidMatch && { password_confirmation: t('password_doesnt_match') }),
      }
      setResetPasswordErrors(errors)
    } else {
      setResetPasswordErrors({})
    }
  }

  return token ? (
    <Wrapper>
      <Title>{t('reset_password')}</Title>
      <SubText>{t('reset_password_subtext')}</SubText>

      <Content>
        <Formsy
          onSubmit={resetPassword}
          validationErrors={resetPasswordErrors}>
          <Input
            {...passwordProps}
            onInput={(e) => inputChange({ password: e.target.value })}
          />
          <Input
            {...passwordConfirmationProps}
            onInput={(e) => inputChange({ password_confirmation: e.target.value })}
          />
          <Btn
            type="submit"
            big
            fluid>
            {t('reset')}
          </Btn>
        </Formsy>
      </Content>
    </Wrapper>
  ) : (
    <Wrapper>
      <Title>{resetPasswordSuccessful ? t('email_sent') : t('forgot_password_prompt')}</Title>
      <SubText>{resetPasswordSuccessful ? t('password_reset_successful') : t('password_reset_unsuccessful')}</SubText>

      <Content>
        {resetPasswordSuccessful ? (
          <SuccessGif
            src={successIcon}
            alt="successIcon"
          />
        ) : (
          <Formsy
            onSubmit={requestResetLink}
            validationErrors={requestResetLinkErrors}>
            <Input
              type="email"
              name="email"
              placeholder={t('email')}
              autoComplete="email"
              required={true}
              value={initialEmail}
            />

            <Btn
              type="submit"
              big
              fluid>
              {t('send_password_reset')}
            </Btn>
          </Formsy>
        )}
      </Content>

      {!resetPasswordSuccessful && <Link to="/login">{t('login')}</Link>}
    </Wrapper>
  )
}

export default ResetPassword
