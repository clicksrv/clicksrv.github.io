import PropTypes from 'prop-types'
import styled from 'styled-components'

import { greyLightest } from '../colors'

/**
 * @param {boolean} separated indicates left/right margins should be added
 */
const NavBarSeparator = styled.span`
  background-color: ${greyLightest};

  flex: none;

  display: inline-block;
  height: 70%;
  margin-left: ${({ separated }) => (separated ? 15 : 0)}px;
  margin-right: ${({ separated }) => (separated ? 15 : 0)}px;
  width: 1px;
`

NavBarSeparator.propTypes = {
  separated: PropTypes.bool,
}

export default NavBarSeparator
