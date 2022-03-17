import _ from 'lodash'
import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import ReactDOMServer from 'react-dom/server'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import conf from '../../conf'
import http from '../../helpers/http'
import { getYouTubeEmbedUrl, getYouTubeId } from '../../helpers/youtube'
import { greyLightest } from '../../colors'
import { t } from '../../locales'

import Asset from '../asset'
import DropZone from './DropZone'
import Hyperlink from '../styled/Hyperlink'
import Icon from '../styled/Icon'
import Input from '../forms/input'
import Modal from '../Modal'
import ModalConfirm from '../ModalConfirm'
import Nav, { NavItem } from './Nav'
import SectionTitle from '../SectionTitle'
import { ButtonTab, Container as ButtonTabs } from '../styled/ButtonTabs'
import { Btn, IconButton } from '../styled/Button'
import { media } from '../styled/Grid'

const AssetActions = styled(({ selected, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(62, 148, 228, 0.7);

    button {
      opacity: 1;
    }
  }

  button {
    opacity: 0;
    font-size: 22px;
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }
  }

  ${({ selected }) =>
    selected &&
    `
    background-color: rgba(90, 182, 45, 0.7);

    button {
      opacity: 1;
    }

    &:hover {
      background-color: rgba(90, 182, 45, 0.7);
    }
  `}
`

const ModalContent = styled.div`
  padding: 10px;

  ${media.sm`
    padding: 30px;
  `}
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 15px 15px 0 30px;

  ${media.sm`
    & > div {
      flex: none;
    }
  `}
`

const HeaderActions = styled.div`
  display: none;

  ${media.md`
    display: block;
  `}
`

const Title = styled(SectionTitle)`
  margin: 0;
`

const MobileActions = styled.div`
  padding: 10px;
  border-top: 2px solid ${greyLightest};
  display: flex;

  ${media.sm`
    padding-left: 30px;
  `}

  ${media.md`
    display: none;
  `}
`

const YouTubeInput = styled.div`
  display: flex;
  align-items: baseline;

  form {
    width: 100%;
  }
`

const Iframe = styled.iframe`
  border: none;

  height: 506px;
  max-height: 100%;
  max-width: 100%;
  width: 900px;
`

const MediaPicker = ({ allowExternal, multiple, onClose, onSave, restrictContentTypes, selectedIds, title }) => {
  const [view, setView] = useState('addition')
  const [mediaAdditionMethod, setMediaAdditionMethod] = useState('upload')
  const [selectedAssets, setSelectedAssets] = useState({})
  const [assets, setAssets] = useState([])
  const [youTubeUrl, setYouTubeUrl] = useState('')
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [assetForDeletion, setAssetForDeletion] = useState(null)

  const token = useSelector((state) => state.session.token)

  // Should really move this up to the reducer (assets state in the store,
  // filtered at render time in this component, depending on it's props).
  useEffect(() => {
    http.get('assets', (_err, resp) => {
      let loadedAssets = resp.body

      if (restrictContentTypes.length) {
        loadedAssets = loadedAssets.filter((asset) => restrictContentTypes.indexOf(asset.type) >= 0)
      }

      let matchedAssets = {}

      if (multiple) {
        selectedIds.forEach((id) => {
          matchedAssets[id] = _.find(loadedAssets, { id })
        })
      } else {
        matchedAssets = _.find(loadedAssets, { id: selectedIds[0] }) || {}
      }

      setAssets(loadedAssets)
      setSelectedAssets(matchedAssets)
    })
  }, [multiple, restrictContentTypes, selectedIds])

  const openConfirmationModal = (asset) => () => {
    setShowConfirmationModal(true)
    setAssetForDeletion(asset)
  }

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false)
    setAssetForDeletion(null)
  }

  const { maxUploadFileSize, supportedFileTypes } = conf

  const allowedFileTypes = () => {
    if (restrictContentTypes.length) {
      return _.flatMap(restrictContentTypes, (type) => (supportedFileTypes[type] ? supportedFileTypes[type][0] : []))
    }

    return _.flatMap(_.values(supportedFileTypes), 0)
  }

  const allowedMimeTypes = () => {
    if (restrictContentTypes.length) {
      return _.flatMap(restrictContentTypes, (type) => (supportedFileTypes[type] ? supportedFileTypes[type][1] : []))
    }

    return _.flatMap(_.values(supportedFileTypes), 1)
  }

  const toggleSelect = (asset) => () => {
    if (selectedAssets[asset.id]) {
      setSelectedAssets(_.omit(selectedAssets, asset.id))
    } else {
      setSelectedAssets({
        ...(multiple ? selectedAssets : {}),
        [asset.id]: asset,
      })
    }
  }

  const deleteAsset = () => {
    http.destroy(`assets/${assetForDeletion.id}`, null, (err, resp) => {
      if (err) {
        http.errHandler(err)
      } else {
        setAssets(resp.body)
      }
    })

    setShowConfirmationModal(false)
    setAssetForDeletion(null)
  }

  const save = () => {
    if (typeof onSave === 'function') {
      onSave(selectedAssets)
      onClose()
    }
  }

  const config = {
    postUrl: conf.endpoint(`assets?token=${token}`),
  }

  const djsConfig = {
    addRemoveLinks: true,
    dictDefaultMessage: ReactDOMServer.renderToStaticMarkup(
      <div>
        <Icon icon="upload" />
        <h3>{t('click_or_drop_files_here')}</h3>
        <div className="info">{t('accepted_files', { types: allowedFileTypes().join(', ') })}</div>
        <div className="info">{t('max_file_size', { size: maxUploadFileSize })}</div>
      </div>
    ),
    maxFilesize: maxUploadFileSize,
    maxFiles: 10,
    acceptedFiles: allowedMimeTypes().join(','),
    timeout: 10 * 60 * 1000, // client-side timeout; 10 mins, ideally ∞
  }

  const eventHandlers = {
    success: (_file, resp = {}) => {
      // both `assets` and `selectedAssets` will be empty in here for some unknown
      // reason (most likely because the dropzone component is outdated)
      const newAsset = resp.created
      const newSelectedAssets = Object.assign({}, selectedAssets, { [newAsset.id]: newAsset })

      setAssets(resp.assets)
      setSelectedAssets(newSelectedAssets)
    },
  }

  const renderExternalView = () => {
    const youTubeId = getYouTubeId(youTubeUrl)
    const embedYouTubeUrl = getYouTubeEmbedUrl(youTubeId)

    const submitUrl = () => {
      const params = { type: 'youtube', file_key: youTubeId }

      http.post('assets', params, (err, resp) => {
        if (err) {
          http.errHandler(err)
          return
        }

        const newAsset = resp.body.created

        setAssets(resp.body.assets)
        setSelectedAssets(Object.assign({}, selectedAssets, { [newAsset.id]: newAsset }))
        setView('selected')
        setYouTubeUrl('')
      })
    }

    const handleFormChange = (e) => {
      setYouTubeUrl(e.youtube)
    }

    return (
      <>
        <YouTubeInput>
          <Formsy onChange={handleFormChange}>
            <Input
              name="youtube"
              type="text"
              style={{ flex: 1, marginRight: 10 }}
              placeholder={t('youtube_url')}
              value={youTubeUrl}
            />
          </Formsy>

          <Btn
            big
            hollow
            onClick={submitUrl}
            disabled={!youTubeId}>
            {t('add')}
          </Btn>
        </YouTubeInput>

        {youTubeId && <Iframe src={embedYouTubeUrl} />}
      </>
    )
  }

  const renderMediaAddition = () => {
    const isActive = (method) => (mediaAdditionMethod === method ? 'active' : '')

    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {allowExternal && (
              <ButtonTabs style={{ marginBottom: 30 }}>
                <ButtonTab
                  active={isActive('upload')}
                  onClick={() => setMediaAdditionMethod('upload')}>
                  <Icon icon="upload" /> {t('upload')}
                </ButtonTab>

                {allowExternal && (
                  <ButtonTab
                    active={isActive('external')}
                    onClick={() => setMediaAdditionMethod('external')}>
                    <Icon social="youtube" /> {t('add_youtube_video')}
                  </ButtonTab>
                )}
              </ButtonTabs>
            )}
          </div>
        </div>

        {mediaAdditionMethod === 'upload' && (
          <DropZone
            config={config}
            eventHandlers={eventHandlers}
            djsConfig={djsConfig}
            assets={assets}
            selectedAssets={selectedAssets}
            setAssets={setAssets}
            setSelectedAssets={setSelectedAssets}
          />
        )}

        {mediaAdditionMethod === 'external' && renderExternalView()}
      </div>
    )
  }

  const renderMediaList = (filterSelected) => {
    let localAssets = assets

    if (filterSelected) {
      localAssets = Object.values(selectedAssets)
    }

    const assetNodes = localAssets.map((asset) => {
      const selected = selectedAssets[asset.id] ? 'selected' : ''

      return (
        <Asset
          asset={asset}
          key={asset.id}
          showFileName>
          <AssetActions selected={selected}>
            <IconButton
              circle
              hollow
              white
              onClick={toggleSelect(asset)}>
              <Icon icon={selected ? 'check' : 'check'} />
            </IconButton>

            {!selected && (
              <IconButton
                circle
                hollow
                white
                onClick={openConfirmationModal(asset)}>
                <Icon icon="trash_alt" />
              </IconButton>
            )}
          </AssetActions>
        </Asset>
      )
    })

    return <section className="media-list animated fadeIn">{assetNodes}</section>
  }

  const filterSelected = true

  const selectedAssetIds = Object.keys(selectedAssets)
  const noAssetsSelected = selectedAssetIds.length < 1

  return (
    <>
      <Modal
        bare
        fullHeight
        isOpen
        onClose={onClose}
        maxWidth={1280}>
        <Header>
          <Title>{title}</Title>

          <HeaderActions>
            <Hyperlink
              white
              onClick={onClose}>
              {t('cancel')}
            </Hyperlink>

            <Btn
              type="submit"
              disabled={noAssetsSelected}
              onClick={save}>
              {t('save')}
            </Btn>
          </HeaderActions>
        </Header>

        <Nav>
          <div>
            <NavItem
              onClick={() => setView('addition')}
              selected={view === 'addition'}>
              {t('upload')}
            </NavItem>

            <NavItem
              onClick={() => setView('library')}
              selected={view === 'library'}>
              {t('my_files')} ({assets.length})
            </NavItem>

            <NavItem
              onClick={() => setView('selected')}
              selected={view === 'selected'}>
              {t('selected')} ({selectedAssetIds.length})
            </NavItem>
          </div>
        </Nav>

        <div className="media-modal">
          <ModalContent>
            {view === 'addition' && renderMediaAddition()}
            {view === 'library' && renderMediaList()}
            {view === 'selected' && renderMediaList(filterSelected)}
          </ModalContent>

          <MobileActions>
            <Btn
              disabled={noAssetsSelected}
              onClick={save}>
              {t('save')}
            </Btn>
            <Btn
              white
              onClick={onClose}>
              {t('cancel')}
            </Btn>
          </MobileActions>
        </div>
      </Modal>

      <ModalConfirm
        danger
        cancelLabel={t('cancel')}
        confirmLabel={t('delete')}
        isOpen={showConfirmationModal}
        onCancel={closeConfirmationModal}
        onClose={closeConfirmationModal}
        onConfirm={deleteAsset}
        title={t('delete_confirm')}
      />
    </>
  )
}

MediaPicker.propTypes = {
  allowExternal: PropTypes.bool,
  multiple: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  restrictContentTypes: PropTypes.array,
  selectedIds: PropTypes.array,
  title: PropTypes.string,
}

MediaPicker.defaultProps = {
  allowExternal: true,
  multiple: false,
  restrictContentTypes: [],
  selectedIds: [],
}

export default MediaPicker
