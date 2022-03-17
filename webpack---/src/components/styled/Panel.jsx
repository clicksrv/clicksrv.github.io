import styled from 'styled-components'

import { greyDarker, white } from '../../colors'

import SectionTitle from '../SectionTitle'

export const Panel = styled.div`
  border-radius: 8px;
  background-color: ${white};
  box-shadow: 0 2px 15px 0 rgba(0, 0, 0, 0.15);

  padding: 50px 8.333%; /* 1 column in 12 col grid */
`

export const PanelWithMargin = styled(Panel)`
  margin-bottom: 20px;
`

export const PanelTitle = styled(SectionTitle)`
  color: ${greyDarker};

  margin: 0 0 20px;
`

export default Panel
