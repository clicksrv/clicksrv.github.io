import Formsy from 'formsy-react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import api from '../services/api'
import history from '../services/history'
import notify from '../services/notify'
import useJournalOnboarding from '../hooks/useJournalOnboarding'
import { media } from './styled/Grid'
import { trackEvent } from '../helpers/analytics'
import { t } from '../locales'

import journalAnalytics from '../assets/images/journal-analytics.png'

import InputRadioGroup from './InputRadioGroup'
import { Btn } from './styled/Button'

const Container = styled.div`
  font-size: 15px;
  font-weight: 300;

  display: flex;
  justify-content: space-between;

  margin: 50px 15px 50px;
`

const Content = styled.div``

const BtnSubmit = styled(Btn)`
  margin-top: 50px;
`

const Image = styled.img`
  display: none;

  ${media.md`
    display: block;
    margin-right: -80px;
    max-height: 405px;
    max-width: 450px;
  `}

  ${media.lg`
    margin-right: -120px;
    max-width: 568px;
    max-height: 512px;
  `}
`

const Info = styled.p`
  font-size: 14px;

  margin-top: 15px;
`

const JournalEmailSettingsForm = () => {
  const dispatch = useDispatch()
  const [selected, setSelected] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const { nextOnboardingStepPath, onboarding } = useJournalOnboarding()
  const user = useSelector((state) => state.session.user)

  const { journal_reminders: journalReminders } = user

  useEffect(() => {
    setSelected(!!journalReminders)
  }, [journalReminders])

  const formItems = [
    { value: 'daily', label: t('daily_email_reminder') },
    { value: 'weekly', label: t('weekly_email_reminder') },
    { value: 'monthly', label: t('monthly_email_reminder') },
  ]

  const onError = () => {
    setSubmitting(false)

    notify.error(t('email_reminders_update_error'))
  }

  const onJournalUpdated = (data) => {
    trackEvent('updated-journal-reminders', 'interaction')

    if (onboarding) {
      history.push(nextOnboardingStepPath)
    } else {
      notify.success(t('email_reminders_updated'))

      history.push('/journal')
    }

    dispatch({ type: 'USER::SET_JOURNAL_REMINDERS', data })
  }

  const onSubmit = (form) => {
    setSubmitting(true)

    api.updateJournal(form).then(onJournalUpdated).catch(onError)
  }

  const onChange = () => setSelected(true)

  return (
    <Container>
      <Content>
        <Formsy
          onChange={onChange}
          onSubmit={onSubmit}>
          <InputRadioGroup
            items={formItems}
            name="reminders"
            value={journalReminders}
          />

          <BtnSubmit
            type="submit"
            big
            disabled={submitting || !selected}>
            {t('save_settings')}
          </BtnSubmit>
        </Formsy>

        {onboarding && <Info>{t('can_change_settings')}</Info>}
      </Content>

      <Image src={journalAnalytics} />
    </Container>
  )
}

export default JournalEmailSettingsForm
