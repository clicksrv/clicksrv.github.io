import PropTypes from 'prop-types'
import styled from 'styled-components'

import DEFAULT_IMAGE from '../assets/images/icons/avatar.png'

const Image = styled.div`
  background-color: #f4f4f4;
  background-image: url(${({ url }) => url});
  background-position: center center;
  background-size: cover;
  border-radius: 50%;
  overflow: hidden;

  height: 70px;
  width: 70px;
`

const ProfileImage = ({ className, src }) => (
  <Image
    className={className}
    role="figure"
    url={src || DEFAULT_IMAGE}
  />
)

ProfileImage.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string,
}

export default ProfileImage
