import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import { primary, primaryLighter } from '../colors'
import { t } from '../locales'

import UploadLinkedIn from './UploadLinkedIn'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ToggleLinkedInUpload = styled.div`
  background-color: ${primaryLighter};
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  margin: 30px 0 15px;
  max-width: 430px;
  padding: 14px 18px;
  width: 100%;
`

const LinkedInUpload = styled.a`
  &:hover {
    color: ${primary};
  }
`

const Icon = styled.i`
  color: ${primary};
  font-size: 15px;
  transform: rotate(${(props) => (props.linkedInOpen ? -90 : 90)}deg);
  transition: all 0.3s;
`

const UseLinkedIn = ({ className, uploaded, ...props }) => {
  const [linkedIn, setLinkedIn] = useState(false)

  const toggleLinkedInUpload = () => {
    setLinkedIn(!linkedIn)
  }

  return (
    <Container className={className}>
      {!uploaded && (
        <ToggleLinkedInUpload onClick={toggleLinkedInUpload}>
          <LinkedInUpload>{t('use_linkedin_profile')}</LinkedInUpload>

          <Icon
            linkedInOpen={linkedIn}
            className="icon-chevron"
          />
        </ToggleLinkedInUpload>
      )}

      {linkedIn && (
        <UploadLinkedIn
          uploaded={uploaded}
          {...props}
        />
      )}
    </Container>
  )
}

UseLinkedIn.propTypes = {
  className: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
  uploading: PropTypes.bool.isRequired,
  uploaded: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
}

export default UseLinkedIn
