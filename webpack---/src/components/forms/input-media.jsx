import _ from 'lodash'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { sortable } from 'react-anything-sortable'
import { PureComponent, useState } from 'react'

import events from '../../services/events'
import history from '../../services/history'
import { greyLightest, primaryLight } from '../../colors'
import { t } from '../../locales'

import Asset from '../asset'
import Icon from '../styled/Icon'
import MediaPicker from '../MediaPicker'
import ModalConfirm from '../ModalConfirm'
import Sortable from '../styled/Sortable'
import { Btn } from '../styled/Button'

const BtnIcon = styled.i``

const editAssetPath = (assetId) => {
  const basePath = history.location.pathname

  return `${basePath}/assets/${assetId}?return=${basePath.replace('#', '')}`
}

const AssetListItem = styled.div`
  border-top: 1px solid ${greyLightest};

  display: flex;
  align-items: stretch;

  padding: 15px 0;
`

const AssetThumb = styled.div`
  display: flex;

  width: 72px;

  .thumb {
    margin: 0;
  }
`

const AssetContent = styled.div`
  color: #444;
  font-size: 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  flex: 1;
  padding-left: 15px;

  a {
    text-decoration: underline;
  }
`

const AssetTitle = styled.p`
  font-size: 14px;
`

const AssetActions = styled.div`
  display: flex;
  justify-content: space-between;
`

const AssetSortHandle = styled.aside`
  color: ${primaryLight};
  cursor: move;

  display: flex;
  align-items: center;

  padding: 0 15px 0 0;

  i {
    font-size: 22px;
  }
`

@sortable
class SortableAsset extends PureComponent {
  render() {
    const { className, index, onMouseDown, onTouchStart, openConfirmationModal, sortData: asset, style } = this.props

    return (
      <div
        className={className}
        style={style}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}>
        <AssetListItem>
          <AssetSortHandle className="sort-handle">
            <Icon arrow="move" />
          </AssetSortHandle>

          <AssetThumb>
            <Asset asset={asset} />
          </AssetThumb>

          <AssetContent>
            <AssetTitle>{asset.title || asset.file_name}</AssetTitle>

            <AssetActions>
              <Link to={editAssetPath(index)}>{t('edit')}</Link>
              <a onClick={openConfirmationModal}>{t('delete')}</a>
            </AssetActions>
          </AssetContent>
        </AssetListItem>
      </div>
    )
  }
}

SortableAsset.propTypes = {
  className: PropTypes.string,
  index: PropTypes.number.isRequired,
  onMouseDown: PropTypes.func,
  onTouchStart: PropTypes.func,
  openConfirmationModal: PropTypes.func.isRequired,
  sortData: PropTypes.object.isRequired,
  style: PropTypes.object,
}

const MediaInput = ({ value, setValue }) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false)
  const [mediaModal, setMediaModal] = useState(false)
  const [mediaIndex, setMediaIndex] = useState(null)

  const openConfirmationModal = (index) => () => {
    setShowConfirmationModal(true)
    setMediaIndex(index)
  }

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false)
    setMediaIndex(null)
  }

  const getAssets = () => {
    return _.compact(value || [])
  }

  const onSelect = (assetsHash) => {
    const assets = getAssets()
    const asset = Object.values(assetsHash)[0] || {}
    const newAssets = [...assets, asset]

    submitUpdate(newAssets)

    history.push(editAssetPath(newAssets.length - 1))
  }

  const deleteAsset = () => {
    const assets = getAssets().slice()
    assets.splice(mediaIndex, 1)

    submitUpdate(assets)

    setShowConfirmationModal(false)
    setMediaIndex(null)
  }

  const submitUpdate = (assets) => {
    const pathname = history.location.pathname
    const sectionKey = _.last(_.compact(pathname.split('/')))

    // NOTE this value should be updated right away
    events.emit('CV::UPDATE', {
      sectionKey,
      attr: 'assets',
      data: assets,
    })

    setValue(assets)
  }

  const renderAsset = (asset, index) => {
    // NOTE has some really strange bug trying to render nested FormBuilder
    return (
      <SortableAsset
        deleteAsset={deleteAsset}
        index={index}
        key={index}
        openConfirmationModal={openConfirmationModal(index)}
        sortData={asset}
      />
    )
  }

  // TODO editor should prevent us from getting null values in array
  const assets = getAssets()

  if (!assets) {
    return null
  }

  const sortHandle = assets.length > 1 ? 'sort-handle' : null

  const openModal = (e) => {
    e.preventDefault()

    setMediaModal(true)
  }

  // To modify the children, we have to force a sortable to re-render
  // https://github.com/jasonslyvia/react-anything-sortable#notice

  // NOTE: Since sortable modifies the Mod, we need to completely re-render it and don't use reconciliation.
  return (
    <div className="media-input">
      <Sortable
        className="asset-list"
        direction="vertical"
        key={_.uniqueId()}
        onSort={submitUpdate}
        sortHandle={sortHandle}>
        {assets.map(renderAsset)}
      </Sortable>

      <Btn
        small
        fluid
        hollow
        style={{ marginTop: 20 }}
        onClick={openModal}>
        <BtnIcon className="icon-plus" />

        {t('add_portfolio_item')}
      </Btn>

      {mediaModal && (
        <MediaPicker
          title={t('add_portfolio_item')}
          onSave={onSelect}
          onClose={() => setMediaModal(false)}
        />
      )}

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
    </div>
  )
}

MediaInput.propTypes = {
  setValue: PropTypes.func.isRequired,
  value: PropTypes.array,
}

export default MediaInput
