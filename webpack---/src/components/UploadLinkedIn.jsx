import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect, useRef } from 'react'

import useOnboarding from '../hooks/useOnboarding'
import { grey, primaryLight, primaryLightest } from '../colors'
import { t } from '../locales'

import linkedInImage from '../assets/images/linkedin-pdf-import.jpg'

import EditorSidePaneTitle from './EditorSidePaneTitle'
import Uploader from './Uploader'
import { Btn } from './styled/Button'

const Title = styled(EditorSidePaneTitle)`
  && {
    margin-top: 40px;
    margin-bottom: 15px;
  }
`

const Info = styled.p`
  color: ${grey};
  font-size: 15px;

  margin-bottom: 15px;
`

const LinkedInLink = styled.div`
  background-color: ${primaryLightest};
  border: 1px solid ${primaryLight};
  border-radius: 24px;
  box-shadow: 8px 8px 20px 0px rgba(20, 20, 20, 0.05);
  color: ${grey};

  max-width: 420px;
  margin-bottom: 40px;
  padding: 12px 30px;
  width: 100%;
`

const LinkedInImage = styled.img`
  border-radius: 24px;
  box-shadow: 8px 8px 20px 0px rgba(20, 20, 20, 0.05);

  height: auto;
  margin-bottom: 40px;
  max-width: 482px;
  width: 100%;
`

const ContainerForm = styled.div`
  max-width: 430px;
  width: 100%;
`

const FileUploader = styled(Uploader)`
  margin-bottom: 30px;
`

const UploadLinkedIn = ({ onCancel, onConfirm, onError, onSuccess, uploading, uploaded, url }) => {
  const dialogRef = useRef(null)

  const { onboardingLinkedIn } = useOnboarding()

  // scroll on open
  useEffect(() => {
    if (onboardingLinkedIn) {
      return
    }

    const scrollToElement = () => dialogRef.current.scrollIntoView({ behavior: 'smooth' })

    setTimeout(scrollToElement, 200)
  }, [onboardingLinkedIn])

  return (
    <>
      <Title ref={dialogRef}>{t('import_from_linkedin')}</Title>
      <Info>{t('import_linkedin_step1')}</Info>

      <LinkedInLink>https://www.linkedin.com/in/your-name</LinkedInLink>

      <Info>{t('import_linkedin_step2')}</Info>

      <LinkedInImage
        alt="LinkedIn"
        height={300}
        src={linkedInImage}
      />

      <Info>{t('import_linkedin_step3')}</Info>

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
          <Btn
            big
            disabled={uploading || !uploaded}
            onClick={onConfirm}>
            {uploading ? t('importing') : t('import_resume')}
          </Btn>
        )}
      </ContainerForm>
    </>
  )
}

UploadLinkedIn.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  uploaded: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
}

export default UploadLinkedIn
