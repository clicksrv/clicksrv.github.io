import styled from 'styled-components'

import { media } from './styled/Grid'
import { primary } from '../colors'
import { t } from '../locales'

import testimonialCustomer from '../assets/images/testimonial-customer.png'

import PageTitle from './PageTitle'
import TrustpilotWidget from './TrustpilotWidget'

const Container = styled.div`
  margin: 0 auto;
  max-width: 470px;
`

const Title = styled(PageTitle)`
  text-align: left;

  margin: 0 0 0.7em;

  ${media.md`
    margin-bottom: 1em;
  `}
`

const FeaturesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  max-width: max-content;
  margin: auto auto 0 0;
`

const Feature = styled.span`
  color: black;
  text-align: left;

  display: flex;
  align-items: center;

  margin-bottom: 24px;
  max-width: max-content;

  &:last-of-type {
    margin-bottom: 0;
  }
`

const Icon = styled.i`
  color: ${primary};
  font-size: 35px;
  text-align: center;

  display: inline-block;
  margin-right: 14px;
  width: 40px;
`

const Testimonial = styled.p`
  color: black;
  font-size: 16px;
  line-height: 24px;
  text-align: left;

  margin-bottom: 12px;
`

const CustomerBlock = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
`

const CustomerDetails = styled.div`
  margin-left: 8px;
`

const CustomerImage = styled.img``

const CustomerName = styled.p`
  color: black;
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;

  margin-bottom: unset;
`

const JobTitle = styled.span`
  font-size: 14px;
  line-height: 16px;
`

const TrustpilotWrapper = styled.div`
  display: none;
  margin: 50px 0 60px;

  ${media.md`
    display: block;
  `}
`

const CheckoutTestimonial = () => (
  <Container>
    <Title>{t('checkout_testimonial_title')}</Title>

    <FeaturesWrapper>
      <Feature>
        <Icon className="icon-blocks-alt" />

        {t('checkout_templates')}
      </Feature>

      <Feature>
        <Icon className="icon-document-alt" />

        {t('checkout_resumes')}
      </Feature>

      <Feature>
        <Icon className="icon-documents-pdf" />

        {t('checkout_downloads')}
      </Feature>

      <Feature>
        <Icon className="icon-browser-alt" />

        {t('checkout_website')}
      </Feature>

      <Feature>
        <Icon className="icon-vcv" />

        {t('checkout_branding_removed')}
      </Feature>

      <Feature>
        <Icon className="icon-brush-alt" />

        {t('checkout_unlimited_entries')}
      </Feature>
    </FeaturesWrapper>

    <TrustpilotWrapper>
      <TrustpilotWidget />

      <Testimonial>{t('checkout_testimonial')}</Testimonial>

      <CustomerBlock>
        <CustomerImage src={testimonialCustomer} />
        <CustomerDetails>
          <CustomerName>Jane Cooper</CustomerName>
          <JobTitle>{t('medical_assistant')}</JobTitle>
        </CustomerDetails>
      </CustomerBlock>
    </TrustpilotWrapper>
  </Container>
)

export default CheckoutTestimonial
