import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { trackEvent } from '../helpers/analytics'
import { t } from '../locales'

import vcvLogo from '../assets/images/logos/vcv_white_solid.png'

const CvBarBranding = ({ cv: { branded }, inEditor }) => {
  if (!branded || process.env.CORDOVA) {
    return null
  }

  const onClick = (e) => inEditor && e.preventDefault()

  const trackUpgradeClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'editor-branding-bar' })

  return (
    <p className="branding">
      <span>{t('created_with')}</span>

      <a
        href="https://www.visualcv.com"
        onClick={onClick}>
        <img
          src={vcvLogo}
          alt="VisualCV"
        />
      </a>

      {inEditor && (
        <Link
          to={'?modal=upgrade&reason=remove-branding'}
          onClick={trackUpgradeClick}>
          <span>{t('upgrade_to_remove')}</span>
        </Link>
      )}
    </p>
  )
}

CvBarBranding.propTypes = {
  cv: PropTypes.object.isRequired,
  inEditor: PropTypes.bool,
}

export default CvBarBranding
