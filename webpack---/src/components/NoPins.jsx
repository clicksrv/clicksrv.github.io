import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grey } from '../colors'
import { t } from '../locales'

import coverLetterImage from '../assets/images/skeleton-cover-letter.svg'
import journalEntryImage from '../assets/images/skeleton-journal-entry.svg'
import resumeImage from '../assets/images/skeleton-resume.svg'
import websiteImage from '../assets/images/skeleton-website.svg'

import PageSubtitle from './PageSubtitle'

const NoPinsImage = styled.img`
  display: block;
  margin: 30px auto -35px;
`

const Title = styled(PageSubtitle)`
  font-size: 24px;
  font-weight: 400;
  text-align: center;

  margin: 0 0 0.3em;
`

const Subtitle = styled.p`
  color: ${grey};
  font-size: 14px;
  font-weight: 350;
  text-align: center;

  margin: 0 0 55px;
`

const titles = {
  resume: t('no_resumes_pinned'),
  website: t('no_websites_pinned'),
  cover_letter: t('no_cover_letters_pinned'),
  journal_entry: t('no_journal_entries_pinned'),
}

const subtitles = {
  resume: t('pin_resumes_to_find'),
  website: t('pin_websites_to_find'),
  cover_letter: t('pin_cover_letters_to_find'),
  journal_entry: t('pin_journal_entries_to_find'),
}

const images = {
  cover_letter: coverLetterImage,
  journal_entry: journalEntryImage,
  resume: resumeImage,
  website: websiteImage,
}

/**
 * @param {string} type resume / cover_letter / website / journal_entry
 */
const NoPins = ({ type }) => {
  const image = images[type]
  const title = titles[type]
  const subtitle = subtitles[type]

  return (
    <>
      <NoPinsImage
        src={image}
        height={190}
        width={212}
      />

      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </>
  )
}

NoPins.propTypes = {
  type: PropTypes.string.isRequired,
}

export default NoPins
