import styled from 'styled-components'
import { grey } from '../colors'
import { media } from './styled/Grid.jsx'

const AuthenticationSeparator = styled.p`
  color: ${grey};
  font-size: 16px;
  line-height: 24px;
  text-align: center;

  margin: 24px 0 16px;
  width: 100%;

  ${media.md`
    margin: 0 0 21px;
  `}
`

export default AuthenticationSeparator
