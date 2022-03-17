import PropTypes from 'prop-types'
import styled from 'styled-components'

import { grey, greyLightest, primary, primaryLighter } from '../colors'

const Container = styled.ul`
  margin: 13px 30px -6px 0;
`

const Tag = styled.li`
  background-color: ${({ locked }) => (locked ? greyLightest : primaryLighter)};
  border-radius: 12px;
  color: ${({ locked }) => (locked ? grey : primary)};
  font-size: 13px;
  font-weight: 700;
  opacity: ${({ locked }) => (locked ? 0.4 : 1)};
  white-space: pre;

  display: inline-block;
  margin: 0 7px 6px 0;
  padding: 6px 12px;
`

const JournalEntryTags = ({ className, locked, tags }) => {
  if (!tags.length) {
    return null
  }

  return (
    <Container className={className}>
      {tags.map((tag, index) => (
        <Tag
          key={`tag${index}`}
          locked={locked}>
          {tag}
        </Tag>
      ))}
    </Container>
  )
}

JournalEntryTags.propTypes = {
  className: PropTypes.string,
  locked: PropTypes.bool,
  tags: PropTypes.array.isRequired,
}

export default JournalEntryTags
