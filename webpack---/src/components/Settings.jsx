import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'

import useCvs from '../hooks/useCvs'
import useSidebar from '../hooks/useSidebar'
import { grey } from '../colors'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import Input from './forms/input'
import Select from './Select'
import UrlInput from './forms/input-url'
import { Btn } from './styled/Button'

const PrivacyInfo = styled.p`
  color: ${grey};
  font-size: 14px;

  margin: 5px 0 20px;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 20px;
`

const Settings = ({ cv }) => {
  const [privacy, setPrivacy] = useState('export')
  const [url, setUrl] = useState(cv.url)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})

  const { handleSidebarItemSelected } = useSidebar()

  const { cvs, updateCv } = useCvs()

  useEffect(() => {
    // will maintain correct privacy setting when it is changed elsewhere (ModalPublish)
    setPrivacy(cv.privacy)
  }, [cv.privacy])

  useEffect(() => {
    if (cv.privacy !== 'export') {
      // will maintain correct Cv url when it is changed elsewhere (ModalPublish)
      setUrl(cv.url)
    }
  }, [cv.privacy, cv.url])

  const onUpdated = () => {
    handleSidebarItemSelected(cv)

    setSubmitting(false)
  }

  const onPublished = (isPublishing) => {
    if (isPublishing) {
      trackEvent('published-cv', 'interaction')
    }
  }

  const onError = (error) => {
    setSubmitting(false)

    if (error?.response?.data) {
      setErrors(error?.response?.data)
    }
  }

  const onSubmit = (data) => {
    setSubmitting(true)
    setErrors({})

    const isPublishing = cv.privacy === 'export' && data.privacy !== 'export'

    updateCv({ id: cv.id, ...data })
      .then(onUpdated)
      .then(() => onPublished(isPublishing))
      .catch(onError)
  }

  const privacyInfo = () => {
    switch (privacy) {
      case 'web':
        return t('web_cv_info')
      case 'unlisted':
        return t('private_cv_info')
      case 'export':
        return t('export_cv_info')
    }
  }

  const privacyOptions = [
    { label: t('web_cv'), value: 'web' },
    { label: t('private_cv'), value: 'unlisted' },
    { label: t('export_only'), value: 'export' },
  ]

  const onSelectChange = (newPrivacy) => {
    setPrivacy(newPrivacy)

    // changing privacy from 'export'
    if (cv.privacy === 'export') {
      const publishedCvs = cvs?.filter((c) => c.published) || []
      const suggestedUrl = publishedCvs.length === 0 ? cv.url_suggestion : `${cv.url_suggestion}-${cv.id}`

      setUrl(suggestedUrl)
    }
  }

  return (
    <Formsy
      onSubmit={onSubmit}
      validationErrors={errors}>
      <Input
        type="text"
        name="name"
        placeholder={t('title')}
        label={t('title')}
        value={cv.name}
        required
      />

      {cv.publishable && (
        <>
          <Select
            name="privacy"
            onChange={onSelectChange}
            options={privacyOptions}
            required
            value={privacy}
          />

          <PrivacyInfo>{privacyInfo()}</PrivacyInfo>

          {privacy !== 'export' && (
            <UrlInput
              name="url"
              required
              label={t('cv_choose_url')}
              setValue={setUrl}
              value={url}
            />
          )}
        </>
      )}

      <Actions>
        <Btn
          type="submit"
          disabled={submitting}>
          {t('save')}
        </Btn>
      </Actions>
    </Formsy>
  )
}

Settings.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default Settings
