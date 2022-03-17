import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import { t } from '../../locales'

import MediaPicker from '../MediaPicker'
import ProfileImage from '../ProfileImage'

const ImageActions = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 15px;

  a {
    text-decoration: underline;
    margin-bottom: 5px;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const ProfileImageInput = ({ value, setValue }) => {
  const [mediaModal, setMediaModal] = useState(false)

  const onSelect = (asset) => {
    asset = Object.values(asset)[0] || {}

    setValue(asset.thumb)
  }

  const reset = () => {
    setValue(undefined)
  }

  const openMediaModal = () => {
    setMediaModal(true)
  }

  return (
    <div className="media-input">
      <div style={{ display: 'flex' }}>
        <ProfileImage src={value} />

        {value ? (
          <ImageActions>
            <a onClick={openMediaModal}>{t('change_image')}</a>
            <a onClick={reset}>{t('reset')}</a>
          </ImageActions>
        ) : (
          <ImageActions>
            <a onClick={openMediaModal}>{t('add_image')}</a>
          </ImageActions>
        )}
      </div>

      {mediaModal && (
        <MediaPicker
          title={t('add_profile_image')}
          selectedIds={[]}
          multiple={false}
          nullable={true}
          allowExternal={false}
          restrictContentTypes={['image']}
          onSave={onSelect}
          onClose={() => setMediaModal(false)}
        />
      )}
    </div>
  )
}

ProfileImageInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.string,
}

export default ProfileImageInput
