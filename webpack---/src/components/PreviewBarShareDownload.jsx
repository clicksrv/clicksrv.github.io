import PropTypes from 'prop-types'
import styled from 'styled-components'

import { greyLightest } from '../colors'
import { media } from './styled/Grid'

import ButtonShare from './ButtonShare'
import DropdownDownload from './DropdownDownload'

const Container = styled.aside`
  background-color: white;
  border-bottom: 1px solid ${greyLightest};
  z-index: 3;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  position: fixed;
  top: var(--nav-bar-height);
  left: 0;
  right: 0;

  height: var(--preview-bar-height);

  ${media.lg`
    display: none;
  `}
`

const PreviewBarShareDownload = ({ cv }) => {
  return (
    <Container>
      <ButtonShare cv={cv} />
      <DropdownDownload cv={cv} />
    </Container>
  )
}

PreviewBarShareDownload.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default PreviewBarShareDownload
