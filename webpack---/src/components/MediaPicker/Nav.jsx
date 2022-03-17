import styled from 'styled-components'
import { greyLightest, primary } from '../../colors'
import { media } from '../styled/Grid'

const BORDER_WIDTH = 4

export default styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: ${BORDER_WIDTH}px solid ${greyLightest};

  & > div {
    display: flex;
    flex: 1;
  }

  ${media.sm`
    & > div {
      flex: none;
    }
  `}
`

export const NavItem = styled(({ selected, ...rest }) => <a {...rest} />)`
  display: block;
  padding: 15px 0 ${20 - BORDER_WIDTH}px 0;
  margin-bottom: -${BORDER_WIDTH}px;
  font-size: 14px;
  font-weight: 500;
  color: #444 !important;
  border-bottom: ${BORDER_WIDTH}px solid ${greyLightest};
  transition: border-bottom 0.3s !important;
  flex: 1;
  text-align: center;

  ${({ selected }) =>
    selected &&
    `
    border-bottom: ${BORDER_WIDTH}px solid ${primary};
  `}

  ${media.sm`
    padding: 20px 30px ${25 - BORDER_WIDTH}px 30px;
    font-size: 16px;
    flex: none;
  `}
`

export const NavActions = styled.div`
  padding: 0 15px;
`
