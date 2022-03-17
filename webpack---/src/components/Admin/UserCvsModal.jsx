import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import events from '../../services/events'
import { t } from '../../locales'

import CVItem from './CvItem'
import Modal from '../Modal'
import SectionTitle from '../SectionTitle'
import Table from '../styled/Table'
import { Btn } from '../styled/Button'

const ATable = styled(Table)`
  font-size: 14px;

  margin-bottom: 15px;
  padding: 5px;
`

const Icon = styled.i``

const UserCvsModal = ({ isOpen, path, user }) => {
  const cvs = useSelector((state) => state.admin.cvs)

  useEffect(() => {
    if (user) {
      events.emit('ADMIN::GET_USER_CVS', user.id)
    }
  }, [user])

  if (!user) {
    return null
  }

  const createNewCv = (e) => {
    e.preventDefault()

    events.emit('ADMIN::CREATE_USER_CV', user.id)
  }

  return (
    <Modal
      maxWidth={960}
      closeUrl={path}
      isOpen={isOpen}>
      <SectionTitle>{`${user.firstName} ${user.lastName}'s CVs`}</SectionTitle>

      <ATable>
        <tbody>
          <tr>
            <th>{t('url')}</th>
            <th>{t('title')}</th>
            <th>{t('created')}</th>
            <th>{t('updated')}</th>
          </tr>

          {cvs.map((cv) => {
            return (
              <CVItem
                key={cv.id}
                cv={cv}
              />
            )
          })}
        </tbody>
      </ATable>

      <Btn onClick={createNewCv}>
        <Icon className="icon-plus" />

        {t('cv_or_resume')}
      </Btn>
    </Modal>
  )
}

UserCvsModal.propTypes = {
  isOpen: PropTypes.bool,
  path: PropTypes.string,
  user: PropTypes.object,
}

export default UserCvsModal
