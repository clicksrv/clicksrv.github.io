import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import useQuery from '../hooks/useQuery'

import CvEditAsset from './cv-edit-asset'
import Modal from './Modal'

const EditAssetModal = ({ params }) => {
  const cv = useSelector((state) => state.editor.cv)
  const query = useQuery()

  const closeUrl = query.return || `/cvs/${cv.id}/articles/portfolio`

  return (
    <Modal
      isOpen
      closeUrl={closeUrl}>
      <CvEditAsset params={params} />
    </Modal>
  )
}

EditAssetModal.propTypes = {
  params: PropTypes.object,
}

export default EditAssetModal
