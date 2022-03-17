import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { black, primaryCta, white } from '../colors'
import { media } from './styled/Grid.jsx'
import { t } from '../locales'

const Container = styled(Link)`
  background-color: ${({ selected }) => (selected ? '#EFEAFF' : white)};
  border: 3px solid ${({ selected }) => (selected ? '#6236FF' : white)};
  border-radius: 8px;
  box-shadow: 0px 1px 1px rgba(62, 148, 228, 0.25);
  cursor: pointer;
  color: ${black};
  text-align: center;
  transition: border 0.3s;

  flex: 1;

  display: block;
  max-width: 240px;
  margin: auto;
  padding: 24px 0px;
  width: 240px;

  &:hover {
    border: 3px solid #6236ff;
    color: ${black};
  }

  ${media.xs`
    margin: unset;
    width: unset;
  `}
`

const Amount = styled.p`
  font-size: 32px;
  font-weight: 600;
  line-height: 36px;
  text-align: center;

  margin: 0 0 8px;
`

const Period = styled.span`
  font-size: 12px;
  font-weight: 700;
  line-height: 22px;

  margin-left: 5px;
`

const Subtext = styled.p`
  font-size: 14px;
  line-height: 20px;

  margin: 0;
`

const PricingBubble = styled.p`
  background: ${({ quarterly }) => (quarterly ? '#e1d8ff' : 'transparent')};
  border: 1px solid ${({ quarterly, selected }) => (quarterly ? '#e1d8ff' : selected ? '#e1d8ff' : '#efeaff')};
  border-radius: 12px;
  color: ${({ quarterly }) => (quarterly ? '#6236FF' : primaryCta)};
  font-size: 12px;
  font-weight: bold;
  line-height: 16px;
  text-align: center;

  margin: auto auto 8px;
  max-width: calc(100% - 5px);
  padding: 4px 8px;
  width: max-content;
`

const CheckoutPlanCard = ({ selected, plan, coupon, title, amount, subtext, onClick, quarterly }) => {
  const basePath = `/checkout?plan=${plan}`
  const to = coupon ? `${basePath}&coupon=${coupon}` : basePath

  const props = selected ? { to } : { to, onClick }

  return (
    <Container
      {...props}
      selected={selected}>
      <PricingBubble
        quarterly={quarterly}
        selected={selected}>
        {title}
      </PricingBubble>

      <Amount>
        {amount}
        <Period>/{t('month')}</Period>
      </Amount>

      <Subtext>{subtext}</Subtext>
    </Container>
  )
}

CheckoutPlanCard.propTypes = {
  amount: PropTypes.string.isRequired,
  coupon: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  plan: PropTypes.string.isRequired,
  quarterly: PropTypes.bool,
  selected: PropTypes.bool,
  subtext: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default CheckoutPlanCard
