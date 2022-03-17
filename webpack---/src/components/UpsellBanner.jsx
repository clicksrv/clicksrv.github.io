import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import conf from '../conf'
import { blueLightest, grey, mint, violetLight } from '../colors'
import { buttonBig } from '../styles/buttons'
import { media } from './styled/Grid'
import { openUrl } from '../helpers/cordova'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import PageTitle from './PageTitle'

import resumeUpsellImage from '../assets/images/upsell-resume.png'
import websiteUpsellImage from '../assets/images/upsell-website.png'
import coverLetterUpsellImage from '../assets/images/upsell-cover-letter.png'
import careerJournalUpsellImage from '../assets/images/upsell-journal-entry.png'

const Container = styled.div`
  background: ${({ background }) => background};
  border-radius: 16px;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 24px;

  margin-bottom: var(--dashboard-spacing);
  padding-bottom: 24px;
  position: relative; // required if a component is displayed under <Pins>

  ${media.md`
    flex-direction: row;

    height: 96px;
    padding-right: 24px;
    padding-bottom: 0;
  `}

  ${media.lg`
  `}
`

const Image = styled.div`
  background-color: ${({ background }) => background};
  background-image: url(${({ url }) => url});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  height: 96px;
  width: 100%;

  ${media.sm`
    height: 60px;
  `}

  ${media.md`
    background-position: right;

    height: 96px;
    width: 440px;
  `}

  ${media.lg`
    flex: 1 1 60%;

    min-width: 320px;
  `}

  ${media.xl`
    background-size: contain;

    flex: none;
  `}
`

const Content = styled.div`
  width: calc(100% - 48px);

  ${media.xl`
    min-width: 43%;
    width: unset;
  `}
`

const Title = styled(PageTitle)`
  font-weight: 600;
  font-size: 24px;
  letter-spacing: -0.4px;
  line-height: 85%;

  margin: 0 0 6px;

  ${media.sm`
    text-align: center;
  `}

  ${media.md`
    text-align: left;
  `}

  ${media.lg`
    font-size: 26px;
  `}

  ${media.xl`
    font-size: 30px;

    margin-bottom: 10px;
  `}
`

const Subtitle = styled.p`
  color: ${grey};
  font-size: 16px;

  margin: 0;

  ${media.sm`
    text-align: center;
  `}

  ${media.md`
    text-align: left;
  `}

  ${media.xl`
    font-size: 17px;
  `}
`

const UpgradeButton = styled(Link)`
  ${buttonBig}

  max-width: 400px;
  width: calc(100% - 48px);

  ${media.md`
    width: unset;
  `}
`

const titles = {
  resume: t('your_dream_job_waiting'),
  website: t('own_your_google_search_results'),
  cover_letter: t('your_dream_job_waiting'),
  journal_entry: t('take_control_your_career_journey'),
}

const subtitles = {
  resume: t('pro_templates_proven'),
  website: t('get_noticed_with_personal_website'),
  cover_letter: t('make_best_first_impression'),
  journal_entry: t('keep_track_with_career_journal'),
}

const images = {
  resume: resumeUpsellImage,
  website: websiteUpsellImage,
  cover_letter: coverLetterUpsellImage,
  journal_entry: careerJournalUpsellImage,
}

const backgrounds = {
  resume: violetLight,
  website: blueLightest,
  cover_letter: violetLight,
  journal_entry: mint,
}

/**
 * @param {string} type resume / cover_letter / website / journal_entry
 */
const UpsellBanner = ({ className, type }) => {
  const title = titles[type]
  const subtitle = subtitles[type]
  const image = images[type]
  const background = backgrounds[type]

  const upgrade = (event) => {
    trackEvent('clicked-upgrade', 'click', 0, { section: 'upsell-banner' })

    openUrl(`${conf.host}/app/login`, '_system')(event)
  }

  return (
    <Container
      background={background}
      className={className}>
      <Image
        background={background}
        role="img"
        url={image}
      />

      <Content>
        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Content>

      <UpgradeButton
        $cta
        to="/checkout"
        onClick={upgrade}>
        {t('upgrade_now')}
      </UpgradeButton>
    </Container>
  )
}

UpsellBanner.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string.isRequired,
}

export default UpsellBanner
