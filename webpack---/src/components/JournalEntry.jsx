import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import parseHostname from '../helpers/parseHostname'
import useJournalEntries from '../hooks/useJournalEntries'
import { black, grey, greyLight, primary, primaryFaded, primaryFadedLess } from '../colors'

import JournalEntryActions from './JournalEntryActions'
import JournalEntryTags from './JournalEntryTags'
import Lock from './Lock'
import SectionSubtitle from './SectionSubtitle'

const Container = styled.li`
  background: white;
  border-radius: 16px;
  box-shadow: 0 1px 1px ${primaryFadedLess};
  transition: box-shadow 0.3s;

  margin-bottom: 15px;
  min-height: 70px;
  padding: 19px 24px 24px;
  position: relative;

  :hover {
    ${({ locked }) => !locked && `box-shadow: 0 5px 10px -5px ${primaryFaded}, 0 15px 30px 5px ${primaryFaded};`}
  }
`

const Icon = styled.i`
  color: ${({ locked }) => (locked ? greyLight : primary)};
  font-size: 18px;

  margin-right: 4px;
`

const Title = styled(SectionSubtitle)`
  color: ${({ $locked }) => ($locked ? grey : black)};

  display: block;
  margin: 0 40px 0 0;

  &:hover {
    color: ${({ $locked }) => ($locked ? grey : black)};
  }
`

const Description = styled.div`
  color: ${({ locked }) => (locked ? greyLight : grey)};
  font-weight: 300;

  margin: 8px 40px 0 0;

  &:empty {
    margin-top: 0;
  }
`

const Assets = styled.ul`
  list-style: none;

  margin-top: 15px;
`

const Asset = styled.li`
  display: flex;
  align-items: center;

  margin: 0 5px 6px 0;
`

const AssetLink = styled.a`
  color: ${({ locked }) => (locked ? greyLight : primary)};
  font-size: 14px;
  font-weight: 300;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  :hover {
    color: ${({ locked }) => (locked ? greyLight : primary)};
  }
`

const EntryLink = styled.a`
  color: ${({ locked }) => (locked ? greyLight : primary)};

  display: block;
  margin-top: 12px;

  :hover {
    color: ${({ locked }) => (locked ? greyLight : primary)};
  }
`

const Actions = styled(JournalEntryActions)`
  top: 16px;
  bottom: unset;
`

const JournalEntry = ({ journalEntry }) => {
  const { latestJournalEntry } = useJournalEntries()
  const user = useSelector((state) => state.session.user)

  const { assets, description, id, link, tags, title } = journalEntry
  const { free_tier: freeTier } = user

  const isLatestEntry = journalEntry === latestJournalEntry

  const locked = freeTier && !isLatestEntry

  const displayAssets = !!assets?.length && assets.length > 0

  const host = parseHostname(link)

  const editPath = `/journal/entries/${id}/edit`

  return (
    <Container locked={locked}>
      <Title
        $locked={locked}
        as={locked ? Title : Link}
        to={editPath}>
        {title}
      </Title>

      <Description
        className="mce-content-body"
        dangerouslySetInnerHTML={{ __html: description }}
        locked={locked}
      />

      {displayAssets && (
        <Assets>
          {assets.map(({ id, file_name: name, file_url: url }) => (
            <Asset key={`asset${id}`}>
              <Icon
                className="icon-document-empty-alt"
                locked={locked}
              />

              <AssetLink
                href={url}
                locked={locked}
                rel="noopener noreferrer"
                target="_blank">
                {name}
              </AssetLink>
            </Asset>
          ))}
        </Assets>
      )}

      {link && host && (
        <EntryLink
          href={link}
          locked={locked}
          rel="noopener noreferrer"
          target="_blank">
          {host}
        </EntryLink>
      )}

      <JournalEntryTags
        locked={locked}
        tags={tags}
      />

      <Actions
        journalEntry={journalEntry}
        locked={locked}
      />

      {locked && <Lock />}
    </Container>
  )
}

JournalEntry.propTypes = {
  journalEntry: PropTypes.object.isRequired,
}

export default JournalEntry
