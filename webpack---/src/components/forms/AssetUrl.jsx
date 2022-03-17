import _ from 'lodash'
import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import Input from '../forms/input'
import MediaPicker from '../MediaPicker'
import { getYouTubeId, getYouTubeUrl } from '../../helpers/youtube'
import { t } from '../../locales'

const Radio = styled.label`
  display: inline-flex;
  align-items: center;

  margin: 0 1em 0.5em 0;

  input {
    margin-right: 6px;
  }
`

const FileInput = styled.div`
  position: relative;

  a {
    position: absolute;
    right: 15px;
    top: 16px;
  }
`

const AssetUrl = ({ value, setValue }) => {
  const [selectingFile, setSelectingFile] = useState(false)

  const handleTypeChange = (e) => {
    const { value: type } = e.target

    setValue({ ...value, type })
  }

  const setUrl = (url) => {
    setValue({
      ...value,
      url_data: {
        link_url: url,
      },
    })
  }

  const setYouTubeKey = (key) => {
    setValue({
      ...value,
      youtube_data: {
        file_key: getYouTubeId(key),
      },
    })
  }

  const onSelectFile = (assets) => {
    const asset = Object.values(assets)[0]

    if (asset) {
      setValue({
        ...value,
        file_data: _.pick(asset, ['id', 'type', 'file_key', 'file_url', 'file_name']),
      })
    }
  }

  const filename = (fileData) => {
    return fileData.file_key ? `${fileData.file_key} (${fileData.type})` : fileData.file_name
  }

  const youTubeUrl = getYouTubeUrl(value.youtube_data.file_key)

  const handleFormChange = (e) => {
    if (value.type === 'url') {
      setUrl(e.url)
    }

    if (value.type === 'youtube') {
      setYouTubeKey(e.youtube)
    }
  }

  return (
    <div>
      <div>
        <Radio>
          <input
            type="radio"
            name="type"
            checked={value.type === 'file'}
            value="file"
            onChange={handleTypeChange}
          />{' '}
          {t('select_file')}
        </Radio>

        <Radio>
          <input
            type="radio"
            name="type"
            checked={value.type === 'url'}
            value="url"
            onChange={handleTypeChange}
          />{' '}
          {t('url')}
        </Radio>

        <Radio>
          <input
            type="radio"
            name="type"
            checked={value.type === 'youtube'}
            value="youtube"
            onChange={handleTypeChange}
          />{' '}
          YouTube
        </Radio>
      </div>

      <Formsy onChange={handleFormChange}>
        {value.type === 'file' && (
          <FileInput>
            <Input
              type="text"
              name="filename"
              value={filename(value.file_data)}
              disabled
            />

            <a onClick={() => setSelectingFile(true)}>{t('change_file')}</a>
          </FileInput>
        )}

        {value.type === 'url' && (
          <Input
            type="text"
            name="url"
            onChange={setUrl}
            value={value.url_data.link_url}
          />
        )}
        {value.type === 'youtube' && (
          <Input
            type="text"
            name="youtube"
            value={youTubeUrl}
            onChange={setYouTubeKey}
          />
        )}
      </Formsy>

      {selectingFile && (
        <MediaPicker
          title={t('change_file')}
          selectedIds={[]}
          nullable={false}
          allowExternal={false}
          onSave={onSelectFile}
          onClose={() => setSelectingFile(false)}
        />
      )}
    </div>
  )
}

AssetUrl.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.object,
}

export default AssetUrl
