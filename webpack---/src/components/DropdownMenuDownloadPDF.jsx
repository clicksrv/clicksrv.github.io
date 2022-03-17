import PropTypes from 'prop-types'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import conf from '../conf'
import { canAccessTheme } from '../helpers/cv'
import { downloadPdf } from '../helpers/download'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import { DropdownMenuBadge, DropdownMenuHyperlink, DropdownMenuIcon, DropdownMenuLink } from './Dropdown'

const DropdownMenuDownloadPDF = ({ cv }) => {
  const { pathname } = useLocation()
  const user = useSelector((state) => state.session.user)

  const { id, theme } = cv

  const cta = !canAccessTheme(user, theme)

  const upgradePath = `${pathname}?modal=upgrade&reason=pro-template`
  const pdfUrl = `${conf.host}/pdfs/${id}`

  const trackUpgradeClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'pdf-download' })

  return (
    <>
      {cta && (
        <DropdownMenuLink
          onClick={trackUpgradeClick}
          to={upgradePath}>
          <DropdownMenuIcon
            className="icon-documents-pdf"
            cta
          />

          {t('download_pdf')}

          <DropdownMenuBadge cta>Pro</DropdownMenuBadge>
        </DropdownMenuLink>
      )}

      {!cta && (
        <DropdownMenuHyperlink
          href={pdfUrl}
          onClick={downloadPdf(pdfUrl)}
          target="_blank"
          rel="noopener">
          <DropdownMenuIcon className="icon-documents-pdf" />

          {t('download_pdf')}
        </DropdownMenuHyperlink>
      )}
    </>
  )
}

DropdownMenuDownloadPDF.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default DropdownMenuDownloadPDF
