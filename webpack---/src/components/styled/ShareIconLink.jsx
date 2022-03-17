import PropTypes from 'prop-types'
import styled from 'styled-components'
import { primary } from '../../colors'
import Icon from './Icon'

const ShareLink = styled.a`
  height: 45px;
  width: 45px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${primary};
  border-radius: 5px;
  color: white !important;
  font-size: 20px;
  opacity: 0.5;
  transition: all 0.3s;

  &:hover {
    opacity: 1;
  }
`

const ShareIconLink = ({ icon, social, ...restProps }) => (
  <ShareLink {...restProps}>
    <Icon
      icon={icon}
      social={social}
    />
  </ShareLink>
)

ShareIconLink.propTypes = {
  icon: PropTypes.string,
  social: PropTypes.string,
}

export default ShareIconLink
