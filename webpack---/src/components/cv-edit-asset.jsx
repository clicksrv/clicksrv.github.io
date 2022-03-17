import _ from 'lodash'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'

import conf from '../conf'
import events from '../services/events'
import history from '../services/history'
import useQuery from '../hooks/useQuery'
import { getContent } from '../helpers/cv'
import { t } from '../locales'

import AssetInput from './forms/input-asset'
import AssetUrl from './forms/AssetUrl'
import Button, { Btn } from './styled/Button'
import SectionTitle from './SectionTitle'
import { FormBuilder } from './forms'

/**
 * TODO DRY this up, too similar to cv-edit, use a base component and share some service logic out
 */
export const CvEditAsset = ({ params, params: { sectionKey, index, assetIndex } }) => {
  const cv = useSelector((state) => state.editor.cv)
  const location = useLocation()
  const query = useQuery()

  const returnParam = location.pathname.match('articles/portfolio') ? `/cvs/${cv.id}` : `/cvs/${cv.id}/edit`
  const returnPath = query.return
    ? `${query.return}?return=${returnParam}`
    : `/cvs/${cv.id}/edit/${sectionKey}?return=${returnParam}`

  const handleSubmit = (body) => {
    const eventParams = Object.assign({ attr: 'assets' }, params)

    const data = {
      ..._.omit(body, ['_media', '_file']),
      ...body._file.url_data,
      ...body._file.youtube_data,
      ...body._file.file_data,
      thumb: body._media.thumb,
    }

    const { type } = body._file

    if (type === 'file') {
      data.link_url = ''
      data.file_key = ''
    }

    if (type === 'url') {
      data.type = 'url'
      data.file_key = ''
      data.file_name = ''
      data.file_url = ''
    }

    if (type === 'youtube') {
      data.type = 'youtube'
      data.link_url = ''
      data.file_name = ''
      data.file_url = ''
    }

    events.emit('CV::UPDATE', { data, ...eventParams })

    history.push(returnPath)
  }

  // TODO refactor: all core logic should be in the stores, but we'll need to fully control the router through state
  const schema = conf.formSchema.asset
  const supportedKeys = _.keys(schema) // TODO FormBuilder should support hidden inputs, or just pass data through

  const data = _.get(getContent(cv, sectionKey, index), ['assets', assetIndex])

  const type = () => {
    if (data.link_url) {
      return 'url'
    } else if (data.type === 'youtube') {
      return 'youtube'
    }

    return 'file'
  }

  const proxyFields = {
    _media: {
      thumb: data.thumb,
      file: null,
    },
    _file: {
      type: type(),
      url_data: _.pick(data, ['link_url']),
      youtube_data: _.pick(data, ['file_key']),
      file_data: _.pick(data, ['id', 'type', 'file_url', 'file_name']),
    },
  }

  const formData = {
    ...proxyFields,
    ...schema,
    ..._.omit(data, ['thumb', '_media', '_file']),
  }

  const formSchema = {
    _media: {
      customType: AssetInput,
    },
    _file: {
      customType: AssetUrl,
    },
    title: {
      label: t('title'),
    },
  }

  const [validForm, setValidForm] = useState(true)

  const handleChange = (currentValues) => {
    const mediaType = currentValues._file.type

    const validFile = mediaType === 'file' && currentValues._file.file_data.file_url

    const validYouTubeUrl = mediaType === 'youtube' && currentValues._file.youtube_data.file_key

    const linkUrl = currentValues._file.url_data.link_url
    const validUrl = mediaType === 'url' && linkUrl && linkUrl.match(/http(s)?:\/\/.+/)

    if (validFile || validYouTubeUrl || validUrl) {
      setValidForm(true)
    } else {
      setValidForm(false)
    }
  }

  // NOTE: it doesn't make sense for users to upload a cover image for an image asset?
  return (
    <>
      <SectionTitle>{t('edit_portfolio_item')}</SectionTitle>

      <FormBuilder
        className="image-asset-form"
        schema={formSchema}
        formData={formData}
        sectionKey={sectionKey}
        editableKeys={supportedKeys}
        onValidSubmit={handleSubmit}
        onChange={handleChange}>
        <Btn
          type="submit"
          disabled={!validForm}>
          {t('save')}
        </Btn>

        <Button
          to={returnPath}
          white>
          {t('cancel')}
        </Button>
      </FormBuilder>
    </>
  )
}

CvEditAsset.propTypes = {
  params: PropTypes.object.isRequired,
}

export default CvEditAsset
