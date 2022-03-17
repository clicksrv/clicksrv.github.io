import PropTypes from 'prop-types'
import styled from 'styled-components'
import { propTypes, withFormsy } from 'formsy-react'
import { useState } from 'react'

import { grey, greyDarker, primaryFaded, redDanger } from '../colors'
import { t } from '../locales'

import Hyperlink from './styled/Hyperlink'
import JournalEntryFormLabel from './JournalEntryFormLabel'
import MediaPicker from './MediaPicker'

const Container = styled.section`
  margin-bottom: 25px;
`

const Info = styled.p`
  color: ${grey};
  font-size: 14px;

  margin: -5px 0 10px;
`

const Assets = styled.ul`
  list-style: none;

  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

const Asset = styled.li`
  box-shadow: 0 2px 4px ${primaryFaded};

  display: grid;
  grid-template-columns: 48px auto 19px;
  grid-gap: 7px;

  margin: 0 15px 15px 0;
  padding: 15px;
  width: 230px;
`

const Filename = styled.p`
  color: ${greyDarker};
  font-size: 12px;
  font-weight: 700;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const ImageWrapper = styled.div`
  background-image: url(${(props) => props.url});
  background-size: cover;
  border-radius: 8px;

  height: 48px;
  width: 48px;
`

const IconDelete = styled.span`
  background-color: ${redDanger};
  border-radius: 50%;
  color: white;
  cursor: pointer;
  font-size: 18px;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 19px;
  width: 19px;
`

const Icon = styled.i``

/**
 * @param {function} setValue accepts a list of asset ids
 */
const JournalEntryFormAssets = ({ initialAssets, setValue }) => {
  const [assets, setAssets] = useState(initialAssets) // array of objects
  const [mediaModal, setMediaModal] = useState(false)

  const openMediaModal = (event) => {
    event.preventDefault()

    setMediaModal(true)
  }

  /**
   * @param {object} selectedAssets assets object from MediaPicker ({ 115: { id: 115, file_name: 'File.jpg', file_url: 'http://url', ...} })
   */
  const onSelect = (selectedAssets) => {
    setAssets(Object.keys(selectedAssets).map((key) => selectedAssets[key]))
    setValue(Object.keys(selectedAssets).map((key) => Number(key)))
  }

  const removeAsset = (idToRemove) => (event) => {
    event.stopPropagation()

    const newAssets = assets.filter(({ id }) => id !== idToRemove)

    setAssets(newAssets)
    setValue(newAssets.map(({ id }) => id))
  }

  const displayAssets = !!assets?.length && assets.length > 0

  return (
    <Container>
      <JournalEntryFormLabel onClick={openMediaModal}>{t('media')}</JournalEntryFormLabel>

      <Info>{t('add_photos_pdfs')}</Info>

      {displayAssets && (
        <Assets>
          {assets.map(({ id, file_name: name, thumb }) => (
            <Asset key={`asset${id}`}>
              {thumb && <ImageWrapper url={thumb} />}

              <Filename>{name}</Filename>

              <IconDelete onClick={removeAsset(id)}>×</IconDelete>
            </Asset>
          ))}
        </Assets>
      )}

      <Hyperlink
        small
        hollow
        onClick={openMediaModal}>
        <Icon className="icon-plus" />

        {t('add_new_file')}
      </Hyperlink>

      {mediaModal && (
        <MediaPicker
          title={t('add_new_file')}
          selectedIds={assets.map((asset) => asset.id)}
          multiple={true}
          nullable={true}
          allowExternal={false}
          restrictContentTypes={['image', 'document', 'audio', 'slideshare']}
          onSave={onSelect}
          onClose={() => setMediaModal(false)}
        />
      )}
    </Container>
  )
}

JournalEntryFormAssets.propTypes = {
  initialAssets: PropTypes.array.isRequired,
  ...propTypes,
}

export default withFormsy(JournalEntryFormAssets)
