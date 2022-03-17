import styled from 'styled-components'

import { black, greyLightest, primary } from '../colors'
import { t } from '../locales'

const Container = styled.div`
  flex: 1 0 180px;
  display: flex;
  justify-content: center;
`

const Content = styled.p`
  border: 1px solid ${greyLightest};
  border-radius: 4px;
  color: ${black};
  font-size: 14px;
  font-weight: 600;
  text-align: left;

  display: flex;
  align-items: center;

  margin: 0;
  width: 180px;

  span {
    flex: 1 1 auto;
  }
`

const Icon = styled.i`
  color: ${primary};
  font-size: 16px;

  flex: none;

  margin: 12px 12px 12px 16px;
`

const CheckoutSecurePayment = () => {
  return (
    <Container>
      <Content>
        <Icon className="icon-lock" />
        <span>{t('secure_and_encrypted_payment')}</span>
      </Content>
    </Container>
  )
}

export default CheckoutSecurePayment
