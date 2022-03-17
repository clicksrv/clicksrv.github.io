import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import capitalize from '../../helpers/capitalize'
import { trackEvent } from '../../helpers/analytics'
import { t } from '../../locales'

import Button from '../styled/Button'
import Icon from '../styled/Icon'

const CTAFieldContainer = styled.div`
  margin-bottom: 30px;
`

const CTAFieldBodyContainer = styled.div``

const FieldName = styled.label`
  color: #888;
  font-size: 10px;
  font-weight: 500;
  line-height: 14px;
  text-transform: uppercase;

  margin-bottom: 10px;
`

const FieldValue = styled.span`
  font-size: 18px;
  font-weight: 500;
  color: #333333;
  line-height: 25px;

  margin-right: 15px;
`

const SLink = styled(Link)`
  color: #3e94e4;
  cursor: pointer;
  transition: color 0.2s linear;
`

const CTAField = ({ name, tier, paidTier }) => {
  const pathname = '/account'
  const trackUpgradeClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'profile' })

  const comped = tier === 'comped'
  const businessTier = tier === 'business'

  const renderBody = () => {
    if (process.env.CORDOVA) {
      return (
        <CTAFieldBodyContainer>
          <FieldValue>{capitalize(tier)}</FieldValue>
        </CTAFieldBodyContainer>
      )
    }

    if (!paidTier) {
      return (
        <CTAFieldBodyContainer>
          <FieldValue>{capitalize(tier)}</FieldValue>

          <Button
            cta
            big
            to="/checkout"
            onClick={trackUpgradeClick}>
            {t('upgrade')}
          </Button>
        </CTAFieldBodyContainer>
      )
    }

    return (
      <CTAFieldBodyContainer>
        <FieldValue>{capitalize(tier)}</FieldValue>

        {paidTier && !businessTier && !comped && (
          <>
            <span style={{ textAlign: 'right', float: 'right', marginTop: 5 }}>
              <SLink to={`${pathname}?modal=subscription`}>{t('manage_subscription')}</SLink>
            </span>

            <Button
              to="/update-billing"
              hollow
              style={{ width: '100%', marginTop: 10, marginBottom: 30 }}>
              <Icon icon="creditcard" />
              {t('update_billing')}
            </Button>
          </>
        )}
      </CTAFieldBodyContainer>
    )
  }

  return (
    <CTAFieldContainer>
      <FieldName>{name}</FieldName>
      {renderBody()}
    </CTAFieldContainer>
  )
}

CTAField.propTypes = {
  name: PropTypes.string.isRequired,
  tier: PropTypes.string.isRequired,
  paidTier: PropTypes.bool.isRequired,
}

export default CTAField
