import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import useJournalEntries from '../hooks/useJournalEntries'
import { black, grey, greyLight, greyLightest, primaryFadedLess } from '../colors'
import { buttonBorderless, buttonRegular } from '../styles/buttons'
import { dateFromISOString, isCurrentYear } from '../helpers/dates'
import { media } from './styled/Grid'
import { t } from '../locales'

import JournalEntryActions from './JournalEntryActions'
import Lock from './Lock'
import PlaceholderImage from './PlaceholderImage'
import Tooltip from './Tooltip'

const ImageContainer = styled.span`
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
  transition: max-height 0.4s;

  display: flex;
  max-height: calc(var(--cv-card-small-height) - var(--cv-card-content-full-height));

  ${media.md`
    max-height: calc(var(--cv-card-small-height) - var(--cv-card-content-compact-height));
  `}
`

const ContentContainer = styled.div`
  overflow: hidden;
  transition: height 0.4s;

  height: var(--cv-card-content-full-height);

  ${media.md`
    height: var(--cv-card-content-compact-height);
  `}
`

const Buttons = styled.aside`
  transition: margin-top 0.4s;

  margin-top: 11px;

  ${media.md`
    margin-top: 16px;
  `}
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

const ButtonEdit = styled(Link)`
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

const ButtonUpgrade = styled(Link)`
  ${buttonRegular}

  max-width: unset;
  width: 100%;
`

const Container = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 1px ${primaryFadedLess};

  display: flex;
  flex-direction: column;

  min-width: var(--cv-card-minimum-width);
  position: relative;
  width: 100%;

  :hover {
    ${ImageContainer} {
      ${media.md`
        max-height: calc(var(--cv-card-small-height) - var(--cv-card-content-full-height));
      `}
    }

    ${ContentContainer} {
      ${media.md`
        height: var(--cv-card-content-full-height);
      `}
    }

    ${Buttons} {
      margin-top: 11px;
    }
  }
`

const BackgroundImage = styled.div`
  background-image: url(${({ url }) => url});
  background-position: center;
  background-size: cover;
  ${({ locked }) => locked && 'filter: grayscale(1);'}

  height: calc(var(--cv-card-small-height) - var(--cv-card-content-compact-height));
  width: 100%;
`

const Content = styled.section`
  border-top: 1px solid ${greyLightest};

  height: var(--cv-card-content-compact-height);
  padding: 16px;
  position: relative;
`

const Title = styled.h3`
  color: ${({ $locked }) => ($locked ? grey : black)};
  font-size: 14px;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: block;
  margin: 0 45px 6px 0;

  &:hover {
    color: ${({ $locked }) => ($locked ? grey : black)};
  }
`

const Updated = styled.p`
  color: ${({ locked }) => (locked ? greyLight : grey)};
  font-size: 12px;
  font-weight: 500;

  margin: 0;
`

const JournalPin = ({ className, index, journalEntry }) => {
  const locale = useSelector((state) => state.application.locale)
  const user = useSelector((state) => state.session.user)
  const { latestJournalEntry } = useJournalEntries()

  const { assets, id, title, updated_at: updatedAt } = journalEntry
  const { free_tier: freeTier } = user

  const isLatestEntry = journalEntry === latestJournalEntry

  const locked = freeTier && !isLatestEntry

  const updatedDate = dateFromISOString(updatedAt)
  const yearFormat = isCurrentYear(updatedDate) ? undefined : 'numeric'
  const formattedDate = updatedDate.toLocaleDateString(locale, { year: yearFormat, month: 'short', day: 'numeric' })

  const updated = t('updated_at', { date: formattedDate })

  const assetImage = assets.find((asset) => asset.type === 'image')

  const editPath = `/journal/entries/${id}/edit`
  const editTitle = t('edit')

  return (
    <Container className={className}>
      <ImageContainer
        as={locked ? ImageContainer : Link}
        to={editPath}>
        {assetImage ? (
          <BackgroundImage
            locked={locked}
            url={assetImage.thumb}
          />
        ) : (
          <PlaceholderImage
            index={index}
            locked={locked}
          />
        )}
      </ImageContainer>

      <ContentContainer>
        <Content>
          <Title
            $locked={locked}
            as={locked ? Title : Link}
            to={editPath}>
            {title}
          </Title>

          <Updated locked={locked}>{updated}</Updated>

          <Buttons>
            {!locked && (
              <ButtonContainer>
                <ButtonEdit
                  className="icon-pencil"
                  to={editPath}
                />

                <ButtonTooltip
                  title={editTitle}
                  top
                />
              </ButtonContainer>
            )}

            {locked && (
              <ButtonUpgrade
                $cta
                to="/checkout">
                {t('upgrade_to_access')}
              </ButtonUpgrade>
            )}
          </Buttons>
        </Content>
      </ContentContainer>

      {!locked && (
        <JournalEntryActions
          index={index}
          journalEntry={journalEntry}
        />
      )}

      {locked && <Lock compact />}
    </Container>
  )
}

JournalPin.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  journalEntry: PropTypes.object.isRequired,
}

export default JournalPin
