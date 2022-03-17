import styled from 'styled-components'

import checkmark from '../assets/images/check.svg'

import { grey } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import SectionTitle from './SectionTitle'

const Container = styled.div`
  background: #e1f8c4;
  border-radius: 8px;

  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;

  max-width: 880px;
  margin: 0 auto;
`

const Icon = styled.div`
  flex: none;

  margin: 24px auto 16px;
  width: 64px;

  ${media.md`
    margin: 36px 24px;
  `}
`

const Content = styled.div`
  text-align: center;

  flex: 1 0 auto;

  margin: 0 24px 24px;
  max-width: 100%;

  ${media.sm`
    text-align: left;

    flex: 1 0 200px;

    margin: 24px 24px 24px 0;
    max-width: 344px;
  `}
`

const Title = styled(SectionTitle)`
  font-size: 23px;

  margin: 4px 0 15px 0;
  margin-bottom: 4px;
`

const Subtitle = styled.p`
  color: ${grey};
  font-size: 14px;
  font-weight: 400;
  line-height: 140%;

  padding: 0 10px;

  ${media.sm`
    padding-left: 0;
    padding-right: 0;
  `}
`

const CheckoutGuarantee = () => {
  return (
    <Container>
      <Icon>
        <img
          src={checkmark}
          alt={t('money_back_guarantee')}
        />
      </Icon>

      <Content>
        <Title>{t('money_back_guarantee')}</Title>

        <Subtitle>{t('if_not_satisfied')}</Subtitle>
      </Content>
    </Container>
  )
}

export default CheckoutGuarantee
