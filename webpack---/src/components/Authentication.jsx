import PropTypes from 'prop-types'
import styled from 'styled-components'

import { media } from './styled/Grid'
import { mint } from '../colors'

import AuthenticationNavBar from './AuthenticationNavBar'
import AuthenticationTestimonial from './AuthenticationTestimonial'
import ImageText from './AuthenticationImageText'
import PublicationsBanner from './PublicationsBanner'

const Container = styled.div`
  margin: auto;
  max-width: 1150px;
  padding: 20px 16px;
  width: 100%;

  ${media.md`
    padding: 70px 40px;
  `}
`

const ContainerWrapper = styled.div`
  background-color: ${({ imageLayout }) => (imageLayout ? mint : '#FEEFE5')};

  display: flex;
  justify-content: space-between;
  flex-direction: column;

  flex-grow: 1;

  margin-top: var(--nav-bar-height);
  width: 100%;
`

const Content = styled.div`
  background: white;
  box-shadow: 0px 2px 4px rgb(62 148 228 / 20%);
  border-radius: 16px;
  overflow: hidden;

  height: max-content;
  margin: auto;
  max-width: 540px;
  padding: 40px 23px;

  ${media.md`
    margin: 0 40px;
    min-width: 430px;
    width: min(540px, 50%);
  `}
`

const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column-reverse;

  min-height: calc(100vh - 100px);

  ${media.md`
    flex-direction: row;

    min-height: unset;
  `}
`
const DesktopPublicationsBanner = styled(PublicationsBanner)`
  display: none;

  ${media.md`
    display: flex;
  `}
`

const MobilePublicationsBanner = styled(PublicationsBanner)`
  margin: 24px 0 0;
  min-height: unset;

  ${media.md`
    display: none;
  `}
`

const Authentication = ({ children, imageLayout }) => {
  return (
    <>
      <AuthenticationNavBar imageLayout={imageLayout} />

      <ContainerWrapper imageLayout={imageLayout}>
        <Container>
          <ContentWrapper>
            {imageLayout ? <ImageText /> : <AuthenticationTestimonial />}
            <MobilePublicationsBanner />
            <Content>{children}</Content>
          </ContentWrapper>
        </Container>
        <DesktopPublicationsBanner />
      </ContainerWrapper>
    </>
  )
}

Authentication.propTypes = {
  children: PropTypes.node.isRequired,
  imageLayout: PropTypes.bool,
}

export default Authentication
