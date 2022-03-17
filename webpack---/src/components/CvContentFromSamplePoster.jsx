import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import conf from '../conf'
import useLightbox from '../hooks/useLightbox'
import { buttonHollow, buttonRegular } from '../styles/buttons'
import { media } from './styled/Grid'
import { t } from '../locales'

import { CvContent, CvContentContainer, CvImageContainer, CvName, CvPoster, CvScreenshot } from './CvPoster'
import Lightbox from './Lightbox'

const Name = styled(CvName)`
  font-size: 15px;

  margin: 0 0 15px;
`

const Button = styled.span`
  ${buttonRegular}

  width: 100%;
`

const ButtonHollow = styled.span`
  ${buttonHollow}

  margin-bottom: 12px;
  width: 100%;
`

const Poster = styled(CvPoster)`
  ${CvContentContainer} {
    height: 160px;

    ${media.md`
      height: var(--cv-poster-content-compact-height);
    `}
  }

  :hover {
    ${CvImageContainer} {
      ${media.md`
        max-height: calc(var(--cv-card-normal-height) - 160px);
      `}
    }

    ${CvContentContainer} {
      ${media.md`
        height: 160px;
      `}
    }
  }
`

const LightboxImage = styled.img`
  opacity: ${({ lightboxOpen, lightboxVisible }) => (lightboxOpen && lightboxVisible ? 1 : 0)};
  transition: opacity ${conf.lightboxFadeInOutTime}ms;
  user-select: none;

  max-height: 95vh;
  max-width: 95vw;
`

const LightboxButton = styled.span`
  ${buttonRegular}

  position: fixed;
  bottom: 5vh;
`

/**
 * @param {function} selectSample Function returning a function triggering the confirmation modal
 * @param {object} sample CV Sample object ({ name, url, sample_screenshot_url })
 */
const CvContentFromSamplePoster = ({ sample, selectSample }) => {
  const [lightboxVisible, setLightboxVisible] = useState(false)
  const { lightboxOpen, openLightbox } = useLightbox()

  const { name, sample_screenshot_url: screenshotUrl, url } = sample

  useEffect(() => {
    if (lightboxOpen) {
      // using setTimeout is required for nice fadeIn/fadeOut effect, i.e. html
      // structure needs to be added to DOM with `opacity: 0`, and then transition
      // to opacity 1 (instead of being added to DOM with `opacity: 1` straight away)
      setTimeout(() => setLightboxVisible(true), 0)
    } else {
      setLightboxVisible(false)
    }
  }, [lightboxOpen])

  return (
    <Poster
      onClick={openLightbox}
      title={name}>
      <CvImageContainer>
        <CvScreenshot
          size="normal"
          src={screenshotUrl}
          height="325px"
          width="244px"
        />

        <Lightbox open={lightboxOpen}>
          <LightboxImage
            lightboxOpen={lightboxOpen}
            lightboxVisible={lightboxVisible}
            src={screenshotUrl}
          />

          <LightboxButton onClick={selectSample(url)}>{t('use_this_sample')}</LightboxButton>
        </Lightbox>
      </CvImageContainer>

      <CvContentContainer>
        <CvContent>
          <Name as="span">{name}</Name>

          <ButtonHollow onClick={openLightbox}>{t('preview_sample')}</ButtonHollow>
          <Button onClick={selectSample(url)}>{t('use_this_sample')}</Button>
        </CvContent>
      </CvContentContainer>
    </Poster>
  )
}

CvContentFromSamplePoster.propTypes = {
  sample: PropTypes.object.isRequired,
  selectSample: PropTypes.func.isRequired,
}

export default CvContentFromSamplePoster
