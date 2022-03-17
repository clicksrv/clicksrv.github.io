import styled from 'styled-components'

import { grey, greyLightest } from '../colors'
import { t } from '../locales'

import recurlyLogo from '../assets/images/billing/recurly.png'

const Container = styled.div`
  flex: 1 0 180px;
  display: flex;
  justify-content: center;
`

const Content = styled.p`
  border: 1px solid ${greyLightest};
  border-radius: 4px;
  color: ${grey};
  font-size: 14px;
  text-align: left;

  display: flex;
  align-items: center;

  margin: 0;
  padding: 10px 8px 10px;
  width: 180px;

  span {
    flex: 1 1 auto;
  }
`

const Logo = styled.img`
  margin-left: 4px;
`

const CheckoutRecurlyPayment = () => {
  return (
    <Container>
      <Content>
        <span>{t('powered_by')}</span>
        <Logo src={recurlyLogo} />
      </Content>
    </Container>
  )
}

export default CheckoutRecurlyPayment
