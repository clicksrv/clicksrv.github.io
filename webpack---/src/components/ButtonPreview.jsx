import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

import history from '../services/history'
import { black, grey, primary } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import InputCheckbox from './InputCheckbox'
import Tooltip from './Tooltip'

const Form = styled(Formsy)``

const Icon = styled.i`
  color: ${({ preview }) => (preview ? primary : grey)};
  font-size: 26px;
  transition: color 0.3s;

  display: block;
  margin-right: 6px;
  margin-bottom: -1px;
`

const IconTooltip = styled(Tooltip)`
  left: 35px;
`

const Label = styled.span`
  color: ${({ preview }) => (preview ? primary : grey)};
  transition: color 0.3s;

  display: none;
  margin-right: 10px;

  ${media.xl`
    display: block;
  `}
`

const Container = styled(Link)`
  font-size: 14px;
  font-weight: 400;

  display: flex;
  align-items: center;

  position: relative;

  &:hover {
    ${Icon} {
      color: ${primary};
    }

    ${IconTooltip} {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }

    ${Label} {
      color: ${({ $preview }) => ($preview ? primary : black)};
    }

    ${media.xl`
      ${IconTooltip} {
        opacity: 0;
      }
    `}
  }
`

const ButtonPreview = ({ cv }) => {
  const { pathname } = useLocation()
  const isPreviewPath = pathname.endsWith('preview')

  const [preview, setPreview] = useState(isPreviewPath)

  const basePath = `/cvs/${cv.id}`
  const to = preview ? basePath : `${basePath}/preview`

  const onClick = (event) => {
    event.preventDefault()
    event.stopPropagation()

    setPreview(!preview)

    // using setTimeout allows InputCheckbox's animation to finish
    setTimeout(() => history.push(to), 200)
  }

  const title = t('preview_mode')

  return (
    <Form>
      <Container
        onClick={onClick}
        $preview={preview}
        role="button"
        to={to}>
        <Icon
          className="icon-eye"
          preview={preview}
        />

        <Label preview={preview}>{title}</Label>

        <InputCheckbox
          name="preview"
          value={preview}
        />

        <IconTooltip
          bottom
          title={title}
        />
      </Container>
    </Form>
  )
}

ButtonPreview.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default ButtonPreview
