import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import useCvs from '../hooks/useCvs'
import useJournalEntries from '../hooks/useJournalEntries'
import { grey, greyLightest, greySubtleBluish, primary } from '../colors'
import { isCoverLetter, isResume, isWebsite, newPath } from '../helpers/cv'
import { t } from '../locales'
import { media } from './styled/Grid.jsx'

import careerJournalSkeleton from '../assets/images/skeleton-journal-entry.svg'
import careerJournalSkeletonComplete from '../assets/images/skeleton-journal-entry-complete.svg'
import checkmarkComplete from '../assets/images/checkmark-green.png'
import checkmarkIncomplete from '../assets/images/checkmark-grey.png'
import coverLetterSkeleton from '../assets/images/skeleton-cover-letter.svg'
import coverLetterSkeletonComplete from '../assets/images/skeleton-cover-letter-complete.svg'
import resumeSkeleton from '../assets/images/skeleton-resume.svg'
import resumeSkeletonComplete from '../assets/images/skeleton-resume-complete.svg'
import websiteSkeleton from '../assets/images/skeleton-website.svg'
import websiteSkeletonComplete from '../assets/images/skeleton-website-complete.svg'

const OnboardingCardsWrapper = styled.div`
  transition: max-height 0.5s ease-in-out;

  max-height: 0;
  width: 100%;

  ${media.md`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--dashboard-spacing);

    max-height: unset;
    padding: 16px;
  `}

  ${media.lg`
    grid-template-columns: 1fr 1fr 1fr 1fr;
  `}
`

const Chevron = styled.i`
  color: ${primary};
  transform: rotate(90deg);
  transition: transform 0.4s;

  position: absolute;
  right: 16px;
  top: 21px;

  ${media.md`
    display: none;
  `}
`

const AccordionInput = styled.input`
  cursor: pointer;
  opacity: 0;

  height: 60px;
  margin: auto 16px auto auto;
  position: absolute;
  width: 100%;
  z-index: 1;

  ${media.md`
    display: none;
  `}
`

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(62, 148, 228, 0.2);
  overflow: hidden;
  position: relative;

  display: flex;
  flex-wrap: wrap;

  position: relative;

  ${media.md`
    background-color: ${greySubtleBluish};
    border-radius: 16px;
    box-shadow: unset;
  `}

  ${AccordionInput}:checked ~ ${OnboardingCardsWrapper} {
    max-height: 230px;
  }

  ${AccordionInput}:checked ~ ${Chevron} {
    transform: rotate(270deg);
  }
`

const CardCopy = styled.div`
  color: ${grey};

  height: max-content;
`

const CardTitle = styled.p`
  color: black;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;

  margin-bottom: 4px;
`

const CardSubtitle = styled.p`
  font-size: 14px;
  line-height: 20px;

  display: none;
  margin-bottom: 0;

  ${media.md`
    display: block;
  `}
`

const CardIcon = styled.img`
  display: none;
  margin-bottom: -13px;

  ${media.md`
    display: block;
  `}
`

const CheckmarkIconMobile = styled.img`
  display: block;
  margin-right: 13px;
  margin-bottom: 3px;

  ${media.md`
    display: none;
  `}
`

const PlusIcon = styled.i`
  background: ${primary};
  border-radius: 32px;
  color: white;
  cursor: pointer;
  font-size: 24px;
  text-align: center;

  display: inline-flex;
  flex-direction: column;
  justify-content: center;

  height: 24px;
  margin-left: auto;
  margin-right: 0;
  width: 24px;

  ${media.md`
    display: none;
  `}
`

const cardCompletedStyles = css`
  background-color: ${greyLightest};
  box-shadow: unset;

  :hover {
    box-shadow: unset;
  }

  ${media.md`
    ${CardTitle} {
      color: ${grey};
    }
  `}
`

const OnboardingCard = styled(Link)`
  background-color: white;
  box-shadow: inset 0 -1px 0 ${greyLightest};
  transition: box-shadow 0.4s;

  display: flex;
  align-items: center;

  min-width: 100%;
  padding: 16px;

  ${media.md`
    border-radius: 16px;
    box-shadow: 0 2px 4px rgba(62, 148, 228, 0.2);

    min-width: unset;
    padding: 10px 14px 8px 2px;

    :hover {
      box-shadow: 0 5px 10px -5px rgba(62, 148, 228, 0.2), 0 15px 30px 5px rgba(62, 148, 228, 0.15);
    }

    ${({ $completed }) => $completed && cardCompletedStyles}
  `}
`

const AccordionTitle = styled.span`
  color: black;
  font-weight: 600;
  font-size: 14px;
  line-height: 16px;

  margin: 22px 16px;

  ${media.md`
    display: none;
  `}
`

const DashboardOnboardingBar = ({ className }) => {
  const { cvs } = useCvs()
  const { journalEntries } = useJournalEntries()
  const user = useSelector((state) => state.session.user)

  const resumes = cvs.filter(isResume)
  const websites = cvs.filter(isWebsite)
  const coverLetters = cvs.filter(isCoverLetter)

  const resumePath = newPath(user, resumes, 'resume')
  const websitePath = newPath(user, websites, 'website')
  const careerJournalPath = newPath(user, journalEntries, 'journal_entry')
  const coverLetterPath = newPath(user, coverLetters, 'cover_letter')

  const createdResume = Boolean(resumes.length)
  const createdWebsite = Boolean(websites.length)
  const createdJournalEntry = Boolean(journalEntries.length)
  const createdCoverLetter = Boolean(coverLetters.length)

  // don't display onboarding if all steps are completed
  if (createdResume && createdWebsite && createdJournalEntry && createdCoverLetter) {
    return null
  }

  return (
    <Container className={className}>
      <AccordionTitle>{t('best_from_visualcv')}</AccordionTitle>

      <AccordionInput type="checkbox" />

      <Chevron className="icon-chevron" />

      <OnboardingCardsWrapper>
        <OnboardingCard
          to={resumePath}
          $completed={createdResume}>
          <CardIcon
            width="90"
            height="90"
            src={createdResume ? resumeSkeletonComplete : resumeSkeleton}
          />

          <CheckmarkIconMobile
            width="20"
            height="20"
            src={createdResume ? checkmarkComplete : checkmarkIncomplete}
          />

          <CardCopy>
            <CardTitle>{t('create_a_resume')}</CardTitle>
            <CardSubtitle>{t('land_your_next_job')}</CardSubtitle>
          </CardCopy>

          <PlusIcon className="icon-plus" />
        </OnboardingCard>

        <OnboardingCard
          to={websitePath}
          $completed={createdWebsite}>
          <CardIcon
            width="90"
            height="90"
            src={createdWebsite ? websiteSkeletonComplete : websiteSkeleton}
          />

          <CheckmarkIconMobile
            width="20"
            height="20"
            src={createdWebsite ? checkmarkComplete : checkmarkIncomplete}
          />

          <CardCopy>
            <CardTitle>{t('create_a_website')}</CardTitle>
            <CardSubtitle>{t('market_yourself_online')}</CardSubtitle>
          </CardCopy>

          <PlusIcon className="icon-plus" />
        </OnboardingCard>

        <OnboardingCard
          to={careerJournalPath}
          $completed={createdJournalEntry}>
          <CardIcon
            width="90"
            height="90"
            src={createdJournalEntry ? careerJournalSkeletonComplete : careerJournalSkeleton}
          />

          <CheckmarkIconMobile
            width="20"
            height="20"
            src={createdJournalEntry ? checkmarkComplete : checkmarkIncomplete}
          />

          <CardCopy>
            <CardTitle>{t('create_a_journal_entry')}</CardTitle>
            <CardSubtitle>{t('track_career_highlights')}</CardSubtitle>
          </CardCopy>

          <PlusIcon className="icon-plus" />
        </OnboardingCard>

        <OnboardingCard
          to={coverLetterPath}
          $completed={createdCoverLetter}>
          <CardIcon
            width="90"
            height="90"
            src={createdCoverLetter ? coverLetterSkeletonComplete : coverLetterSkeleton}
          />

          <CheckmarkIconMobile
            width="20"
            height="20"
            src={createdCoverLetter ? checkmarkComplete : checkmarkIncomplete}
          />

          <CardCopy>
            <CardTitle>{t('create_a_cover_letter')}</CardTitle>
            <CardSubtitle>{t('show_personality')}</CardSubtitle>
          </CardCopy>

          <PlusIcon className="icon-plus" />
        </OnboardingCard>
      </OnboardingCardsWrapper>
    </Container>
  )
}

DashboardOnboardingBar.propTypes = {
  className: PropTypes.string,
}

export default DashboardOnboardingBar
