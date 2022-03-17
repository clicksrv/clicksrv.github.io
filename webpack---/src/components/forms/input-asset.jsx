import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import { t } from '../../locales'

import MediaPicker from '../MediaPicker'

const Container = styled.div`
  display: flex;
  align-items: center;

  a {
    margin-left: 20px;
    text-decoration: underline;
    display: block;

    & + a {
      margin-top: 1em;
    }
  }
`

const Image = styled.div`
  width: 140px;
  height: 100px;
  overflow: hidden;
  background-color: #f4f4f4;
  background-position: center center;
  background-size: cover;
`

const AssetInput = ({ value, setValue }) => {
  const [selectingMedia, setSelectingMedia] = useState(false)

  const onSelect = (selectingMedia) => {
    return (assets) => {
      const asset = Object.values(assets)[0]

      if (!asset) {
        return
      }

      let newValue

      if (selectingMedia === 'thumb') {
        newValue = { ...value, thumb: asset.thumb }
      } else {
        newValue = { ...value, file: asset }
      }

      setValue(newValue)
    }
  }

  return (
    <Container>
      <Image style={{ backgroundImage: `url("${value.thumb}")` }} />

      <div>
        <a
          className="btn-file"
          onClick={() => setSelectingMedia('thumb')}>
          {t('change_thumb')}
        </a>
      </div>

      {selectingMedia && (
        <MediaPicker
          title={t(`change_${selectingMedia}`)}
          selectedIds={[]}
          nullable={false}
          allowExternal={false}
          onSave={onSelect(selectingMedia)}
          onClose={() => setSelectingMedia(false)}
        />
      )}
    </Container>
  )
}

AssetInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.object,
}

export default AssetInput
