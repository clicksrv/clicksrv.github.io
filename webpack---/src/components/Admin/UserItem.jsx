import delay from 'lodash/delay'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import events from '../../services/events'
import { formatDate } from '../../helpers/dates'
import { t } from '../../locales'

import Icon from '../styled/Icon'

const DeleteLink = styled(Link)`
  margin-left: 6px;
`

const CvLink = styled(Link)`
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: inline-block;
  max-width: 200px;
`

const newCv = (userId) => () => {
  events.emit('ADMIN::CREATE_USER_CV', userId)
  delay(() => events.emit('ADMIN::GET_USERS'), 200)
}

const handleDelete = (onDelete, userId) => (e) => {
  e.preventDefault()

  onDelete(userId)
}

const renderLatestCVLink = (latestCvId, latestCvUrl, userId) => {
  if (!latestCvId) {
    return (
      <span>
        (<a onClick={newCv(userId)}>create</a>)
      </span>
    )
  }

  return (
    <div style={{ display: 'flex' }}>
      <CvLink to={`/cvs/${latestCvId}`}>{latestCvUrl}</CvLink>

      {latestCvId && (
        <span style={{ marginLeft: 5 }}>
          (
          <Link
            style={{ margin: '0 1px' }}
            to={`/company?modal=user-cvs&userId=${userId}`}>
            {t('more')}
          </Link>
          )
        </span>
      )}
    </div>
  )
}

const UserItem = ({ user, isDeleteVisible, onDelete }) => {
  const locale = useSelector((state) => state.application.locale)

  const { id, firstName, lastName, companyAdmin, latestCvId, latestCvUrl, currentSignInAt, createdAt } = user
  const name = lastName ? `${firstName} ${lastName}` : firstName

  return (
    <tr>
      <td>{name}</td>
      <td>{companyAdmin && t('yes')}</td>
      <td>{renderLatestCVLink(latestCvId, latestCvUrl, id)}</td>
      <td>{formatDate(currentSignInAt, locale, { dateStyle: 'medium' })}</td>
      <td>{formatDate(createdAt, locale, { dateStyle: 'medium' })}</td>
      <td>
        <Link
          style={{ visibility: latestCvId ? 'visible' : 'hidden' }}
          to={`/cvs/${latestCvId}`}>
          <Icon icon="pencil-edit" />
        </Link>
        <DeleteLink
          style={{ visibility: isDeleteVisible ? 'visible' : 'hidden' }}
          onClick={handleDelete(onDelete, id)}
          to="">
          <Icon icon="trash" />
        </DeleteLink>
      </td>
    </tr>
  )
}

UserItem.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string,
    companyAdmin: PropTypes.bool,
    latestCvId: PropTypes.number,
    latestCvUrl: PropTypes.string,
    currentSignInAt: PropTypes.string,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
  isDeleteVisible: PropTypes.bool,
}

export default UserItem
