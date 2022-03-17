import styled from 'styled-components'
import { Link } from 'react-router-dom'

import useLocationHistory from '../hooks/useLocationHistory'
import { black40, black50 } from '../colors'
import { media } from './styled/Grid'

const Button = styled(Link)`
  color: ${black40};
  font-size: 21px;
  cursor: pointer;
  transition: color 0.3;

  position: absolute;
  top: 19px;
  right: 20px;

  display: block;

  ${media.md`
    top: 23px;
  `}

  :hover {
    color: ${black50};
  }
`

const Icon = styled.i``

// individual pages using this component need to add their url to the
// `takeoversRegexp` in useLocationHistory hook
const ButtonGoBack = () => {
  const { previousLocation } = useLocationHistory()

  return (
    <Button to={previousLocation}>
      <Icon
        className="icon-close"
        role="img"
      />
    </Button>
  )
}

export default ButtonGoBack
