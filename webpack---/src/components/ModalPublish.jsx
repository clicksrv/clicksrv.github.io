import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import history from '../services/history'
import notify from '../services/notify'
import useCvs from '../hooks/useCvs'
import useQuery from '../hooks/useQuery'
import { grey } from '../colors'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import Modal from './Modal'
import SectionTitle from './SectionTitle'
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

  margin-top: 50px;
`

const ModalPublish = ({ isOpen }) => {
  const [errors, setErrors] = useState({})
  const [privacy, setPrivacy] = useState('unlisted')
  const [submitting, setSubmitting] = useState(false)
  const [url, setUrl] = useState(null)
  const { cvId } = useQuery()
  const { cvs, updateCv } = useCvs()
  const { pathname } = useLocation()

  const cv = cvs?.find((c) => c.id.toString() === cvId)

  useEffect(() => {
    if (!cv) {
      return
    }

    const publishedCvs = cvs?.filter((c) => c.published) || []
    const suggestedUrl = publishedCvs.length === 0 ? cv.url_suggestion : `${cv.url_suggestion}-${cv.id}`

    setUrl(suggestedUrl)
  }, [cv, cvs])

  if (!cv) {
    return null
  }

  if (!cv.publishable) {
    history.push('/checkout')

    return null
  }

  const onError = (error) => {
    setSubmitting(false)

    if (error?.response?.data) {
      setErrors(error?.response?.data)
    }

    notify.error(t('cv_update_error'))
  }

  const onSuccess = () => {
    trackEvent('published-cv', 'interaction')

    history.push(`?modal=share&cvId=${cvId}`)

    setSubmitting(false)
  }

  const onSubmit = (form) => {
    setSubmitting(true)
    setErrors({})

    const updatedCv = {
      id: cv.id,
      ...form,
    }

    updateCv(updatedCv).then(onSuccess).catch(onError)
  }

  const privacyInfo = () => {
    switch (privacy) {
      case 'web':
        return t('web_cv_info')
      case 'unlisted':
        return t('private_cv_info')
    }
  }

  const privacyOptions = [
    { label: t('web_cv'), value: 'web' },
    { label: t('private_cv'), value: 'unlisted' },
  ]

  const onSelectChange = (value) => setPrivacy(value)

  return (
    <Modal
      closeUrl={pathname}
      isOpen={isOpen}
      maxWidth={720}>
      <SectionTitle>{t('publish')}</SectionTitle>

      <Formsy
        onSubmit={onSubmit}
        validationErrors={errors}>
        <Select
          name="privacy"
          onChange={onSelectChange}
          options={privacyOptions}
          required
          value={privacy}
        />

        <PrivacyInfo>{privacyInfo()}</PrivacyInfo>

        <UrlInput
          label={t('cv_choose_url')}
          name="url"
          required
          setValue={setUrl}
          value={url}
        />

        <Actions>
          <Btn
            disabled={submitting}
            type="submit">
            {t('next')}
          </Btn>
        </Actions>
      </Formsy>
    </Modal>
  )
}

ModalPublish.propTypes = {
  isOpen: PropTypes.bool,
}

export default ModalPublish
