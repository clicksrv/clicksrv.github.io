import styled from 'styled-components'

import { media } from './styled/Grid'
import { t } from '../locales'

import Button from './styled/Button'

const ButtonGoBack = styled(Button)`
  margin: 30px 0 10px 15px;

  ${media.xs`
    margin-bottom: -20px;
  `}
`

const Icon = styled.i`
  font-size: 13px;
  transform: rotate(180deg);

  display: inline-block;
  margin-right: 7px;
`

const ButtonJournalGoBack = () => (
  <ButtonGoBack
    big
    hollow
    to="/journal">
    <Icon className="icon-chevron" />

    {t('back_to_journal')}
  </ButtonGoBack>
)

export default ButtonJournalGoBack
