import styled from 'styled-components'

import { t } from '../locales'

import Button from './styled/Button'
import Icon from './styled/Icon'
import PageParagraph from './PageParagraph'
import PageTitle from './PageTitle'
import WelcomeContainer from './WelcomeContainer'

const Action = styled.section`
  margin-top: 120px;
`

const NotFound = () => {
  return (
    <WelcomeContainer>
      <PageTitle>404</PageTitle>

      <PageParagraph as="h2">{t('not_found')}</PageParagraph>

      <Action>
        <Button to="/">
          <Icon arrow="back" />

          {t('back')}
        </Button>
      </Action>
    </WelcomeContainer>
  )
}

export default NotFound
