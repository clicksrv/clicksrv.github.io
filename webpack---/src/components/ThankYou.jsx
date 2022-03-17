import styled from 'styled-components'
import { useEffect } from 'react'

import thankYouImage from '../assets/images/thank-you.png'

import useQuery from '../hooks/useQuery'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import Button from './styled/Button'
import PageTitle from './PageTitle'
import PageParagraph from './PageParagraph'

const Container = styled.div`
  margin: 0 auto;
  max-width: 850px;

  ${Button} {
    margin-top: 20px;
  }
`

const Image = styled.img`
  display: block;
  margin: 80px auto 40px;
  max-width: 55vh;
  min-width: 300px;
  width: 100%;
`

// Finish of the Downgrade flow
const ThankYou = () => {
  const { plan } = useQuery()

  useEffect(() => {
    trackEvent('viewed-thank-you-page', 'pageview', 0, { plan })
  }, [plan])

  return (
    <Container>
      <PageTitle>{t('thank_you')}</PageTitle>
      <PageParagraph as="h2">{t('upgrade_reflected_on_next_bill')}</PageParagraph>

      <Button
        big
        to="/cvs">
        {t('view_dashboard')}
      </Button>

      <Image
        src={thankYouImage}
        alt={t('thank_you')}
        role="img"
      />
    </Container>
  )
}

export default ThankYou
