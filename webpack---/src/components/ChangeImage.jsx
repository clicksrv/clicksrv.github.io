import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import api from '../services/api'
import conf from '../conf'
import { grey, primary, redDark } from '../colors'
import { media } from './styled/Grid'
import { t } from '../locales'

import MediaPicker from './MediaPicker'
import Tooltip from './Tooltip'

const Title = styled.p`
  color: ${grey};
  cursor: pointer;

  margin: 3px 5px 3px 0;
`

const ActionTooltip = styled(Tooltip)``

const Action = styled.div`
  display: inline-flex;
  align-items: center;

  margin-left: 0;
  margin-right: ${({ last }) => (last ? 7 : 0)}px;
  position: relative;
  width: 30px;

  ${media.lg`
    margin-right: ${({ last }) => (last ? -7 : 0)}px;
  `}

  &:hover {
    ${ActionTooltip} {
      opacity: ${({ dropdownOpen }) => (dropdownOpen ? 0 : 1)};
      transform: translate3d(0, 0, 0);
    }
  }
`

const Icon = styled.i`
  color: ${(props) => (props.danger ? redDark : primary)};
  cursor: pointer;
  font-size: 28px;
`

const ChangeImage = ({ cv, element }) => {
  const { id, theme, style } = cv
  const defaultStyles = conf.themes[theme].styles
  const defaultValue = defaultStyles[element]

  const [modal, setModal] = useState(false)

  const supported = Object.keys(defaultStyles).includes(element)

  if (!supported) {
    return null
  }

  const logoElement = element === '@logo-url'
  const backgroundElement = element === '@bg-url'
  const customImageSelected = style[element] !== defaultValue

  const updateCv = (value) => {
    const updatedCv = {
      id,
      style: {
        ...style,
        [element]: value,
      },
    }

    api.updateCv(updatedCv)
  }

  const onSelect = (asset) => {
    asset = Object.values(asset)[0] || {}
    updateCv(asset.file_url || asset.thumb)
  }

  const resetImage = () => updateCv(defaultValue)

  const openModal = () => setModal(true)
  const closeModal = () => setModal(false)

  const translationKey = () => {
    switch (true) {
      case logoElement:
        return 'logo'
      case backgroundElement:
        return 'background'
    }
  }

  return (
    <>
      <Title onClick={openModal}>{t(translationKey())}</Title>

      <Action>
        <Icon
          className="icon-upload-alt"
          onClick={openModal}
        />

        <ActionTooltip
          bottom
          title={t(`upload_${translationKey()}`)}
        />
      </Action>

      {customImageSelected && (
        <Action last>
          <Icon
            danger
            className="icon-remove"
            onClick={resetImage}
          />

          <ActionTooltip
            bottom
            title={t(`reset_${translationKey()}`)}
          />
        </Action>
      )}

      {modal && (
        <MediaPicker
          title={t(`set_${translationKey()}`)}
          selectedIds={[]}
          multiple={false}
          nullable={true}
          allowExternal={false}
          restrictContentTypes={['image']}
          onSave={onSelect}
          onClose={closeModal}
        />
      )}
    </>
  )
}

ChangeImage.propTypes = {
  cv: PropTypes.object.isRequired,
  element: PropTypes.string.isRequired,
}

export default ChangeImage
