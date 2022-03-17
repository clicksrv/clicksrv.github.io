import PropTypes from 'prop-types'
import styled from 'styled-components'
import Zone from 'react-dropzone-component'

import { media } from '../styled/Grid'
import { primary } from '../../colors'

const Container = styled.div`
  .dropzone {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 200px !important;
    border: 2px dashed ${primary} !important;
    color: ${primary};

    i {
      font-size: 32px;
    }

    h3 {
      color: ${primary};
      font-size: 20px;
      font-weight: 400;
      margin: 15px 0;
    }

    .info {
      color: #777;
    }
  }

  ${media.md`
    .dropzone {
      min-height: 300px !important;
    }
  `}
`

const DropZone = ({ config, eventHandlers, djsConfig }) => (
  <Container>
    <Zone
      config={config}
      eventHandlers={eventHandlers}
      djsConfig={djsConfig}
    />
  </Container>
)

DropZone.propTypes = {
  config: PropTypes.object.isRequired,
  eventHandlers: PropTypes.object.isRequired,
  djsConfig: PropTypes.object.isRequired,
}

export default DropZone
