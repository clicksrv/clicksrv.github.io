import _ from 'lodash'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'

import conf from '../conf'
import events from '../services/events'
import history from '../services/history'
import useQuery from '../hooks/useQuery'
import { getContent, getSectionType } from '../helpers/cv'
import { t } from '../locales'

import Button, { Btn } from './styled/Button'
import Modal from './Modal'
import SectionTitle from './SectionTitle'
import { FormBuilder } from './forms'

const CvEdit = ({ modal, params }) => {
  const cv = useSelector((state) => state.editor.cv)
  const query = useQuery()

  const { sectionKey } = params
  const index = parseInt(params.index)

  const returnPath = query.return || `/cvs/${cv.id}`

  const handleSubmit = (form) => {
    events.emit('CV::UPDATE', { data: form, ...params })

    history.push(returnPath)
  }

  const renderModal = () => {
    if (!modal) {
      return null
    }

    return (
      <Modal
        isOpen
        closeUrl={returnPath}>
        {modal}
      </Modal>
    )
  }

  const sectionType = getSectionType(sectionKey)
  const schema = conf.formSchema[sectionType]

  // the actual form in 'Contact me' section cannot be edited in the modal
  const supportedKeys = _.keys(schema).filter((key) => key !== 'contact_form')

  const data = getContent(cv, sectionKey, index)
  const formData = _.merge({}, schema, data)

  return (
    <>
      <SectionTitle>
        {t(data ? 'edit' : 'add')} {t(sectionType).toLowerCase()}
      </SectionTitle>

      <FormBuilder
        className="cv-content-form"
        formData={formData}
        editableKeys={supportedKeys}
        sectionKey={sectionKey}
        index={index}
        onValidSubmit={handleSubmit}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <Btn
              compact
              type="submit">
              {t('save')}
            </Btn>
            <Button
              to={returnPath}
              compact
              white>
              {t('cancel')}
            </Button>
          </div>
        </div>
      </FormBuilder>

      {renderModal()}
    </>
  )
}

CvEdit.propTypes = {
  modal: PropTypes.node,
  params: PropTypes.object,
}

export default CvEdit
