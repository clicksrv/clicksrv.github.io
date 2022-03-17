import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useItems from '../hooks/useItems'
import {
  blueLight,
  blueLighter,
  grey,
  greyBluish,
  greyLightest,
  mintDark,
  mintDarker,
  orangeDark,
  orangeLighter,
  violet,
  violetDark,
} from '../colors'
import { newPath } from '../helpers/cv'
import { t } from '../locales'

import PageSubtitle from './PageSubtitle'

import plusImage from '../assets/images/plus.svg'
import coverLetterImage from '../assets/images/skeleton-cover-letter.svg'
import journalEntryImage from '../assets/images/skeleton-journal-entry.svg'
import resumeImage from '../assets/images/skeleton-resume.svg'
import websiteImage from '../assets/images/skeleton-website.svg'

const PlusImage = styled.img`
  opacity: 0;
  transition: opacity 0.3s, top 0.3s, transform 0.3s;
  transform: scale(0.7);

  position: absolute;
  top: calc(50% - 57px);

  display: block;
  margin-left: -20px;
`

const Container = styled(Link)`
  background-color: ${({ $color }) => $color};
  border-radius: 8px;
  transition: background-color 0.3s;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;

  &:hover {
    background-color: ${({ $colorHover }) => $colorHover};

    ${PlusImage} {
      opacity: 1;
      transform: scale(1);

      top: calc(50% - 57px - 11px);
    }
  }
`

const Content = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ImageContent = styled.span`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
`

const Title = styled(PageSubtitle)`
  font-size: 24px;
  font-weight: 400;
  text-align: center;

  margin: -32px 10px 6px;
`

const Subtitle = styled.p`
  color: ${grey};
  font-size: 14px;
  text-align: center;

  margin: 0 15px;
`

const Image = styled.img`
  max-width: 210px;
`

const colors = {
  cover_letter: violet,
  journal_entry: mintDark,
  resume: orangeLighter,
  website: blueLighter,
}

const colorsHover = {
  cover_letter: violetDark,
  journal_entry: mintDarker,
  resume: orangeDark,
  website: blueLight,
}

const titles = {
  cover_letter: t('cover_letter'),
  journal_entry: t('career_journal'),
  resume: t('resume'),
  website: t('website'),
}

const subtitles = {
  cover_letter: t('showcase_your_style'),
  journal_entry: t('track_career_accomplishments'),
  resume: t('create_custom_resumes'),
  website: t('build_professional_website'),
}

const images = {
  cover_letter: coverLetterImage,
  journal_entry: journalEntryImage,
  resume: resumeImage,
  website: websiteImage,
}

/**
 * Used to display big button for creating a first Cv or a Journal Entry
 *
 * @param {boolean} grey force grey color regardless of passed type
 * @param {string} type resume / cover_letter / website / journal_entry
 */
const ButtonAdd = ({ className, grey, type }) => {
  const { items } = useItems(type)
  const user = useSelector((state) => state.session.user)

  const color = grey ? greyLightest : colors[type]
  const colorHover = grey ? greyBluish : colorsHover[type]
  const image = images[type]
  const title = titles[type]
  const subtitle = subtitles[type]
  const to = newPath(user, items, type)

  return (
    <Container
      $color={color}
      $colorHover={colorHover}
      className={className}
      role="button"
      to={to}>
      <Content>
        <ImageContent>
          <Image
            alt={t('create_new')}
            src={image}
          />

          <PlusImage
            alt={t('create_new')}
            src={plusImage}
          />
        </ImageContent>

        <Title>{title}</Title>
        <Subtitle>{subtitle}</Subtitle>
      </Content>
    </Container>
  )
}

ButtonAdd.propTypes = {
  className: PropTypes.string,
  grey: PropTypes.bool,
  type: PropTypes.string.isRequired,
}

export default ButtonAdd
