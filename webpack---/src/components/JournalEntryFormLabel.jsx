import styled from 'styled-components'

const JournalEntryFormLabel = styled.label`
  color: black;
  cursor: pointer;
  font-size: 18px;
  font-weight: 700;

  display: block;
  margin-bottom: 10px;

  &::after {
    content: '${(props) => (props.isRequired ? ' *' : '')}';
  }
`

export default JournalEntryFormLabel
