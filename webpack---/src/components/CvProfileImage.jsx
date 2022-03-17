import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'
import { useState } from 'react'

import api from '../services/api'
import { primary, primaryFaded, primaryFadedLess, primaryGreyish, redDanger, redErrorLight } from '../colors'
import { t } from '../locales'

import avatarPlaceholder from '../assets/images/avatar.svg'

import MediaPicker from './MediaPicker'

const inEditorCssCropStyles = css`
  transition: opacity 0.3s;

  position: relative;
`

const pdfCssCropStyles = css`
  // wkhtmltopdf renders ugly shadows
  box-shadow: none;
`

const CssCrop = styled.div`
  background-image: ${({ image }) => (image ? `url(${image})` : 'none')};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  height: 100%;
  width: 100%;

  ${({ inEditor }) => inEditor && inEditorCssCropStyles};
  ${({ pdf }) => pdf && pdfCssCropStyles};
`

const PlaceholderImage = styled.img`
  transition: filter 0.2s;

  max-width: 60%;
  width: 130px;
`

const Placeholder = styled.div`
  background-color: ${primaryFaded};

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  position: relative;
  width: 100%;

  &:hover {
    background-color: ${primaryFadedLess};

    ${PlaceholderImage} {
      filter: brightness(0.85) saturate(1.8);
    }
  }
`

const PromptButton = styled.aside`
  opacity: 0;
  transform: translateY(calc(-50% + 15px));
  transition: opacity 0.3s, transform 0.3s, z-index 0.3s;
  transition-delay: ${({ delayed }) => (delayed ? 0.02 : 0)}s;
  z-index: -1;

  position: absolute;
  left: 3%;
  right: 3%;
  top: 50%;

  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

  height: 80px;
  padding-top: 8px;
  width: 94%;
`

// Custom html element needed for HeaderOctagonal
const Overlay = styled.div`
  display: none;
`

const Icon = styled.i`
  border-radius: 4px;
  font-size: 22px;

  margin-bottom: 5px;
  padding: 7px;
`

const UploadIcon = styled(Icon)`
  background-color: ${primary};
  color: white;
`

const RemoveIcon = styled(Icon)`
  background-color: ${redErrorLight};
  color: ${redDanger};
`

const Info = styled.p`
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 400;
  text-align: center;

  margin: 0;

  @supports (font-variation-settings: normal) {
    font-family: 'InterVariable', sans-serif;
  }
`

const UploadInfo = styled(Info)`
  && {
    color: black;
  }
`

const RemoveInfo = styled(Info)`
  && {
    color: white;
  }
`

const inEditorContainerStyles = css`
  background-color: transparent;
  cursor: pointer;
  outline: 2px dashed transparent;
  outline-offset: 3px;
  transition: outline 0.2s, background-color 0.2s;

  display: inherit !important;
  position: relative;

  &:hover {
    background-color: ${({ image }) => (image ? primary : primaryFadedLess)};
    outline-color: ${primaryGreyish};

    ${CssCrop} {
      filter: brightness(0.9);
      opacity: 0.6;
    }

    ${PromptButton} {
      opacity: 1;
      transform: translateY(-50%);
    }
  }
`

const pdfContainerStyles = css`
  // wkhtmltopdf renders ugly shadows
  box-shadow: none !important;
`

const Container = styled.div`
  ${({ inEditor }) => inEditor && inEditorContainerStyles};
  ${({ pdf }) => pdf && pdfContainerStyles};

  &:hover {
    ${PromptButton} {
      // delayed transitioning of 'z-index' is required to not have single click
      // avatar removal on mobile devices (it will require double click)
      z-index: 2; // at least 2 is needed for HeaderOctagonal
    }
  }
`

const CvProfileImage = ({ cv, image, inEditor, pdf }) => {
  const [mediaModal, setMediaModal] = useState(false)

  const addPicture = () => {
    setMediaModal(true)
  }

  const updateThumb = (thumb) => {
    const updatedCv = {
      ...cv,
      sections: {
        ...cv.sections,
        profile: {
          ...cv.sections.profile,
          content: {
            ...cv.sections.profile.content,
            thumb,
          },
        },
      },
    }

    api.updateCv(updatedCv)
  }

  /**
   * @param {object} selectedAssets assets object from MediaPicker ({ 115: { id: 115, thumb: 'http://url', ...} })
   */
  const onPictureSelect = (selectedAssets) => {
    const assetId = Object.keys(selectedAssets)[0]
    const { thumb } = selectedAssets[assetId]

    updateThumb(thumb)
  }

  const removePicture = () => updateThumb('')

  const containerClassName = `user-thumb${image ? ' visible' : ''}`

  return (
    <>
      <Container
        className={containerClassName}
        image={image}
        inEditor={inEditor}
        pdf={pdf}>
        {image && (
          <CssCrop
            className="css-crop"
            image={image}
            inEditor={inEditor}
            pdf={pdf}
            role="figure"
          />
        )}

        {image && <Overlay className="overlay" />}

        {image && inEditor && (
          <PromptButton
            delayed
            onClick={removePicture}>
            <RemoveIcon className="icon-trash" />
            <RemoveInfo>{t('remove_picture')}</RemoveInfo>
          </PromptButton>
        )}

        {!image && inEditor && (
          <Placeholder
            className="image-placeholder"
            onClick={addPicture}
            role="banner">
            <PlaceholderImage src={avatarPlaceholder} />

            <PromptButton>
              <UploadIcon className="icon-upload" />
              <UploadInfo>{t('upload_picture')}</UploadInfo>
            </PromptButton>
          </Placeholder>
        )}
      </Container>

      {mediaModal && (
        <MediaPicker
          allowExternal={false}
          multiple={false}
          nullable={true}
          onClose={() => setMediaModal(false)}
          onSave={onPictureSelect}
          restrictContentTypes={['image']}
          title={t('upload_picture')}
        />
      )}
    </>
  )
}

CvProfileImage.propTypes = {
  cv: PropTypes.object.isRequired,
  image: PropTypes.string,
  inEditor: PropTypes.bool,
  pdf: PropTypes.bool,
}

export default CvProfileImage
