import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import notify from '../services/notify'
import useOnboarding from '../hooks/useOnboarding'
import useSidebar from '../hooks/useSidebar'
import { grey } from '../colors'
import { importCvContentFromUpload, isRecentlyCreated } from '../helpers/cv'
import { t } from '../locales'
import { trackEvent } from '../helpers/analytics'

import ModalConfirm from './ModalConfirm'
import UploadLinkedIn from './UploadLinkedIn'
import Uploader from './Uploader'
import UseLinkedIn from './UseLinkedIn'
import { Btn } from './styled/Button'

const Subtitle = styled.p`
  color: ${grey};
  font-size: 14px;

  margin-bottom: 15px;
`

const ContainerForm = styled.div`
  margin-top: 10px;
  max-width: 430px;
`

const FileUploader = styled(Uploader)`
  margin-bottom: 30px;
`

const LinkedIn = styled(UseLinkedIn)`
  display: block;
`

const CvContentImport = ({ cv }) => {
  const [content, setContent] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const { handleSidebarItemSelected } = useSidebar()
  const { onboardingLinkedIn } = useOnboarding()

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const onCancel = () => {
    setUploaded(false)
    setContent({})
  }

  const onSuccess = ({ data }) => {
    setUploaded(true)
    setContent(data)
  }

  const onError = () => {
    setUploading(false)

    notify.error(t('cv_parsing_error'))
  }

  const onImportContentError = () => {
    setUploading(false)

    notify.error(t('cv_update_error'))
  }

  const onConfirm = () => {
    if (isRecentlyCreated(cv)) {
      // CVs created in the last 5 minutes don't need a confirmation
      importContent()
    } else {
      openModal()
    }
  }

  const importContent = () => {
    closeModal()

    trackEvent('imported-content-from-upload', 'interaction')

    setUploading(true)

    importCvContentFromUpload(cv, content, onImportContentError)

    handleSidebarItemSelected(cv)

    // file successfully imported; reset state when side pane closes
    setTimeout(() => setUploading(false), 2000)
  }

  const url = `/api/v2/cvs/${cv.id}/parse`

  const linkedInProps = {
    onCancel,
    onConfirm,
    onError,
    onSuccess,
    uploading,
    uploaded,
    url,
  }

  return (
    <>
      {!onboardingLinkedIn && (
        <>
          <Subtitle>{t('cv_import_info')}</Subtitle>

          <ContainerForm>
            <FileUploader
              destination={{ url }}
              multiple={false}
              onCancel={onCancel}
              onError={onError}
              onSuccess={onSuccess}
              restrictContentTypes={['document']}
            />

            {uploaded && (
              <Formsy>
                <Btn
                  big
                  disabled={uploading || !uploaded}
                  onClick={onConfirm}>
                  {uploading ? t('importing') : t('import_resume')}
                </Btn>
              </Formsy>
            )}
          </ContainerForm>

          <LinkedIn {...linkedInProps} />
        </>
      )}

      {onboardingLinkedIn && <UploadLinkedIn {...linkedInProps} />}

      <ModalConfirm
        cancelLabel={t('cancel')}
        confirmLabel={t('import_resume')}
        isOpen={showModal}
        message={t('content_overwrite_warning')}
        onCancel={closeModal}
        onClose={closeModal}
        onConfirm={importContent}
        title={t('are_you_sure_to_import')}
      />
    </>
  )
}

CvContentImport.propTypes = {
  cv: PropTypes.object.isRequired,
}

export default CvContentImport
