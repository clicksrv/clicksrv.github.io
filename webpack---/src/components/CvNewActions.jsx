import PropTypes from 'prop-types'
import styled from 'styled-components'

import conf from '../conf'
import useOnboarding from '../hooks/useOnboarding'
import { createCv } from '../helpers/cv'
import { grey, greyBluish, greyLightest, greySubtleBluish } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import skeletonUpload from '../assets/images/skeleton-upload.svg'
import skeletonResume from '../assets/images/skeleton-resume.svg'
import skeletonDocument from '../assets/images/skeleton-document.svg'

import PageTitle from './PageTitle'

const Container = styled.div`
  background-color: ${greySubtleBluish};
  border-radius: 16px;

  max-width: 500px;
  margin: 0 auto 50px;
  padding: 16px;
  position: relative;

  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 16px;

  ${media.md`
    flex-wrap: nowrap;
    flex-direction: row;

    max-width: 100%;
  `}
`

const Action = styled.div`
  background-color: ${greyLightest};
  border-radius: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  flex: 1;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 16px;

  padding: 10px 15px;
  width: 100%;

  :hover {
    background-color: ${greyBluish};
  }

  ${media.md`
    flex-direction: column;
    justify-content: center;
    gap: 0;

    padding: 15px 25px;
    width: 33%;
  `}

  ${media.lg`
    padding: 30px 40px;
  `}
`

const Image = styled.img`
  max-width: 60px;

  ${media.md`
    max-width: 140px;
  `}
`

const ImageResume = styled(Image)`
  // custom margins as this SVG is cropped differently
  margin-top: 2px;
  margin-bottom: -10px;

  ${media.md`
    margin-top: 12px;
    margin-bottom: -17px;
  `}
`

const Title = styled(PageTitle)`
  font-size: 24px;
  font-weight: 400;
  letter-spacing: -0.5px;

  margin: 0 0 1px;

  ${media.md`
    margin-bottom: 8px;
  `}
`

const Description = styled.p`
  color: ${grey};
  font-size: 14px;

  display: none;

  ${media.md`
    display: block;
  `}
`

/**
 * @param {string} type resume / cover_letter / website
 */
const CvNewActions = ({ className, type }) => {
  const { onboarding, onboardingTemplate, stopOnboarding } = useOnboarding()

  const onCvCreated = () => onboarding && stopOnboarding()

  const theme = onboarding ? onboardingTemplate : conf.defaults[type].theme

  const createFromImport = () => {
    trackEvent('clicked-create-cv-from-import', 'click')

    createCv('import', { theme, type }).then(onCvCreated).catch(onCvCreated)
  }

  const createFromSample = () => {
    trackEvent('clicked-create-cv-from-sample', 'click')

    createCv('samples', { theme, type }).then(onCvCreated).catch(onCvCreated)
  }

  const createFromScratch = () => {
    trackEvent('clicked-create-cv-from-scratch', 'click')

    const fromScratchMethod = onboarding ? 'onboarding' : 'blank'

    createCv(fromScratchMethod, { theme, type }).then(onCvCreated).catch(onCvCreated)
  }

  return (
    <Container className={className}>
      <Action onClick={createFromImport}>
        <Image src={skeletonUpload} />

        <Title>{t('use_existing_resume')}</Title>

        <Description>{t('upload_and_customize_resume')}</Description>
      </Action>

      <Action onClick={createFromSample}>
        <ImageResume src={skeletonResume} />

        <Title>{t('use_sample_content')}</Title>

        <Description>{t('start_with_prewritten_resume')}</Description>
      </Action>

      <Action onClick={createFromScratch}>
        <Image src={skeletonDocument} />

        <Title>{t('start_from_scratch')}</Title>

        <Description>{t('start_with_blank_canvas')}</Description>
      </Action>
    </Container>
  )
}

CvNewActions.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default CvNewActions
