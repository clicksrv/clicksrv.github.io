import styled from 'styled-components'

import { grey } from '../colors'
import { media } from './styled/Grid'

const PageParagraph = styled.p`
  color: ${grey};
  font-size: 17px;
  font-weight: 300;
  line-height: 130%;

  margin: 15px 15px;

  ${media.sm`
    font-size: 20px;
  `}
`

export default PageParagraph
