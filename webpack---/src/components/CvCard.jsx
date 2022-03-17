import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import conf from '../conf'
import { grey, primaryFadedLess } from '../colors'
import { buttonBorderless, buttonRegular } from '../styles/buttons'
import { canAccessTheme, isCoverLetter, isWebsite } from '../helpers/cv'
import { dateFromISOString, isCurrentYear } from '../helpers/dates'
import { downloadPdf } from '../helpers/download'
import { media } from './styled/Grid'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import CvActions from './CvActions'
import PlaceholderImage from './PlaceholderImage'
import Tooltip from './Tooltip'
import { CvButtons, CvContent, CvName, CvScreenshot, ProBadge } from './CvPoster'

/**
 * @param {string} $size (small / normal) impacts component's height
 */
export const ImageContainer = styled(Link)`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  transition: max-height 0.4s;

  display: block;
  max-height: calc(var(--cv-card-normal-height) - var(--cv-card-content-full-height));

  ${media.sm`
    max-height: calc(var(--cv-card-${({ $size }) => $size}-height) - var(--cv-card-content-full-height));
  `}

  ${media.md`
    max-height: calc(var(--cv-card-${({ $size }) => $size}-height) - var(--cv-card-content-compact-height));
  `}
`

export const ContentContainer = styled.div`
  overflow: hidden;
  transition: height 0.4s;

  height: var(--cv-card-content-full-height);

  ${media.md`
    height: var(--cv-card-content-compact-height);
  `}
`

const Container = styled.section`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 1px ${primaryFadedLess};

  display: flex;
  flex-direction: column;

  min-width: var(--cv-card-minimum-width);
  max-width: var(--cv-card-width);
  position: relative;
  width: 100%;

  ${media.xl`
    min-width: auto;
  `}

  :hover {
    ${ImageContainer} {
      ${media.md`
        max-height: calc(var(--cv-card-${({ size }) => size}-height) - var(--cv-card-content-full-height));
      `}
    }

    ${ContentContainer} {
      ${media.md`
        height: var(--cv-card-content-full-height);
      `}
    }

    ${CvButtons} {
      margin-top: 13px;
    }
  }
`

const ButtonTooltip = styled(Tooltip)``

const ButtonContainer = styled.span`
  display: inline-block;
  position: relative;

  :hover {
    ${ButtonTooltip} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }
`

const Placeholder = styled(PlaceholderImage)`
  height: calc(var(--cv-card-normal-height) - var(--cv-card-content-full-height));

  ${media.sm`
    height: calc(var(--cv-card-${({ size }) => size}-height) - var(--cv-card-content-full-height));
  `}

  ${media.md`
    height: calc(var(--cv-card-${({ size }) => size}-height) - var(--cv-card-content-compact-height));
  `}
`

const Updated = styled.p`
  color: ${grey};
  font-size: 12px;
  font-weight: 500;

  margin: 0;
`

const cvButtonStyling = css`
  ${buttonRegular}
  ${buttonBorderless}

  border-radius: 50%;
  font-size: 22px;

  display: inline-flex;
  justify-content: center;
  align-items: center;

  height: 36px;
  padding: 0;
  width: 36px;
`

const CvButtonLink = styled(Link)`
  ${cvButtonStyling}
`

const CvButtonHyperlink = styled.a`
  ${cvButtonStyling}
`

/**
 * @param {number} index element's placement in the list (affects image placeholder's background color)
 * @param {string} size (small / normal) impacts component's height
 */
const CvCard = ({ className, cv, index, size }) => {
  const [usePlaceholder, setUsePlaceholder] = useState(false)
  const { pathname } = useLocation()
  const { locale } = useSelector((state) => state.application)
  const user = useSelector((state) => state.session.user)

  const { id, name, publishable, published, screenshot_url: screenshotUrl, theme, updated_at: updatedAt } = cv

  const updatedDate = dateFromISOString(updatedAt)
  const yearFormat = isCurrentYear(updatedDate) ? undefined : 'numeric'
  const formattedDate = updatedDate.toLocaleDateString(locale, { year: yearFormat, month: 'short', day: 'numeric' })
  const updated = t('updated_at', { date: formattedDate })

  const editPath = `/cvs/${id}`

  const proBadge = !canAccessTheme(user, theme)

  const download = !isWebsite(cv)
  const downloadPdfUrl = `${conf.host}/pdfs/${cv.id}`
  const downloadCta = !canAccessTheme(user, theme)
  const downloadCtaPath = `${pathname}?modal=upgrade&reason=pro-template`

  const trackDownloadCtaClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'pdf-download' })

  const share = !isCoverLetter(cv)
  const sharePath = `${pathname}?modal=${published ? 'share' : 'publish'}&cvId=${id}`
  const shareCta = !canAccessTheme(user, theme) || !publishable
  const shareCtaPath = `${pathname}?modal=upgrade&reason=pro-share-${isWebsite(cv) ? 'website' : 'feature'}`

  const trackShareCtaClick = () => trackEvent('clicked-upgrade', 'click', 0, { section: 'share-online' })

  const onScreenshotError = () => setUsePlaceholder(true)

  const downloadTitle = downloadCta ? t('upgrade_to_download') : t('download_pdf')
  const shareTitle = shareCta ? t('upgrade_to_share') : t('share')
  const editTitle = t('edit')

  return (
    <Container
      className={className}
      size={size}>
      {proBadge && <ProBadge>PRO</ProBadge>}

      <ImageContainer
        $size={size}
        to={editPath}>
        {!usePlaceholder && (
          <CvScreenshot
            onError={onScreenshotError}
            size={size}
            src={screenshotUrl}
          />
        )}

        {usePlaceholder && (
          <Placeholder
            index={index}
            size={size}
          />
        )}
      </ImageContainer>

      <ContentContainer>
        <CvContent>
          <CvName to={editPath}>{name}</CvName>

          <Updated>{updated}</Updated>

          <CvButtons>
            <ButtonContainer>
              <CvButtonLink
                className="icon-pencil"
                to={editPath}
              />

              <ButtonTooltip
                title={editTitle}
                top
              />
            </ButtonContainer>

            {download && (
              <ButtonContainer>
                {downloadCta && (
                  <CvButtonLink
                    $cta
                    className="icon-download"
                    onClick={trackDownloadCtaClick}
                    role="button"
                    to={downloadCtaPath}
                  />
                )}

                {!downloadCta && (
                  <CvButtonHyperlink
                    className="icon-download"
                    href={downloadPdfUrl}
                    onClick={downloadPdf(downloadPdfUrl)}
                    role="button"
                    target="_blank"
                    rel="noopener"
                  />
                )}

                <ButtonTooltip
                  cta={downloadCta}
                  title={downloadTitle}
                  top
                />
              </ButtonContainer>
            )}

            {share && (
              <ButtonContainer>
                {shareCta && (
                  <CvButtonLink
                    $cta
                    className="icon-share"
                    to={shareCtaPath}
                    onClick={trackShareCtaClick}
                  />
                )}

                {!shareCta && (
                  <CvButtonLink
                    className="icon-share"
                    to={sharePath}
                  />
                )}

                <ButtonTooltip
                  cta={shareCta}
                  title={shareTitle}
                  top
                />
              </ButtonContainer>
            )}
          </CvButtons>
        </CvContent>
      </ContentContainer>

      <CvActions
        cv={cv}
        index={index}
      />
    </Container>
  )
}

CvCard.propTypes = {
  className: PropTypes.string,
  cv: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
}

export default CvCard
