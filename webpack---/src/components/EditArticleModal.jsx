import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import CvEdit from './cv-edit'
import Modal from './Modal'

const EditArticleModal = ({ params }) => {
  const cv = useSelector((state) => state.editor.cv)

  return (
    <Modal
      isOpen
      closeUrl={`/cvs/${cv.id}`}>
      <CvEdit params={params} />
    </Modal>
  )
}

EditArticleModal.propTypes = {
  params: PropTypes.object,
}

export default EditArticleModal
