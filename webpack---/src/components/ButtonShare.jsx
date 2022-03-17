import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { canAccessTheme, isCoverLetter, isWebsite } from '../helpers/cv'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import Button from './styled/Button'

const Icon = styled.i``

const ButtonShare = ({ cv }) => {
  const user = useSelector((state) => state.session.user)
  const { pathname } = useLocation()

  if (isCoverLetter(cv)) {
    return null
  }

  const cta = !canAccessTheme(user, cv.theme) || !cv.publishable

  const upgradePath = `${pathname}?modal=upgrade&reason=pro-share-${isWebsite(cv) ? 'website' : 'feature'}`
  const sharePath = `${pathname}?modal=${cv.published ? 'share' : 'publish'}&cvId=${cv.id}`

  const trackUpgradeClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'share-online' })

  const upgradeProps = {
    cta,
    to: upgradePath,
    onClick: trackUpgradeClick,
  }

  const shareProps = {
    to: sharePath,
  }

  const buttonProps = cta ? upgradeProps : shareProps

  return (
    <Button
      small
      {...buttonProps}>
      <Icon className="icon-share" />

      {t('share')}
    </Button>
  )
}

ButtonShare.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default ButtonShare
