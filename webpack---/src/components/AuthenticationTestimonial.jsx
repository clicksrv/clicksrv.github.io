import styled from 'styled-components'

import { media } from './styled/Grid'
import { primary } from '../colors'
import { t } from '../locales'

import PageTitle from './PageTitle'
import TrustpilotWidget from './TrustpilotWidget'

const Container = styled.div`
  margin-top: 20px;
  max-width: 100%;
  padding-bottom: 70px;

  ${media.md`
    margin: unset;
    max-width: min(440px, 45%);
    padding-bottom: unset;
  `}
`

const Title = styled(PageTitle)`
  text-align: center;

  margin: 0 0 1em;

  ${media.md`
    font-size: 49px;
    line-height: 100%;
    text-align: left;
  `}
`

const FeaturesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin-bottom: 16px;
`

const Feature = styled.span`
  display: flex;
  align-items: center;

  margin-bottom: 24px;
  width: 100%;
`

const Icon = styled.i`
  color: ${primary};
  font-size: 30px;
  text-align: center;

  display: inline-block;
  margin-right: 14px;
  width: 40px;
`

const Testimonial = styled.p`
  font-size: 16px;
  line-height: 24px;

  margin-bottom: 12px;
`

const Customer = styled.span`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
`

const AuthenticationTestimonial = () => (
  <Container>
    <Title>{t('authentication_testimonial_title')}</Title>

    <FeaturesWrapper>
      <Feature>
        <Icon className="icon-margins-alt" />
        {t('easy_to_use')}
      </Feature>

      <Feature>
        <Icon className="icon-brush-alt" />
        {t('fully_customizable')}
      </Feature>

      <Feature>
        <Icon className="icon-browser-alt" />
        {t('personal_professional_builder')}
      </Feature>

      <Feature>
        <Icon className="icon-journal" />
        {t('sample_content_to_start')}
      </Feature>

      <Feature>
        <Icon className="icon-download" />
        {t('download_share_resume')}
      </Feature>
    </FeaturesWrapper>

    <TrustpilotWidget />

    <Testimonial>{t('authentication_testimonial')}</Testimonial>

    <Customer>Geoffrey G.</Customer>
  </Container>
)

export default AuthenticationTestimonial
