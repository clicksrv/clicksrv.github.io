import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'

import conf from '../conf'
import useQuery from '../hooks/useQuery'
import { openUrl } from '../helpers/cordova'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import Button from './styled/Button'
import Modal from './Modal'
import SectionTitle from './SectionTitle'
import { greySubtleBluish } from '../colors'
import { media } from './styled/Grid'

import coverLetterLimitImage from '../assets/images/upgrade/upgrade_cover_letter_limit.png'
import proFeatureImage from '../assets/images/upgrade/upgrade_pro_feature.png'
import resumeLimitImage from '../assets/images/upgrade/upgrade_resume_limit.png'
import websiteLimitImage from '../assets/images/upgrade/upgrade_website_limit.png'
import journalEntryLimitImage from '../assets/images/skeleton-journal-entry.svg'

const ModalSectionTop = styled.div`
  background-color: ${greySubtleBluish};

  padding: 44px 54px 19px;
`

const ModalSectionBottom = styled.div`
  margin: auto;
  padding: 16px 24px calc(env(safe-area-inset-bottom) + 25px);

  ${media.sm`
    margin: unset;
    padding: 32px 23px 24px;
  `}
`

const ModalSectionImage = styled.img`
  height: 180px;

  ${media.md`
    height: 264px;
  `}
`

const Container = styled.div`
  text-align: center;

  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  height: 100%;

  ${media.sm`
    display: block;
    height: initial;
  `}
`

const UpgradeTitle = styled(SectionTitle)`
  margin-bottom: 16px;
`

const UpgradeReason = styled.p``

const UpgradeButtonWrapper = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-top: 14px;

  ${media.sm`
    flex-direction: row;

    margin-top: 40px;
  `}
`

const CancelButton = styled(Button)`
  flex: 1;
`

const UpgradeButton = styled(Button)`
  flex: 1;
`

const ModalUpgrade = ({ isOpen }) => {
  const { pathname } = useLocation()
  const query = useQuery()

  const { reason } = query

  const genericProFeature = {
    title: t('upgrade_pro_feature'),
    image: proFeatureImage,
    description: t('upgrade_to_access_pro_features'),
  }

  const proTemplate = {
    ...genericProFeature,
    description: t('upgrade_pro_template_description'),
  }

  const cvLimit = {
    title: t('upgrade_cv_limit'),
    image: resumeLimitImage,
    description: t('upgrade_cv_limit_description'),
  }

  const resumeLimit = {
    title: t('upgrade_resume_limit'),
    image: resumeLimitImage,
    description: t('upgrade_resume_limit_description'),
  }

  const coverLetterLimit = {
    title: t('upgrade_cover_letter_limit'),
    image: coverLetterLimitImage,
    description: t('upgrade_cover_letter_limit_description'),
  }

  const websiteLimit = {
    title: t('upgrade_website_limit'),
    image: websiteLimitImage,
    description: t('upgrade_website_limit_description'),
  }

  const journalEntryLimit = {
    title: t('upgrade_journal_entry_limit'),
    image: journalEntryLimitImage,
    description: t('upgrade_journal_entry_limit_description'),
  }

  const shareResume = {
    ...genericProFeature,
    description: t('upgrade_share_resume'),
  }

  const shareWebsite = {
    ...genericProFeature,
    description: t('upgrade_share_website'),
  }

  const emailReminders = {
    ...genericProFeature,
    description: t('upgrade_email_reminders'),
  }

  const wordDownload = {
    ...genericProFeature,
    description: t('upgrade_word_download'),
  }

  const removeBranding = {
    ...genericProFeature,
    description: t('upgrade_remove_branding'),
  }

  const getReasonContent = () => {
    switch (reason) {
      case 'cv-limit':
        return cvLimit
      case 'resume-limit':
        return resumeLimit
      case 'cover-letter-limit':
        return coverLetterLimit
      case 'website-limit':
        return websiteLimit
      case 'journal-entry-limit':
        return journalEntryLimit
      case 'pro-reminders-feature':
        return emailReminders
      case 'pro-word-feature':
        return wordDownload
      case 'pro-share-website':
        return shareWebsite
      case 'pro-share-feature':
        return shareResume
      case 'pro-template':
        return proTemplate
      case 'remove-branding':
        return removeBranding
      default:
        // should not be reached
        return genericProFeature
    }
  }

  const reasonContent = getReasonContent()

  const upgradeReason = process.env.CORDOVA ? t('mobile_paywall') : reasonContent.description

  const upgrade = (event) => {
    trackEvent('clicked-upgrade', 'click', 0, { section: 'modal-upgrade' })

    openUrl(`${conf.host}/app/login`, '_system')(event)
  }

  return (
    <Modal
      dismissable
      maxWidth={600}
      noPadding
      closeUrl={pathname}
      isOpen={isOpen}>
      <Container>
        <ModalSectionTop>
          <UpgradeTitle>{reasonContent.title}</UpgradeTitle>

          <ModalSectionImage src={reasonContent.image} />
        </ModalSectionTop>

        <ModalSectionBottom>
          <UpgradeReason>{upgradeReason}</UpgradeReason>

          <UpgradeButtonWrapper>
            <CancelButton
              hollow
              to={pathname}>
              {t('not_yet')}
            </CancelButton>

            {reason !== 'cv-limit' && (
              <UpgradeButton
                cta
                to="/checkout"
                onClick={upgrade}>
                {process.env.CORDOVA ? t('vcv_web') : t('upgrade')}
              </UpgradeButton>
            )}
          </UpgradeButtonWrapper>
        </ModalSectionBottom>
      </Container>
    </Modal>
  )
}

ModalUpgrade.propTypes = {
  isOpen: PropTypes.bool,
}

export default ModalUpgrade
