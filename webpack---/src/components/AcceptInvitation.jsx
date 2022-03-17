import agent from 'superagent'
import NProgress from 'nprogress'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import conf from '../conf'
import events from '../services/events'
import history from '../services/history'
import notify from '../services/notify'
import useQuery from '../hooks/useQuery'
import { t } from '../locales'

import AuthenticationFooter from './AuthenticationFooter'
import PageTitle from './PageTitle'
import WelcomeContainer from './WelcomeContainer'
import { Btn } from './styled/Button'
import { FormBuilder, updatePasswordFormSchema } from './forms'

const Content = styled.section`
  margin: 50px auto 40px;
  width: 350px;
`

const AcceptInvitation = () => {
  const [errors, setErrors] = useState({})
  const query = useQuery()
  const locale = useSelector((state) => state.application.locale)

  const submit = (formData = {}) => {
    const credentials = {
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      invitation_token: query.invitation_token,
      client: process.env.CORDOVA ? 'mobile' : 'web',
    }

    if (locale) {
      credentials.locale = locale
    }

    NProgress.start()

    // TODO: this should be done inside of an action instead of inside the component
    agent.post(conf.endpoint('invitation/accept'), credentials).end((error, res = {}) => {
      NProgress.done()

      if (error) {
        notify.error(error.message)

        if (res) {
          setErrors(res.body)
        }
      } else {
        if (window.growsumo) {
          window.growsumo.data.name = res.body.full_name
          window.growsumo.data.email = res.body.email
          window.growsumo.data.customer_key = res.body.recurly_account_code
          window.growsumo.createSignup()
        }

        events.emit('SESSION::INIT', res.body)

        history.push('/?event=signup')
      }
    })
  }

  const formData = {
    password: '',
    password_confirmation: '',
  }

  return (
    <WelcomeContainer>
      <PageTitle>{t('quick_signup_btn')}</PageTitle>

      <Content>
        <FormBuilder
          formData={formData}
          schema={updatePasswordFormSchema}
          onValidSubmit={submit}
          validationErrors={errors}>
          <Btn
            type="submit"
            big
            wide>
            {t('accept_invitation')}
          </Btn>
        </FormBuilder>
      </Content>

      <AuthenticationFooter />
    </WelcomeContainer>
  )
}

export default AcceptInvitation
