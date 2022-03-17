import Formsy from 'formsy-react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useState } from 'react'

import events from '../../services/events'
import { grey } from '../../colors'
import { t } from '../../locales'

import Icon from '../styled/Icon'
import Input from '../Input'
import ModalConfirm from '../ModalConfirm'
import SectionTitle from '../SectionTitle'
import Table from '../styled/Table'
import UserItem from './UserItem'

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
`

const Title = styled(SectionTitle)`
  margin: 0 0 10px;
`

const Search = styled.div`
  position: relative;
`

const SearchIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 12px;
`

const ThActions = styled.th`
  width: 44px;
`

const UsersContainer = ({ currentUserId, onSearch, users }) => {
  const [showModal, setShowModal] = useState(false)
  const [userId, setUserId] = useState(null)

  const openModal = () => setShowModal(true)
  const closeModal = () => setShowModal(false)

  const handleChange = (e) => onSearch(e.search)

  const handleDelete = (id) => {
    openModal()
    setUserId(id)
  }

  const handleDeleteConfirm = () => {
    events.emit('ADMIN::REMOVE_USER', userId)
    closeModal()
    setUserId(null)
  }

  return (
    <>
      <Header>
        <Title as="h2">{t('company_accounts')}</Title>

        <Search>
          <Formsy onChange={handleChange}>
            <Input
              name="search"
              placeholder={t('search')}
              small
              type="text"
              value=""
            />

            <SearchIcon>
              <Icon
                fill={grey}
                icon="search"
              />
            </SearchIcon>
          </Formsy>
        </Search>
      </Header>
      <Table>
        <tbody>
          <tr>
            <th>{t('name')}</th>
            <th>{t('company_admin')}</th>
            <th>{t('latest_cv')}</th>
            <th>{t('last_login')}</th>
            <th>{t('created')}</th>
            <ThActions />
          </tr>

          {users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onDelete={handleDelete}
              isDeleteVisible={user.id !== currentUserId}
            />
          ))}
        </tbody>
      </Table>

      <ModalConfirm
        cancelLabel={t('no')}
        confirmLabel={t('yes')}
        isOpen={showModal}
        message={t('remove_user_warning')}
        onCancel={closeModal}
        onClose={closeModal}
        onConfirm={handleDeleteConfirm}
        title={t('are_you_sure')}
      />
    </>
  )
}

UsersContainer.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSearch: PropTypes.func,
}

export default UsersContainer
