import { useEffect } from 'react'
import styled from 'styled-components'

import useJournalOnboarding from '../hooks/useJournalOnboarding'
import { t } from '../locales'

import journalCongratulations from '../assets/images/journal-congratulations.png'

import Button from './styled/Button'
import ContainerJournal from './ContainerJournal'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'

const Container = styled(ContainerJournal)`
  text-align: center;

  padding-bottom: 100px;
`

const Content = styled.section`
  margin: 50px 0 0;
`

const Image = styled.img`
  display: block;
  height: 100%;
  margin: 10px auto;
  max-width: 448px;
  width: 100%;
`

const JournalCongratulations = () => {
  const { setOnboardingStep } = useJournalOnboarding()

  useEffect(() => {
    setOnboardingStep('publish')
  }, [])

  return (
    <Container>
      <PageTitle>{t('congratulations')}</PageTitle>
      <PageParagraph as="h2">{t('journal_entry_created_first')}</PageParagraph>

      <Content>
        <Button
          big
          wide
          to="/journal">
          {t('view_journal')}
        </Button>

        <Image
          src={journalCongratulations}
          height={448}
          width={448}
        />
      </Content>
    </Container>
  )
}

export default JournalCongratulations
