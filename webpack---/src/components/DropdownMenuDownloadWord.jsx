import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'

import conf from '../conf'
import { downloadWord } from '../helpers/download'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import { DropdownMenuBadge, DropdownMenuHyperlink, DropdownMenuIcon, DropdownMenuLink } from './Dropdown'

const DropdownMenuDownloadWord = ({ cv }) => {
  const { pathname } = useLocation()

  const { exportable, id } = cv

  const cta = !exportable

  const upgradePath = `${pathname}?modal=upgrade&reason=pro-word-feature`
  const wordUrl = `${conf.host}/word/${id}`

  const trackUpgradeClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'word-download' })

  return (
    <>
      {cta && (
        <DropdownMenuLink
          onClick={trackUpgradeClick}
          to={upgradePath}>
          <DropdownMenuIcon
            className="icon-document-doc"
            cta
          />

          {t('download_word')}

          <DropdownMenuBadge cta>Pro</DropdownMenuBadge>
        </DropdownMenuLink>
      )}

      {!cta && (
        <DropdownMenuHyperlink
          href={wordUrl}
          onClick={downloadWord(wordUrl)}
          target="_blank"
          rel="noopener">
          <DropdownMenuIcon className="icon-document-doc" />

          {t('download_word')}

          <DropdownMenuBadge>{t('beta')}</DropdownMenuBadge>
        </DropdownMenuHyperlink>
      )}
    </>
  )
}

DropdownMenuDownloadWord.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default DropdownMenuDownloadWord
