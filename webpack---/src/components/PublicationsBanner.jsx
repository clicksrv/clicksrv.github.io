import PropTypes from 'prop-types'
import styled from 'styled-components'

import cnn from '../assets/images/logos/cnn.svg'
import forbes from '../assets/images/logos/forbes.svg'
import mashable from '../assets/images/logos/mashable.svg'
import tnw from '../assets/images/logos/tnw.svg'
import wsj from '../assets/images/logos/wsj.svg'

import { media } from './styled/Grid'

const PublicationsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;

  min-height: 160px;
  width: 100%;
`

const Logo = styled.img`
  height: 100%;
`

const LogoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  height: 65px;
  width: 110px;

  ${media.md`
    height: 145px;
    margin: 0px 8px;
    width: 155px;
  `}
`

const PublicationsBanner = ({ className }) => (
  <PublicationsContainer className={className}>
    <LogoWrapper>
      <Logo
        src={forbes}
        alt="Forbes"
        width="97"
        height="145"
      />
    </LogoWrapper>

    <LogoWrapper>
      <Logo
        src={mashable}
        alt="Mashable"
        width="141"
        height="145"
      />
    </LogoWrapper>

    <LogoWrapper>
      <Logo
        src={cnn}
        alt="CNN"
        width="70"
        height="145"
      />
    </LogoWrapper>

    <LogoWrapper>
      <Logo
        src={tnw}
        alt="TNW"
        width="100"
        height="145"
      />
    </LogoWrapper>

    <LogoWrapper>
      <Logo
        src={wsj}
        alt="The Wall Street Journal"
        width="63"
        height="145"
      />
    </LogoWrapper>
  </PublicationsContainer>
)

PublicationsBanner.propTypes = {
  className: PropTypes.string,
}

export default PublicationsBanner
