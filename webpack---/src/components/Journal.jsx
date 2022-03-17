import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import history from '../services/history'
import useJournalEntries from '../hooks/useJournalEntries'
import useJournalOnboarding from '../hooks/useJournalOnboarding'
import { atLimit, newPath } from '../helpers/cv'
import { buttonBig, buttonHollowBig } from '../styles/buttons'
import { media } from './styled/Grid'
import { t } from '../locales'

import JournalEntriesList from './JournalEntriesList'
import PageHeader from './PageHeader'
import Pins from './Pins'
import UpsellBanner from './UpsellBanner'

const Container = styled.section`
  background: white;

  margin: -10px;
  min-height: calc(100vh - var(--nav-bar-height));
  padding: 15px;

  ${media.sm`
    margin: -20px;
    padding: 20px;
  `}

  ${media.lg`
    padding: 30px;
  `}

  ${media.xl`
    padding: 40px;
  `}

  ${media.xxl`
    padding: 60px;
  `}
`

const Content = styled.div`
  margin: 0 auto;
  max-width: 1320px;
`

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 15px;
`

const ButtonCreateNew = styled(Link)`
  ${buttonBig}

  padding-left: 20px;
`

const ButtonSettings = styled(Link)`
  ${buttonHollowBig}
`

const Icon = styled.i`
  font-size: 27px;

  margin-right: 6px;
`

const Journal = () => {
  const { journalEntries, pinnedJournalEntries } = useJournalEntries()
  const { firstStepPath, newEntryPath: onboardingNewEntryPath, onboarding } = useJournalOnboarding()
  const user = useSelector((state) => state.session.user)

  const { first_name: name, free_tier: freeTier, journal_reminders: journalReminders, paid_tier: paidTier } = user

  useEffect(() => {
    if (!onboarding) {
      return
    }

    // this "remembers" that during onboarding, user already set reminders
    if (paidTier && journalReminders) {
      history.push(onboardingNewEntryPath)
    } else {
      history.push(firstStepPath)
    }
  }, [firstStepPath, onboardingNewEntryPath, onboarding, journalReminders, paidTier])

  const emailSettingsPath = freeTier ? '?modal=upgrade&reason=pro-reminders-feature' : '/journal/email-settings'

  const cta = atLimit(user, journalEntries, 'journal_entry')
  const newEntryPath = newPath(user, journalEntries, 'journal_entry')

  const upsellBanner = freeTier && journalEntries.length > 0

  return (
    <Container>
      <Content>
        <PageHeader
          subtitle={t('track_your_milestones')}
          title={t('my_career_journal', { name })}>
          <Buttons>
            <ButtonSettings
              $cta={freeTier}
              to={emailSettingsPath}>
              <Icon className="icon-gear-alt" />

              {t('email_settings')}
            </ButtonSettings>

            <ButtonCreateNew
              $cta={cta}
              to={newEntryPath}>
              <Icon className="icon-plus" />

              {t('create_new')}
            </ButtonCreateNew>
          </Buttons>
        </PageHeader>

        <Pins
          pins={pinnedJournalEntries}
          type="journal_entry"
        />

        {upsellBanner && <UpsellBanner type="journal_entry" />}

        <JournalEntriesList />
      </Content>
    </Container>
  )
}

export default Journal
